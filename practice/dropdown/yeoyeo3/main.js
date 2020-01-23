(function(){
const buttons = document.querySelectorAll('[aria-haspopup=listbox]');

const data = {
	btn : '',
	optionList : '',
	options : '',
	selected : null,
	beforeSelected : '',
	init : function(button, index){
		this.btn = button;
		this.optionList = button.nextElementSibling;
		this.options = this.optionList.querySelectorAll('[role=option]');
		this.selected = null;
		this.options.forEach(function(item, index){
			if(item.getAttribute('class') === 'focused') {
				this.selected =  index;
			}
		});
	},
}

const dropdown = {
	btn : '',
	optionList : '',
	options : '',
	init : function(btn){
		this.btn = btn;
		this.optionList = btn.nextElementSibling;
		this.options = this.optionList.querySelectorAll('[role=option]');
		this.expandEvent();
		this.collapseEvent();
		this.selectOptionEvent();
	},
	expandEvent : function(){
		this.btn.addEventListener('click', function(){
			if(data.btn.getAttribute('aria-expanded') === 'true') {
			} else {
				data.btn.setAttribute('aria-expanded', 'true');
				data.optionList.classList.remove('hidden');
				data.optionList.focus();
			}
		});
	},
	collapseEvent: function(){
		// Close List by Loosing focus
		this.optionList.addEventListener('blur', function (){
			dropdown.collapse();
		});
		// Close List by ESC or Enter
		this.optionList.addEventListener('keyup', function(e){
			const escKey = '27';
			const enterKey = '13';

			let keyCode = e.keyCode;
			if(keyCode === escKey || keyCode === enterKey) {
				dropdown.collapse(data.btn);
			}
		});
	},
	selectOptionEvent : function(){
		const upKey = 38;
		const downKey = 40;

		this.optionList.addEventListener('keyup', function(e){
			let keyCode = e.keyCode;

			//up
			if(keyCode === upKey) {
				if( data.selected === null) {
					data.selected = data.options.length - 1;
				} else if (data.selected === 0) {
				} else {
					data.selected = data.selected - 1;
				}
				dropdown.select();
			}

			//down
			if(keyCode === downKey) {
				if( data.selected === null) {
					data.selected = 0;
				} else if (data.selected === (data.options.length - 1)){
				} else {
					data.selected = data.selected + 1;
				}
				dropdown.select();
			}
		});

		// select by Click btn
		this.options.forEach(function(option, index){
			option.addEventListener('click', function(){
				data.selected = index;
				dropdown.select();
			});
		});
	},
	select : function(){
		data.beforeSelected = data.optionList.querySelector('.focused')
		data.beforeSelected === null || (
			data.beforeSelected.removeAttribute('aria-selected'),
			data.beforeSelected.classList.remove('focused')
		)
		data.options[data.selected].classList.add('focused');
		data.options[data.selected].setAttribute('aria-selected', 'true');
		data.optionList.setAttribute('aria-activedescendant', data.options[data.selected].getAttribute('id'));
		data.btn.textContent = data.options[data.selected].textContent;
	},
	collapse : function(){
		data.btn.removeAttribute('aria-expanded');
		data.optionList.classList.add('hidden');
		data.btn.focus();
	},
}

// Open Or Close List by Click Button
buttons.forEach(function(button, index){
	button.addEventListener('click', function(){
		data.init(button, index);
	});
	dropdown.init(button);
});
})();