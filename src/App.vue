<template>
  <div id="app">
    <div class="m-body">
      <h1>test barcode detector</h1>
      <button class="btn" @click="$router.push('/qrscan')">start qr scan</button>
      <button class="btn" @click="$router.push('/')">back</button>
      <router-view  />
    </div>

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
#app {
  height: 100vh;
  overflow: hidden;
  font-size: 14px;
  position: relative;
}
.m-body{
  position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: auto
}
.btn{
position: relative;
z-index: 100;
}
</style>