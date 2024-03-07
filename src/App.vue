<template>
  <div class="hero">
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import {RouterView} from 'vue-router';
  import Navbar from './components/Navbar.vue'
</script>

<style scoped></style>
