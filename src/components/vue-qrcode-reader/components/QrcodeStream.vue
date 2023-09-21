<template>
  <div :style="wrapperStyle">
    <!-- 
      All immediate children of the wrapper div are stacked upon each other. 
      The z-index is implicitly given by the (inverse) element order. 

      The video element is at the very bottom, the pause frame canvas is above it,
      the tracking layer is yet above and finally at the very top is the slot
      overlay.
    --> 

    <video
      ref="videoRef"
      :style="videoElStyle"
      autoplay
      muted
      playsinline
    />

    <canvas id="qrcode-stream-pause-frame" ref="pauseFrameRef" v-show="!shouldScan" :style="cameraStyle" />

    <canvas id="qrcode-stream-tracking-layer" ref="trackingLayerRef" :style="overlayStyle" />

    <div :style="overlayStyle">
      <slot />
    </div>
  </div>
</template>

<script>
import { keepScanning, setScanningFormats } from '../misc/scanner'
import * as cameraController from '../misc/camera'

import { assert } from '../misc/util'

export default {
  name:'QrcodeStream',
  props:{
    constraints:{
      type:Object,
      default:() => ({
        facingMode: 'environment'
      })
    },
    formats: {
      type: Array,
      default: () => ['qr_code']
    },
    paused: {
      type: Boolean,
      default: false
    },
    torch: {
      type: Boolean,
      default: false
    },
    track: {
      type: Function
    }
  },
  data(){
    return {
      cameraActive:false,
      isMounted:false,
      wrapperStyle:{
        "width": "100%",
        "height": "100%",
        "position": "relative",
        // notice that we use z-index only once for the wrapper div.
        // If z-index is not defined, elements are stacked in the order they appear in the DOM.
        // The first element is at the very bottom and subsequent elements are added on top.
        "z-index": "0",
      },
      overlayStyle:{
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "top": "0",
        "left": "0",
      },
      cameraStyle:{
        "width": "100%",
        "height": "100%",
        "object-fit": "cover"
      }
    }
  },
  watch:{
    cameraSettings:{
      async handler(cameraSettings){
        const videoEl = this.$refs.videoRef
        assert(videoEl !== undefined, 'cameraSettings watcher should never be triggered when component is not mounted. Thus video element should always be defined.')

        const canvas = this.$refs.pauseFrameRef
        assert(canvas !== undefined, 'cameraSettings watcher should never be triggered when component is not mounted. Thus canvas should always be defined.')

        const ctx = canvas.getContext('2d')
        assert(ctx !== null, 'if cavnas is defined, canvas 2d context should also be non-null')

        if (cameraSettings.shouldStream) { // start camera
          try {
            const capabilities = await cameraController.start(videoEl, cameraSettings)

            // if the component is destroyed before `camera.start` resolves the
            // `onBeforeUnmount` hook has no chance to clear the remaining camera
            // stream, so we check here right after `camera.start` resolves whether
            // the component is still mounted.
            if (!this.isMounted) {
              cameraController.stop()
            } else {
              this.cameraActive = true
              this.$emit('camera-on', capabilities)
            }
          } catch (error) {
            this.$emit('error', error)
          }
          } else { // stop camera
            // paint pause frame
            canvas.width = videoEl.videoWidth
            canvas.height = videoEl.videoHeight

            ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight)

            cameraController.stop()
            this.cameraActive = false
            this.$emit('camera-off')
          }
      },
      deep:true
    },
    formats(val){
      if (this.isMounted){
        setScanningFormats(val)
      }
    },
    shouldScan(shouldScan){
      if (shouldScan) {
        assert(this.$refs.pauseFrameRef !== undefined, 'shouldScan watcher should only be triggered when component is mounted. Thus pause frame canvas is defined')
        clearCanvas(this.$refs.pauseFrameRef)

        assert(this.$refs.trackingLayerRef !== undefined, 'shouldScan watcher should only be triggered when component is mounted. Thus tracking canvas is defined')
        clearCanvas(this.$refs.trackingLayerRef)

        // Minimum delay in milliseconds between frames to be scanned. Don't scan
        // so often when visual tracking is disabled to improve performance.
        const scanInterval = () => {
          if (this.track === undefined) {
            return 500
          } else {
            return 40 // ~ 25fps
          }
        }

        assert(this.$refs.videoRef !== undefined, 'shouldScan watcher should only be triggered when component is mounted. Thus video element is defined')
        keepScanning(this.$refs.videoRef, {
          detectHandler: (detectedCodes) => this.$emit('detect', detectedCodes),
          formats: this.formats,
          locateHandler: this.onLocate,
          minDelay: scanInterval()
        })
      }
    }
  },
  methods:{
    onLocate(detectedCodes){
      const canvas = this.$refs.trackingLayerRef
      assert(canvas !== undefined, 'onLocate handler should only be called when component is mounted. Thus tracking canvas is always defined.')

      const video = this.$refs.videoRef
      assert(video !== undefined, 'onLocate handler should only be called when component is mounted. Thus video element is always defined.')

      if (detectedCodes.length === 0 || this.track === undefined) {
        clearCanvas(canvas)
      } else {
        // The visually occupied area of the video element.
        // Because the component is responsive and fills the available space,
        // this can be more or less than the actual resolution of the camera.
        const displayWidth = video.offsetWidth
        const displayHeight = video.offsetHeight

        // The actual resolution of the camera.
        // These values are fixed no matter the screen size.
        const resolutionWidth = video.videoWidth
        const resolutionHeight = video.videoHeight

        // Dimensions of the video element as if there would be no
        //   object-fit: cover;
        // Thus, the ratio is the same as the cameras resolution but it's
        // scaled down to the size of the visually occupied area.
        const largerRatio = Math.max(displayWidth / resolutionWidth, displayHeight / resolutionHeight)
        const uncutWidth = resolutionWidth * largerRatio
        const uncutHeight = resolutionHeight * largerRatio

        const xScalar = uncutWidth / resolutionWidth
        const yScalar = uncutHeight / resolutionHeight
        const xOffset = (displayWidth - uncutWidth) / 2
        const yOffset = (displayHeight - uncutHeight) / 2

        const scale = ({ x, y }) => {
          return {
            x: Math.floor(x * xScalar),
            y: Math.floor(y * yScalar)
          }
        }

        const translate = ({ x, y }) => {
          return {
            x: Math.floor(x + xOffset),
            y: Math.floor(y + yOffset)
          }
        }

        const adjustedCodes = detectedCodes.map((detectedCode) => {
          const { boundingBox, cornerPoints } = detectedCode

          const { x, y } = translate(
            scale({
              x: boundingBox.x,
              y: boundingBox.y
            })
          )
          const { x: width, y: height } = scale({
            x: boundingBox.width,
            y: boundingBox.height
          })

          return {
            ...detectedCode,
            cornerPoints: cornerPoints.map((point) => translate(scale(point))),
            boundingBox: DOMRectReadOnly.fromRect({ x, y, width, height })
          }
        })

        canvas.width = video.offsetWidth
        canvas.height = video.offsetHeight

        const ctx = canvas.getContext('2d')

        this.track(adjustedCodes, ctx)
      }
    }
  },
  computed:{
    cameraSettings(){
      return {
        torch: this.torch,
        constraints: this.constraints,
        shouldStream: this.isMounted && !this.paused
      }
    },
    shouldScan(){
      return this.cameraSettings.shouldStream && this.cameraActive
    },
    videoElStyle(){
      if (this.shouldScan) {
        return this.cameraStyle
      } else {
        return {
          ...this.cameraStyle,

          "visibility": "hidden",
          "position": "absolute",
        }
      }
    }
  },
  mounted(){
    this.isMounted = true
  },
  beforeDestroy(){
    cameraController.stop()
  }
}


const clearCanvas = (canvas) => {
  const ctx = canvas.getContext('2d')
  assert(ctx !== null, 'canvas 2d context should always be non-null')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

</script>
