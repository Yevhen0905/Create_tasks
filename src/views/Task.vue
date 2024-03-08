<template>
  <div>
    <div v-if="task" class="wrapper_create_task">
      <h2 class="task">TASK</h2>
      <h3>{{ task.title }}</h3>
      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker" />
        <button class="btn update" type="submit">Update</button>
        <button class="btn blue" @click="completeTask">Complete task</button>
      </form>
    </div>
    <div v-else>task not found</div>
  </div>
</template>

<script setup>
  import {computed, ref, onMounted} from 'vue';
  import {useRootStore} from '@/stores';
  import {useRoute, useRouter} from 'vue-router';

  const chips = ref(null);
  const datepicker = ref(null);
  const description = ref('');
  const chipsData = ref(null);
  const date = ref(null);

  const rootStore = useRootStore();
  const route = useRoute();
  const router = useRouter();

  const task = computed(() => rootStore.getTasksById(Number(route.params.id)));

  const getChips = () => {
    chipsData.value = M.Chips.init(chips.value, {
      placeholder: 'Task tags',
      data: task.value.tags
    });
  };

  const getDatepicker = () => {
    date.value = M.Datepicker.init(datepicker.value, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(task.value.date),
      setDefaultDate: true
    });
  };

  const getDescription = () => (description.value = task.value.description);

  setTimeout(() => {
    M.updateTextFields();
  }, 0);

  const submitHandler = async () => {
    rootStore.updateTask({
      id: task.value.id,
      description: description.value,
      date: date.value.date
    });
    router.push('/list');
  };

  const completeTask = () => {
    rootStore.completeTask(task.value.id);
    router.push('/list');
  };

  onMounted(getChips);
  onMounted(getDatepicker);
  onMounted(getDescription);
</script>

<style lang="scss">
  .update {
    margin-right: 20px;
  }

  .task {
    border-bottom: 1px solid;
    display: inline-block;
  }

  .materialize-textarea {
    height: 100%;
  }
</style>
