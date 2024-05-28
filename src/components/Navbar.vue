<template>
  <nav class="blue darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">TASKS</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link to="/" exact active-class="active"><a href="#">Create</a></router-link>
        <router-link to="/list" active-class="active"><a href="#">List</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .nav-wrapper {
    position: relative;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 10px;

    .hide-on-med-and-down {
      display: flex !important;

      @media only screen and (max-width: 992px) {
        display: flex !important;
      }
    }
  }
  nav .brand-logo {
    position: relative !important;

    @media only screen and (max-width: 992px) {
      left: 0 !important;
      -webkit-transform: translateX(0) !important;
      transform: translateX(0) !important;
    }
  }
</style>
