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
    this.tasks = [

    ];

    this.el = {
      input: document.querySelector('.todo-input'),
      ul: document.querySelector('.todo-list'),
      button: document.querySelector('.todo-add'),
      liTemplate: document.querySelector('#taskTemplate'),
    };

    this.addEvents();
    this.render();
  }

  addTask(title) {
    const t = new Task(title);
    this.tasks.push(t);
  }

  removeTask() {
    const selectedId = 0;
    this.tasks.filter(({ id }) => id !== selectedId);
  }

  render() {
    console.log(this.tasks);
    this.tasks.forEach(t => {

    });
  }

  addEvents() {
    const { input, button } = this.el;
    button.addEventListener('click', _ => this.addHandler());
  }

  addHandler() {
    const { input } = this.el;
    const title = input.value.trim();
    if (title === '') return alert('제목을 입력하세요.')
    this.addTask(title);
    this.render();
    input.value = '';
    input.focus();
  }
}

export default Todo;