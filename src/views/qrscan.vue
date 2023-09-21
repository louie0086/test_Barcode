<template>
  <div class="hx1">
    <qrcode-stream :track="paintCenterText" @error="logErrors" @detect="onDetect"></qrcode-stream>
    {{ result }}
  </div>

</template>

<script>
import QrcodeStream  from '@/components/vue-qrcode-reader/components/QrcodeStream.vue'


export default {
data(){
  return {
    result:null
  }
},
components:{
  QrcodeStream
},
methods:{
  logErrors(e){
    console.error('qr scan error',e)
  },
  async onDetect(detectedCodes) {
    this.result = JSON.stringify(detectedCodes)
    console.log('result',detectedCodes)
    
  },
  paintCenterText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const { boundingBox, rawValue } = detectedCode

      const centerX = boundingBox.x + boundingBox.width / 2
      const centerY = boundingBox.y + boundingBox.height / 2

      const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
      console.log(boundingBox.width, ctx.canvas.width)

      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.textAlign = 'center'

      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(detectedCode.rawValue, centerX, centerY)

      ctx.fillStyle = '#5cb984'
      ctx.fillText(rawValue, centerX, centerY)
    }
  },
},
mounted(){
  
}
}
</script>

<style scoped>
.hx1{
width: 100%;
height: 100vh;
background: #f00;
}
</style>