const ToDo = {
	toDoRapper: document.querySelectorAll('.todo-wrap'),

	addTodoEvent () {
		this.toDoRapper.forEach((eachToDo, index) => this.ToDoEvent(eachToDo, index));
	},

	ToDoEvent (eachToDoWrapper, index) {
		const input = eachToDoWrapper.querySelector('.todo-input'),
			addButton = eachToDoWrapper.querySelector('.todo-add'),
			list =  eachToDoWrapper.querySelector('.todo-list');
		
		// 로컬스토리지에서 데이터 불러온후 li 뿌리기
		list.innerHTML = localStorage.getItem(eachToDoWrapper.className+(index+1));
		
		// 뿌려진 li내에 이벤트 걸기
		[...list.children].forEach(li => li.addEventListener('click', addEventForListItem));
		
		// li추가 이벤트 걸기
		addButton.addEventListener('click', addListItem);

		// li추가 이벤트
		function addListItem () {
			const elementLI = document.createElement('li');

			if (input.value.trim().length <= 0) {
				return alert('입력해주세요.');
			}

			elementLI.setAttribute('id', (list.childElementCount) ? Number(list.lastElementChild.id) + 1 : 1);
			elementLI.innerHTML = `<input type="checkbox" class="todo-checkbox"> <span>${input.value}</span> <button type="button" class="todo-delete">삭제</button>`;
			elementLI.addEventListener('click', addEventForListItem);

			input.value = '';
			input.focus();
			list.appendChild(elementLI);
			localStorage.setItem(eachToDoWrapper.className+(index+1), list.innerHTML);
		}

		// li내 체크및삭제 이벤트
		function addEventForListItem (e) {
			const target = e.target;

			if (target.getAttribute('type') === 'checkbox') {
				if (target.classList.contains('done')) {
					target.classList.remove('done');
					target.removeAttribute('checked');
				} else {
					target.classList.add('done');
					target.setAttribute('checked', '');
				}
			}

			if (target.getAttribute('class') === 'todo-delete') {
				list.removeChild(this);
			}
			localStorage.setItem(eachToDoWrapper.className+(index+1), list.innerHTML);
		}
	},

	init () {
		localStorage.clear();
		this.toDoRapper.forEach((eachToDo) => {
			eachToDo.querySelector('.todo-list').innerHTML = '';
		});
	}
}

ToDo.addTodoEvent();