const toDo = {
	toDoWrapper: document.querySelector('.todo-wrap'),
	resetButton: document.querySelector('.btn-reset'),
	addButton: document.querySelector('.todo-wrap .todo-add'),
	input: document.querySelector('.todo-wrap .todo-input'),
	list: document.querySelector('.todo-wrap .todo-list'),
	localData: localStorage.getItem('todo-data') || null,

	init () {
		const bindAddListItem = this.addListItem.bind(toDo),
			bindResetList = this.resetList.bind(toDo);

		this.input.addEventListener('keydown', bindAddListItem);
		this.resetButton.addEventListener('click', bindResetList);
		this.addButton.addEventListener('click', bindAddListItem);
		this.list.addEventListener('click', this.addCheckboxToggle);
		this.list.addEventListener('click', this.removeListItem);

		if (this.localData) {
			this.list.innerHTML = this.localData;
		}
	},

	addListItem (e) {
		const elementLI = document.createElement('li');
		
		if (e.keyCode !== 13 && e.keyCode !== undefined) {
			return;
		}
		
		if (!this.input.value.trim().length) {
			return alert('입력해주세요.');
		}

		elementLI.setAttribute('id', (this.list.childElementCount) ? Number(this.list.lastElementChild.id) + 1 : 1);
		elementLI.innerHTML = `<input type="checkbox" class="todo-checkbox"> <span>${this.input.value}</span> <button type="button" class="todo-delete">삭제</button>`;

		this.input.value = '';
		this.input.focus();
		this.list.appendChild(elementLI);
		localStorage.setItem('todo-data', this.list.innerHTML);
	},
	
	addCheckboxToggle (e) {
		const target = e.target;

		if (target.classList.contains('todo-checkbox')) {
			if (target.classList.contains('done') && target.getAttribute('checked') === 'checked') {
				target.classList.remove('done');
				target.removeAttribute('checked');
			} else {
				target.classList.add('done');
				target.setAttribute('checked', 'checked')
			}
		}

		localStorage.setItem('todo-data', this.innerHTML);
	},

	removeListItem (e) {
		const target = e.target; 

		if (target.classList.contains('todo-delete')) {
			this.removeChild(target.parentElement);
		}

		localStorage.setItem('todo-data', this.innerHTML);
	},

	resetList () {
		localStorage.clear();
		if (this.input.value) {
			this.input.value = '';
		}
		if (this.list.innerHTML.trim()) {
			this.list.innerHTML = '';
		}
	}
}

toDo.init();