<template>
  <div>
    <h1>list</h1>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="wrapper_text">
            <div class="text_task">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td><router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">Open</router-link></td>
        </tr>
      </tbody>
    </table>
    <p v-else>no tasks</p>
  </div>
</template>

<script setup>
  import {computed} from 'vue';
  import {useRootStore} from '@/stores';

  const rootStore = useRootStore();

  const tasks = computed(() => rootStore.getTasks);

  console.log(tasks.value);
</script>

<style lang="scss">
  .text_task {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .wrapper_text {
    max-width: 350px;
    // width: 100%;
  }
</style>
