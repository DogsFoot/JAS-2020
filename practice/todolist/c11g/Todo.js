const Task = class {
  constructor(title, done = false) {
    this.id = Date.now();
    this.title = title;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
};

const Todo = class {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const t = new Task(title);
    this.tasks.push(t);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }
}

export default Todo;