<template>
  <HelloWorld class="all" msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>

body{
  margin: 0; /* Eliminar margen */
  padding: 0;
}
#app {
  /* border: dashed; */
  background: linear-gradient(0deg, #E4E4E4FF 0%, #E4E4E4FF 50%, #ffffff 90%, #bd6ced 110%);  margin: 0;
  /* background: linear-gradient(0deg, #ffffff 0%, #9efdff 100%); */

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4e4f4f;
  /* margin-top: 60px; */
  margin: 0;
  padding: 0;
}
</style>
