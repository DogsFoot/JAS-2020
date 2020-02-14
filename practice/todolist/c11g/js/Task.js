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

export default Task;