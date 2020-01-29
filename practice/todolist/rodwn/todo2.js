const ToDo = function (wrapperSelector) {
	//모든 투두 클래스를 가진 엘리먼트들을 찾구
	this.toDoRapper = document.querySelectorAll(`.${wrapperSelector}`);


	//각 투두에 추가할 동작이벤트 함수를 선언한 뒤,
	this.addToDoEvent = function (eachToDoWrapper) {
		const addButton = eachToDoWrapper.querySelector('.todo-add');

		addButton.addEventListener('click', function () {
			alert('됐지롱!');
		});
	};

	// 내부함수에서 this를 사용하기 위한 this고정 Bind후에
	const bindAddToDoEvent = this.addToDoEvent.bind(ToDo);

	// 각 투두 엘리먼트에 선언해놓은 동작이벤트 함수를 실행한다!
	this.toDoRapper.forEach(eachToDo => bindAddToDoEvent(eachToDo));
