(function(){
const buttons = document.querySelectorAll('[aria-haspopup=listbox]');

const closeList = function(button){
	let optionList = button.nextElementSibling;
	button.removeAttribute('aria-expanded');
	optionList.classList.add('hidden');
	button.focus();
}

const selectOption = {
	select : function(selectedOption){
		let optionList = selectedOption.parentElement;
		let beforeSelected = optionList.querySelector('.focused');
		let selectedOptionID = selectedOption.getAttribute('id');
		let button = optionList.previousElementSibling;
		
		beforeSelected === null ? '' : (
			beforeSelected.removeAttribute('aria-selected'),
			beforeSelected.classList.remove('focused')
		)
		selectedOption.classList.add('focused');
		selectedOption.setAttribute('aria-selected', 'true');
		optionList.setAttribute('aria-activedescendant', selectedOptionID);
		button.textContent = selectedOption.textContent;
	},
	up : function(optionListItems, selectedOptionIndex){
		if( selectedOptionIndex === 'null') {
			this.select(optionListItems[optionListItems.length - 1]);
			return optionListItems.length - 1;
		} else if (selectedOptionIndex === 0) {
			return selectedOptionIndex;
		} else {
			this.select(optionListItems[selectedOptionIndex - 1]);
			return selectedOptionIndex - 1;
		}
	},
	down : function(optionListItems, selectedOptionIndex){
		if( selectedOptionIndex === 'null') {
			this.select(optionListItems[0]);
			return 0;
		} else if (selectedOptionIndex === (optionListItems.length - 1)){
			return selectedOptionIndex;
		} else {
			this.select(optionListItems[selectedOptionIndex + 1]);
			return selectedOptionIndex + 1;
		}
	},
	click : function(optionListItems, index){
		this.select(optionListItems[index]);
		return index;
	}
}

const openList = function(button){
	let optionList = button.nextElementSibling;
	let optionListItems = optionList.querySelectorAll('[role=option]');
	let selectedOptionIndex = 'null';
	optionListItems.forEach(function(item, index){
		if(item.getAttribute('class') === 'focused') {
			selectedOptionIndex = index;
		}
	});
	button.setAttribute('aria-expanded', 'true');
	optionList.classList.remove('hidden');
	optionList.focus();

	// Select Option by Key
	optionList.addEventListener('keyup', function (e){
		const keyCode = e.keyCode;
		if(keyCode == '38') {
			selectedOptionIndex = selectOption.up(optionListItems, selectedOptionIndex);
		}
		if(keyCode == '40') {
			selectedOptionIndex = selectOption.down(optionListItems, selectedOptionIndex);
		}      
	});

	// Open Or Close List by Click Button
	optionListItems.forEach(function(option, index){
		option.addEventListener('click', function(){
			selectedOptionIndex = selectOption.click(optionListItems, index);
		});
	});

	// Close List by ESC or Enter
	optionList.addEventListener('keyup', function (e){
		const keyCode = e.keyCode;
		if(keyCode == '27' || keyCode == '13') {
			closeList(button);
		}
	});

	// Close List by Loosing focus
	optionList.addEventListener('blur', function (e){
		closeList(button);
	});
}

// Open Or Close List by Click Button
buttons.forEach(function(button, index){
	button.addEventListener('click', function(){
		if(button.getAttribute('aria-expanded') === 'true') {
			closeList(button);
		} else {
			openList(button);
			// 다른 열린 것 닫고 싶음
		}
	});
});
})();