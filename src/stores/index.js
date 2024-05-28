import {defineStore} from 'pinia';

export const useRootStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map((task) => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated';
      }
      return task;
    })
  }),
  actions: {
    setTasks(val) {
      this.tasks.push(val);
    },
    updateTask({id, description, date}) {
      const tasks = this.tasks;

      const index = tasks.findIndex((t) => t.id === id);
      const task = tasks[index];

      const status = new Date(date) > new Date() ? 'active' : 'outdated';

      tasks[index] = {...task, date: date, description: description, status};

      this.tasks = tasks;
    },
    completeTask(id) {
      const index = this.tasks.findIndex((t) => t.id === id);
      this.tasks[index].status = 'completed';
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
    getTasksById: (state) => (id) => state.tasks.find((task) => task.id === id)
  }
});
