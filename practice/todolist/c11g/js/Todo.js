import Task from './Task.js';

const Todo = class {
  constructor() {
    this.STORAGE_KEY = 'tasks';
    this.tasks = this.load() || new Set();
  }

  addTask(task) {
    this.tasks.add(task);
  }

  removeTask(task) {
    this.tasks.delete(task);
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...this.tasks]));
  }

  load() {
    if (!localStorage.getItem(this.STORAGE_KEY)) return null;
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    const savedTask = data.reduce((tasks, t) => {
      const task = new Task(t.title, t.id, t.done);
      tasks.add(task);
      return tasks;
    }, new Set());
    return savedTask;
  }
}

export default Todo;