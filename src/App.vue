<template>
  <div class="hero">
    <Navbar />
    <div class="wrapper_content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {RouterView} from 'vue-router';
  import Navbar from './components/Navbar.vue';

  import {watch} from 'vue';
  import {storeToRefs} from 'pinia';
  import {useRootStore} from './stores';

  const rootStore = useRootStore();
  const {tasks} = storeToRefs(rootStore);

  watch(
    tasks,
    (val) => {
      localStorage.setItem('tasks', JSON.stringify(val));
    },
    {deep: true}
  );
</script>

<style lang="scss">
  .wrapper_content {
    max-width: 1200px;
    width: 100%;
    padding: 0 5px;
    margin: 0 auto;
  }
</style>
