const Todo = class {
  constructor() {
    this.tasks = new Set();
  }

  addTask(task) {
    this.tasks.add(task);
  }

  removeTask(task) {
    this.tasks.delete(task);
  }
}

export default Todo;