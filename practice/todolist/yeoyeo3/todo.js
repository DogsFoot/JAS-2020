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
    const thisElementTodo = this.elementTodo;
    const thisTodoData = this.dataTodo;

    this.elementBtnAdd.on('click', () => {
      this.addTodo(thisElementTodo, thisTodoData);
    });
    this.elementInput.on('keyup', (e) => {
      const enterKey = 13;
      const keyCode = e.keyCode;
      if(keyCode === enterKey) {
        this.addTodo(thisElementTodo, thisTodoData);
      }
    });
  }

  removeHandler(){
    const thisElementTodo = this.elementTodo;
    const thisTodoData = this.dataTodo;

    this.elementListTodo.on('click', (e) => {
      const thisElement = $(e.target);
      if(thisElement.hasClass('todo-delete')) {
        const thisElementTodoItem = thisElement.parent('li');
        this.removeTodo(thisElementTodo, thisTodoData, thisElementTodoItem);
      }
    });
  }

  doneHandler(){
    const thisElementTodo = this.elementTodo;
    const thisTodoData = this.dataTodo;

    this.elementListTodo.on('click', (e) => {
      const thisElement = $(e.target);
      if(thisElement.hasClass('todo-checkbox')) {
        const thisElementTodoItem = thisElement.parent('li');
        this.doneTodo(thisElementTodo, thisTodoData, thisElementTodoItem);
      }
    });
  }

  addTodo(thisElementTodo, thisTodoData){
    const thisElementInput = thisElementTodo.find('.todo-input');
    const thisElementList = thisElementTodo.find('.todo-list');
    const content = thisElementInput.val();

    if(content === '') {
      alert('입력해주세요');
    } else {
      const newTodoData = {};
      const newTodoItem = $('<li>')
      
      newTodoData.status = 'todo';
      newTodoData.content = content;
      thisTodoData.push(newTodoData);
      
      newTodoItem.attr('id', thisTodoData.length)
        .append($('<input>').attr('type','checkbox').addClass('todo-checkbox'))
        .append($('<span>').text(content))
        .append($('<button>').attr('type','button').addClass('todo-delete').text('삭제'));

      thisElementList.append(newTodoItem);
      thisElementInput.val('');
    }
  }

  doneTodo(thisElementTodo, thisTodoData, thisElementTodoItem){
    const thisElementList = thisElementTodo.find('.todo-list');
    const toDoneItemIndex = thisElementTodoItem.attr('id');

    if(thisElementTodoItem.find('input').hasClass('done')) {
      thisTodoData[toDoneItemIndex - 1].status = 'todo';
      thisElementList.find('#' + toDoneItemIndex).find('input')
        .attr('checked', '')
        .removeClass('done');
    } else {
      thisTodoData[toDoneItemIndex - 1].status = 'done';
      thisElementList.find('#' + toDoneItemIndex).find('input')
        .attr('checked', 'checked')
        .addClass('done');
    }
  }

  removeTodo(thisElementTodo, thisTodoData, thisElementTodoItem){
    const thisElementList = thisElementTodo.find('.todo-list');
    const toRemoveItemIndex = thisElementTodoItem.attr('id');

    thisTodoData.splice(toRemoveItemIndex - 1, 1);
    thisElementList.find('#' + toRemoveItemIndex).remove();
  }
}

