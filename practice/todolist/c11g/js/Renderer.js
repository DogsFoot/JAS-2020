const Renderer = class {
  constructor(container, todo) {
    this.todo = todo;

    this.el = {
      input: container.querySelector('.todo-input'),
      ul: container.querySelector('.todo-list'),
      addButton: container.querySelector('.todo-add'),
      liTemplate: container.querySelector('#taskTemplate'),
    };

    this.addEvents();
  }

  render() {
    const { tasks } = this.todo;
    const { ul, liTemplate } = this.el;
    const oldTaskId = [...ul.querySelectorAll('li')].map(li => Number(li.id));

    tasks.forEach(t => {
      if (oldTaskId.includes(t.id)) return;
      const li = document.importNode(liTemplate.content, true);
      li.querySelector('li').id = t.id;
      li.querySelector('span').textContent = t.title;
      li.querySelector('input').addEventListener('click', e => this.toggleHandler(e, t));
      li.querySelector('button').addEventListener('click', _ => this.removeHandler(t));
      ul.appendChild(li);
    });
  }

  addEvents() {
    const { addButton, input } = this.el;
    addButton.addEventListener('click', _ => this.addHandler());
    input.addEventListener('keydown', e => {
      if (e.keyCode !== 13) return;
      this.addHandler()
    });
  }

  addHandler() {
    const { input } = this.el;
    const title = input.value.trim();
    if (!title) return alert('제목을 입력해 주세요!');
    this.todo.addTask(title);
    this.render();
    input.value = '';
    input.focus();
  }

  removeHandler(t) {
    const { tasks } = this.todo;
    const removeIndex = tasks.findIndex(task => task === t);
    this.todo.removeTask(t);

    const { ul } = this.el;
    ul.querySelectorAll('li')[removeIndex].remove();
  }

  toggleHandler(e, t) {
    t.toggle();
    e.target.classList.toggle('done');
  }
}

export default Renderer;