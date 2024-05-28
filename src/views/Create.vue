<template>
  <div class="wrapper_create_task">
    <h2>Create task</h2>
    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          v-model="title"
          id="title"
          type="text"
          class="validate"
          required
        />
        <label for="title">Title</label>
        <span class="helper-text" data-error="title is required"></span>
      </div>
      <div class="chips" ref="chips"></div>

      <div class="input-field">
        <textarea
          v-model="description"
          id="description"
          class="materialize-textarea"
        ></textarea>
        <label for="description">Description</label>
        <span class="character-counter" style="float: right; font-size: 12px"
          >{{ description.length }}/2048</span
        >
      </div>
      <input type="text" ref="datepicker" />
      <button class="btn" type="submit">Create task</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {useRouter} from 'vue-router';
  import {useRootStore} from '@/stores';
  import M from 'materialize-css';

  interface Task {
    title: string;
    description: string;
    id: number;
    status: string;
    tags: Array<{tag: string}>;
    date: Date;
  }

  const chips = ref<HTMLElement | null>(null);
  const datepicker = ref<HTMLElement | null>(null);
  const description = ref<string>('');
  const title = ref<string>('');
  const chipsData = ref<any>(null);
  const date = ref<any>(null);

  const router = useRouter();
  const rootStore = useRootStore();

  const getChips = () => {
    if (chips.value) {
      chipsData.value = M.Chips.init(chips.value, {
        placeholder: 'Task tags'
      });
    }
  };

  const getDatepicker = () => {
    if (datepicker.value) {
      date.value = M.Datepicker.init(datepicker.value, {
        format: 'dd.mm.yyyy',
        defaultDate: new Date(),
        setDefaultDate: true
      });
    }
  };

  const submitHandler = async () => {
    const task: Task = {
      title: title.value,
      description: description.value,
      id: Date.now(),
      status: 'active',
      tags: chipsData.value.chipsData,
      date: date.value.date
    };

    rootStore.setTasks(task);
    router.push('/list');
  };

  onMounted(getChips);
  onMounted(getDatepicker);
</script>

<style lang="scss">
  .wrapper_create_task {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
