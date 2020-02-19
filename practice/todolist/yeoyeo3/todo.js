class Todo {
  constructor($wrap) {
    this.elementTodo = $wrap;
    this.elementInput = $wrap.find('.todo-input');
    this.elementBtnAdd = $wrap.find('.todo-add');
    this.elementListTodo = $wrap.find('.todo-list');
    this.localStorageKey = this.elementTodo.attr('id');
    this.init();
  }

  init(){
    const inintData = [];
    if(!localStorage.getItem(this.localStorageKey)){
      localStorage.setItem(this.localStorageKey, JSON.stringify(inintData));
    } else {
      let allTodoDatas = this.storageData('get');
      allTodoDatas.forEach(todo => {
        const newTodoItem = $('<li>');
        newTodoItem.attr('id', todo.id)
          .append($('<input>').attr('type','checkbox').addClass('todo-checkbox'))
          .append($('<span>').text(todo.content))
          .append($('<button>').attr('type','button').addClass('todo-delete').text('삭제'));
        this.elementListTodo.append(newTodoItem);
      });
    }
		this.addHandler();
		this.removeHandler();
		this.doneHandler(); 
  }

  storageData(action, data) {
    let allTodoDatas = localStorage.getItem(this.localStorageKey);
    allTodoDatas = JSON.parse(allTodoDatas);
    if(action == 'get'){
      return allTodoDatas;
    }
    if(action == 'add'){
      allTodoDatas.push(data);
    }
    if(action == 'doneModify'){
      allTodoDatas[data].done = !allTodoDatas[data].done;
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(allTodoDatas));
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
    const CreatTodoData = function(content){
      this.id = new Date().getTime();
      this.content = content;
      this.done = false;
    };

    if(content === '') {
      alert('입력해주세요');
    } else {
      const newTodoData = new CreatTodoData(content);
      this.storageData('add', newTodoData);
      const newTodoItem = $('<li>');
      newTodoItem.attr('id', newTodoData.id)
        .append($('<input>').attr('type','checkbox').addClass('todo-checkbox'))
        .append($('<span>').text(content))
        .append($('<button>').attr('type','button').addClass('todo-delete').text('삭제'));

      this.elementListTodo.append(newTodoItem);
      this.elementInput.val('');
    }
  }

  doneTodo(thisElementTodoItem){
    const toDoneItemIndex = thisElementTodoItem.attr('id');
    const allTodoDatas = this.storageData('get');
    let todoDataIndex = '';
    allTodoDatas.some( (todo, index) => {
      if( toDoneItemIndex == todo.id ) {
        todoDataIndex = index;
      }
    });

    if(allTodoDatas[todoDataIndex].done === true){
      this.elementListTodo.find('#' + toDoneItemIndex).find('input')
        .attr('checked', false)
        .removeClass('done');
    } else {
      this.elementListTodo.find('#' + toDoneItemIndex).find('input')
        .attr('checked', true)
        .addClass('done');
    }

    this.storageData('doneModify', todoDataIndex);
  }

  removeTodo(thisElementTodoItem){
    const toRemoveItemIndex = thisElementTodoItem.attr('id');


    this.storageData('remove', newTodoData);
    localStorage.removeItem(toRemoveItemIndex);
    this.elementListTodo.find('#' + toRemoveItemIndex).remove();
  }
}

