class Todo {
  constructor($wrap) {
    this.elementTodo = $wrap;
    this.elementInput = $wrap.find('.todo-input');
    this.elementBtnAdd = $wrap.find('.todo-add');
    this.elementListTodo = $wrap.find('.todo-list');
    this.dataTodo = [];
  }

  init(){
		this.addHandler();
		this.removeHandler();
		this.doneHandler(); 
  }

  addHandler(){
    this.elementBtnAdd.on('click', () => {
      this.addTodo();
    });
    this.elementInput.on('keyup', (e) => {
      const enterKey = 13;
      const keyCode = e.keyCode;
      if(keyCode === enterKey) {
        this.addTodo();
      }
    });
  }

  removeHandler(){
    this.elementListTodo.on('click', (e) => {
      const thisElement = $(e.target);
      if(thisElement.hasClass('todo-delete')) {
        const thisElementTodoItem = thisElement.parent('li');
        this.removeTodo(thisElementTodoItem);
      }
    });
  }

  doneHandler(){
    this.elementListTodo.on('click', (e) => {
      const thisElement = $(e.target);
      if(thisElement.hasClass('todo-checkbox')) {
        const thisElementTodoItem = thisElement.parent('li');
        this.doneTodo(thisElementTodoItem);
      }
    });
  }

  addTodo(){
    const content = this.elementInput.val();

    if(content === '') {
      alert('입력해주세요');
    } else {
      const newTodoData = {};
      const newTodoItem = $('<li>')
      
      newTodoData.status = 'todo';
      newTodoData.content = content;
      this.dataTodo.push(newTodoData);
      
      newTodoItem.attr('id', this.dataTodo.length)
        .append($('<input>').attr('type','checkbox').addClass('todo-checkbox'))
        .append($('<span>').text(content))
        .append($('<button>').attr('type','button').addClass('todo-delete').text('삭제'));

      this.elementListTodo.append(newTodoItem);
      this.elementInput.val('');
    }
  }

  doneTodo(thisElementTodoItem){
    const toDoneItemIndex = thisElementTodoItem.attr('id');

    if(thisElementTodoItem.find('input').hasClass('done')) {
      this.dataTodo[toDoneItemIndex - 1].status = 'todo';
      this.elementListTodo.find('#' + toDoneItemIndex).find('input')
        .attr('checked', false)
        .removeClass('done');
    } else {
      this.dataTodo[toDoneItemIndex - 1].status = 'done';
      this.elementListTodo.find('#' + toDoneItemIndex).find('input')
        .attr('checked', true)
        .addClass('done');
    }
  }

  removeTodo(thisElementTodoItem){
    const toRemoveItemIndex = thisElementTodoItem.attr('id');

    this.dataTodo.splice(toRemoveItemIndex - 1, 1);
    this.elementListTodo.find('#' + toRemoveItemIndex).remove();
  }
}

