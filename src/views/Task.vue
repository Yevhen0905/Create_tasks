<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker" />
        <button class="btn" type="submit">Update</button>
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
      defaultDate: new Date(),
      setDefaultDate: true
    });
  };

  const getDescription = () => (description.value = task.value.description);

  setTimeout(() => {
    M.updateTextFields();
  }, 0);

  const submitHandler = async () => {
    rootStore.setTasks(task);
    router.push('/list');
  };

  onMounted(getChips);
  onMounted(getDatepicker);
  onMounted(getDescription);
</script>

<style lang="scss"></style>
