const buttons = document.querySelectorAll('[aria-haspopup=listbox]');

const closeList = function(button){
	let optionList = button.nextElementSibling;
	button.removeAttribute('aria-expanded');
	optionList.classList.add('hidden');
	button.focus();
}

const selectOption = {
	selectedIndex : 'null',
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
	up : function(optionListItems){
		if( this.selectedIndex === 'null') {
			this.selectedIndex = optionListItems.length - 1;
		} else if (this.selectedIndex === 0) {
		} else {
			this.selectedIndex = this.selectedIndex - 1;
		}
		this.select(optionListItems[this.selectedIndex]);
	},
	down : function(optionListItems){
		if( this.selectedIndex === 'null') {
			this.selectedIndex = 0;
		} else if (this.selectedIndex === (optionListItems.length - 1)){
		} else {
			this.selectedIndex = this.selectedIndex + 1;
		}
		this.select(optionListItems[this.selectedIndex]);
	},
	click : function(optionListItems, index){
		this.selectedIndex = index;
		this.select(optionListItems[this.selectedIndex]);
	}
}

const openList = function(button){
	let optionList = button.nextElementSibling;
	let optionListItems = optionList.querySelectorAll('[role=option]');
	optionListItems.forEach(function(item, index){
		if(item.getAttribute('class') === 'focused') {
			selectOption.selectedIndex = index;
		}
	});
	button.setAttribute('aria-expanded', 'true');
	optionList.classList.remove('hidden');
	optionList.focus();

	// Select Option by Key
	optionList.addEventListener('keyup', function (e){
		const keyCode = e.keyCode;
		if(keyCode == '38') {
			selectOption.up(optionListItems);
		}
		if(keyCode == '40') {
			selectOption.down(optionListItems);
		}      
	});

	// Open Or Close List by Click Button
	optionListItems.forEach(function(option, index){
		option.addEventListener('click', function(){
			selectOption.click(optionListItems, index);
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