import Task from './Task.js';

const Renderer = class {
  constructor(container, todo) {
    this.todo = todo;
    this.renderedTaskIDs = new Set();

    this.el = {
      input: container.querySelector('.todo-input'),
      ul: container.querySelector('.todo-list'),
      addButton: container.querySelector('.todo-add'),
      liTemplate: container.querySelector('#taskTemplate'),
    };

    this.addEvents();
    this.render();
  }

  render() {
    const { ul, liTemplate } = this.el;
    this.todo.tasks.forEach(t => {
      if (this.renderedTaskIDs.has(t.id)) return;
      this.renderedTaskIDs.add(t.id);
      const li = document.importNode(liTemplate.content, true).querySelector('li');
      const [checkbox, span, button] = li.children;
      li.dataset.id = t.id;
      span.textContent = t.title;
      checkbox.checked = t.done;
      t.done
        ? checkbox.classList.add('done')
        : checkbox.classList.remove('done');
      checkbox.addEventListener('click', e => this.toggleHandler(e, t));
      button.addEventListener('click', _ => this.removeHandler(t));
      ul.appendChild(li);
    });
  }

  addEvents() {
    const { addButton, input } = this.el;
    addButton.addEventListener('click', _ => this.addHandler());
    input.addEventListener('keydown', e => {
      if (e.keyCode !== 13) return;
      this.addHandler();
    });
  }

  addHandler() {
    const { input } = this.el;
    const title = input.value.trim();
    if (!title) return alert('제목을 입력해 주세요!');
    const task = new Task(title);
    this.todo.addTask(task);
    this.todo.save();
    this.render();
    input.value = '';
    input.focus();
  }

  removeHandler(t) {
    this.todo.removeTask(t);
    this.todo.save();
    this.renderedTaskIDs.delete(t.id);
    document.querySelector(`[data-id='${t.id}']`).remove();
  }

  toggleHandler(e, t) {
    t.toggle();
    e.target.classList.toggle('done');
    this.todo.save();
  }
}

export default Renderer;