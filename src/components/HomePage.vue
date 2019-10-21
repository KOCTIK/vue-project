<template>
  <div class="h-100">
    <div class="container h-25">
      <div class="row h-100">
        <div class="col align-self-center">
          <h1 class="text-center">Home page</h1>
        </div>
      </div>
    </div>

    <div class="container h-25">
      <div class="row justify-content-around h-100">
        <div class="col-md-4 align-self-end">
          <router-link
            class="btn btn-primary btn-lg btn-block rounded-pill"
            to="/tourist-list"
          >Tourists</router-link>
        </div>
        <div class="col-md-4 align-self-end">
          <router-link
            class="btn btn-primary btn-lg btn-block rounded-pill"
            to="/flight-list"
          >Flights</router-link>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  props: {}
};
</script>




<style scoped>
</style>
