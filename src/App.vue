<template>
  <div class="h-100">
    <nav class="navbar navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/">
        <img src="#" width="30" height="30" class="d-inline-block align-top" alt />
        {{ title }}
      </router-link>
    </nav>
    <div id="app" class="h-100">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  data: function() {
    return {
      title: "HOME"
    };
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  height: 100%;
}
</style>
