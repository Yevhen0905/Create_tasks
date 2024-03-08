<template>
  <div>
    <h2>list tasks</h2>
    <div class="wrapper_filter">
      <select ref="select" v-model="filter">
        <option value="" disabled selected>Choose your option</option>
        <option value="active">Active</option>
        <option value="outdated">Outdated</option>
        <option value="completed">Completed</option>
      </select>
      <label>Status filter</label>
    </div>
    <button v-if="filter" class="btn red" @click="filter = null">clear filter</button>
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
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr_body" v-for="(task, index) in filterTasksByStatus" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td class="wrapper_text">
            <div class="text_task">
              {{ task.title }}
            </div>
          </td>
          <td>{{ new Date(task.date).toLocaleDateString('en-GB') }}</td>
          <td class="wrapper_text">
            <div class="text_task">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td><router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">Open</router-link></td>
          <td><button class="btn btn_delete red" @click="deleteTask(task.id)">X</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else>no tasks</p>
  </div>
</template>

<script setup>
  import {ref, computed, onMounted} from 'vue';
  import {useRootStore} from '@/stores';

  const select = ref(null);
  const filter = ref(null);

  const rootStore = useRootStore();

  const tasks = computed(() => rootStore.getTasks);
  const filterTasksByStatus = computed(() => {
    return tasks.value.filter((t) => {
      if (!filter.value) {
        return true;
      }
      return t.status === filter.value;
    });
  });

  const filterInit = () => {
    M.FormSelect.init(select.value);
  };

  const deleteTask = (id) => {
    rootStore.deleteTask(id);
  };

  onMounted(filterInit);
</script>

<style lang="scss">
  .text_task {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .wrapper_text {
    max-width: 300px;
    @media only screen and (max-width: 620px) {
      max-width: 200px;
    }

    @media only screen and (max-width: 520px) {
      max-width: 100px;
    }

    @media only screen and (max-width: 420px) {
      max-width: 40px;
    }
  }

  .wrapper_filter {
    width: 100%;
    max-width: 300px;
  }

  .tr_body {
    @media only screen and (max-width: 420px) {
      font-size: 12px;
    }
  }

  td {
    @media only screen and (max-width: 430px) {
      padding: 15px 2px;
    }
  }

  .btn_delete {
    border-radius: 50%;
  }
</style>
