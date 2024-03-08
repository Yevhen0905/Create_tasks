<template>
  <div class="hero">
    <Navbar />
    <div class="wrapper_content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import {RouterView} from 'vue-router';
  import Navbar from './components/Navbar.vue';
</script>

<style lang="scss">
  .wrapper_content {
    max-width: 1200px;
    width: 100%;
    padding: 0 5px;
    margin: 0 auto;
  }
</style>
