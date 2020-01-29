const ToDo = {
	toDoRapper: document.querySelectorAll('.todo-wrap'),

	init () {
		console.log(this.toDoRapper);
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
				return alert('최소 1글자 입력바랍니다.');
			}
			elementLI.textContent = input.value;
			elementLI.setAttribute('id', list.childElementCount+=1);
			console.log(list);
			list.appendChild(elementLI);
		}
	}
}

ToDo.init();