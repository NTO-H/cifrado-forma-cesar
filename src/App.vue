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
body {
  background-color: #fff1e2;
  margin: 0;
  display: flex;
  align-items: center;
  /* Eliminar margen */
  padding: 0;
  width: 100%;

  height: 100vh;

  justify-content: center;
}

#app {

  display: flex;

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

@media screen and (max-width: 600px) {
  #app {
    background: linear-gradient(0deg, #FFFFFFFF 0%, #ffffff 50%, #ffffff 90%, #B1FFB0FF 110%);
    margin: 0;
    width: 100%;
    height: 100vh;

    body {
      margin: 0;
    }
  }

}
</style>
