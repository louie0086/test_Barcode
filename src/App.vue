<template>
  <div id="app">
    <h1>test barcode detector</h1>
    <button @click="$router.push('/qrscan')">start qr scan</button>
    <router-view  />
  </div>
</template>

<script>

export default ({
  name: 'App',
  data() {
    return {

    }
  },
})
</script>

<style>
.app {
  height: 100vh;
  overflow: hidden;
  font-size: 14px;
  position: relative;
}
</style>