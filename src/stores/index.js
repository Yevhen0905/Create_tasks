import {defineStore} from 'pinia';

export const useRootStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),
  actions: {
    setTasks(val) {
      this.tasks.push(val);
      return localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getTasksById: state => id => state.tasks.find(task => task.id === id)
  }
});
