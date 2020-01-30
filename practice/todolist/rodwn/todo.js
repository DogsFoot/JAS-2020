const ToDo = {
	toDoRapper: document.querySelectorAll('.todo-wrap'),

	init () {
		this.toDoRapper.forEach(eachToDo => this.addToDoEvent(eachToDo));
	},

	addToDoEvent (eachToDoWrapper) {
		const input = eachToDoWrapper.querySelector('.todo-input'),
			addButton = eachToDoWrapper.querySelector('.todo-add');
		

		addButton.addEventListener('click', addListItem);

		function addListItem () {
			const list = eachToDoWrapper.querySelector('.todo-list')
				elementLI = document.createElement('li');

			if (input.value.trim().length <= 0) {
				return alert('입력해주세요.');
			}
			elementLI.setAttribute('id', list.childElementCount+=1);
			elementLI.innerHTML = `<input type="checkbox" class="todo-checkbox"> <span>${input.value}</span> <button type="button" class="todo-delete">삭제</button>`;
			elementLI.addEventListener('click', function (e) {
				const target = e.target;

				if (target.getAttribute('type') === 'checkbox') {
					if (target.classList.contains('done')) {
						target.classList.remove('done');
						target.removeAttribute('checked');
					} else {
						target.classList.add('done');
						target.setAttribute('checked','');
					}
				}

				if (target.getAttribute('class') === 'todo-delete') {
					list.removeChild(this);
				}
			});

			input.value = '';
			input.focus();
			list.appendChild(elementLI);
		}
	}
}

ToDo.init();