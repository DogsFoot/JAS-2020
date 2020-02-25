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
    return !localStorage.getItem(this.STORAGE_KEY)
    ? null
    : new Set(JSON.parse(localStorage.getItem(this.STORAGE_KEY),
      (k, v) => (v.constructor === Object) ? new Task(v.title, v.id, v.done) : v
    ));
  }
}

export default Todo;