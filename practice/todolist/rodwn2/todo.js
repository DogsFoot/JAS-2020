class Todo {
	constructor (todoSelector) {
		this.domElement = {
			input: document.querySelector(`${todoSelector} .todo-input`),
			addButton: document.querySelector(`${todoSelector} .todo-add`),
			list: document.querySelector(`${todoSelector} .todo-list`)
		}

		this.addEvents();
	}

	todoData = [];
	#id = 1;

	addEvents () {
		this.domElement.addButton.addEventListener('click', this.addTodoHandler(this));
		this.domElement.input.addEventListener('keydown', this.addTodoHandler(this));
	}

	get todoTemplate () {
		return `<input type="checkbox" class="todo-checkbox"><span></span><button type="button" class="todo-delete">삭제</button>`;
	}

	set pushToData (todoElement) {
		this.todoData.push(todoElement);
		console.table(this.todoData);
	}
	
	render () {
		const {list} = this.domElement;
		
		if (list.hasChildNodes()) {
			list.innerHTML = null;
		}
		this.todoData.forEach((element) => {
			const liElement = document.createElement('li');
			liElement.setAttribute('id', element.id);
			liElement.innerHTML = this.todoTemplate;
			const [checkbox, span, button] = liElement.children;

			checkbox.addEventListener('click', this.checkboxToggleHandler(this));
			span.textContent = element.content;
			button.addEventListener('click', this.removeButtonClickHandler(this));
			list.append(liElement);
		});
	}

	addTodoHandler (that) {
		return function (e) {
			if (e.keyCode !== 13 && e.keyCode !== undefined) {
				return;
			}
			if (!that.domElement.input.value.trim()) {
				alert('다시 입력해주세요');
			} else {
				that.pushToData = new TodoElement (that.domElement.input.value, that.#id++);
				that.render();
			}

			that.domElement.input.value = '';
			that.domElement.input.focus();
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
			console.table(that.todoData);
		}
	}
}

class TodoElement {
	constructor (content, id, done = false) {
		this.content = content;
		this.id = id;
		this.done = done;
	}
}
