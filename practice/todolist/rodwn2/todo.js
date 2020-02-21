class Todo {
	constructor (todoSelector) {
		this.domElement = {
			input: document.querySelector(`${todoSelector} .todo-input`),
			addButton: document.querySelector(`${todoSelector} .todo-add`),
			list: document.querySelector(`${todoSelector} .todo-list`),
			clearButton: document.querySelector('.btn-reset')
		}

		this.addEvents();
		this.loadData;
	}

	todoData = [];
	#id = 1;

	addEvents () {
		const {input, addButton, clearButton} = this.domElement;

		addButton.addEventListener('click', this.addTodoHandler(this));
		input.addEventListener('keydown', this.addTodoHandler(this));
		clearButton.addEventListener('click', () => {
			this.todoData = [];
			this.#id = 1;
			this.constructor.clearLocalStorage();
		})
	}

	get todoTemplate () {
		return `<input type="checkbox" class="todo-checkbox"><span></span><button type="button" class="todo-delete">삭제</button>`;
	}

	get loadData () {
		if (!localStorage['todo']) {
			return false;
		}
		const loadedData = JSON.parse(localStorage.getItem('todo'));

		loadedData.forEach (element => {
			this.pushToData = new TodoElement (element.content, element.id, element.done);
		});
		this.render();
		return;
	}

	set pushToData (todoElement) {
		this.todoData.push(todoElement);
		console.table(this.todoData);
	}

	set saveData (todoData) {
		if (!todoData.length) {
			delete localStorage['todo'];
			return;
		}
		localStorage.setItem('todo', JSON.stringify(todoData));
	}
	
	render () {
		const {list} = this.domElement;
		
		if (list.hasChildNodes()) {
			list.innerHTML = '';
		}
		this.todoData.forEach((element) => {
			const liElement = document.createElement('li');
			liElement.setAttribute('id', element.id);
			liElement.innerHTML = this.todoTemplate;
			const [checkbox, span, button] = liElement.children;

			checkbox.addEventListener('click', this.checkboxToggleHandler(this));
			if (element.done) {
				checkbox.classList.add('done');
				checkbox.setAttribute('checked', 'checked');
			}
			span.textContent = element.content;
			button.addEventListener('click', this.removeButtonClickHandler(this));
			list.append(liElement);
		});
	}

	addTodoHandler (that) {
		return function (e) {
			const {input} = that.domElement;

			if (e.keyCode !== 13 && e.keyCode !== undefined) {
				return;
			}
			if (!input.value.trim()) {
				alert('다시 입력해주세요');
			} else {
				that.pushToData = new TodoElement (input.value, that.#id++);
				that.render();
			}

			input.value = '';
			input.focus();
			that.saveData = that.todoData;
		}
	}

	removeButtonClickHandler (that) {
		return function (e) {
			const target = e.target;
			const {list} = that.domElement;

			that.todoData.some((element, index) => {
				const isMatchID = element.id.toString() === target.parentNode.id;
				// console.log('called');
				if (isMatchID) {
					that.todoData.splice(index, 1);
					list.children[index].remove();
				}
		
				return isMatchID;
			});
			that.saveData = that.todoData;
			console.table(that.todoData);
		}
	}

	checkboxToggleHandler (that) {
		return function (e) {
			const target = e.target;
			const checkbox = this;

			if(checkbox.classList.contains('done')) {
				checkbox.classList.remove('done');
				checkbox.removeAttribute('checked');
			} else {
				checkbox.classList.add('done');
				checkbox.setAttribute('checked', 'checked');
			}

			that.todoData.some(element => {
				const isMatchID = element.id.toString() === target.parentNode.id;

				if (isMatchID) {
					element.done = !element.done;
				}

				return isMatchID;
			});
			that.saveData = that.todoData;
			console.table(that.todoData);
		}
	}

	static clearLocalStorage () {
		document.querySelector('.todo-list').innerHTML = '';
		localStorage.clear();
		console.log('clear completed!');
	}
}

class TodoElement {
	constructor (content, id, done = false) {
		this.content = content;
		this.id = id;
		this.done = done;
	}
}
