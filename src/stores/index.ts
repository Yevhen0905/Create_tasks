import {defineStore} from 'pinia';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  status: Status;
  tags: Array<{tag: string}>;
}

interface RootState {
  tasks: Task[];
}

type Status = 'active' | 'outdated' | 'completed';

export const useRootStore = defineStore('tasks', {
  state: (): RootState => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(
      (task: Task) => {
        if (new Date(task.date) < new Date()) {
          task.status = 'outdated';
        }
        return task;
      }
    )
  }),
  actions: {
    setTasks(task: Task) {
      this.tasks.push(task);
    },
    updateTask({
      id,
      description,
      date
    }: {
      id: number;
      description: string;
      date: string;
    }) {
      const tasks = this.tasks;

      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return;

      const task = tasks[index];

      const status: Status =
        new Date(date) > new Date() ? 'active' : 'outdated';

      tasks[index] = {...task, date, description, status};

      this.tasks = tasks;
    },
    completeTask(id: number) {
      const index = this.tasks.findIndex((t) => t.id === id);
      if (index === -1) return;

      this.tasks[index].status = 'completed';
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
    getTasksById: (state) => (id: number) =>
      state.tasks.find((task) => task.id === id)
  }
});
