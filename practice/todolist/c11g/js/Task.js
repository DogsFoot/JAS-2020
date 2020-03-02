const Task = class {
  constructor(title, id = Date.now(), done = false) {
    this.title = title;
    this.id = id;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
};

export default Task;