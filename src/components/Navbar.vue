<template>
  <nav class=" blue darken-1">
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo">Tasks</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link to="/" exact active-class="active"><a href="#">Create</a></router-link>
        <router-link to="/list" active-class="active"><a href="#">List</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  import router from '@/router';
</script>

<style lang="scss">

  .hide-on-med-and-down {
    display: flex;
  }
</style>
