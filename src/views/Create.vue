<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required />
          <label for="title">Title</label>
          <span class="helper-text" data-error="title is required"></span>
        </div>
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker" />
        <button class="btn" type="submit">Create task</button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import {useRouter} from 'vue-router';
  import {useRootStore} from '@/stores';

  const chips = ref(null);
  const datepicker = ref(null);
  const description = ref('');
  const title = ref('');
  const chipsData = ref(null);
  const date = ref(null);

  const router = useRouter();
  const rootStore = useRootStore();

  const getChips = () => {
    chipsData.value = M.Chips.init(chips.value, {
      placeholder: 'Task tags'
    });
  };

  const getDatepicker = () => {
    date.value = M.Datepicker.init(datepicker.value, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    });
  };

  const submitHandler = async () => {
    const task = {
      title: title.value,
      description: description.value,
      id: Date.now(),
      status: 'active',
      tags: chipsData.value.chipsData,
      date: date.value.date
    };

    rootStore.setTasks(task);
    router.push('/list')
  };

  onMounted(getChips);
  onMounted(getDatepicker);
</script>
