const Todo = class {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }
}

export default Todo;