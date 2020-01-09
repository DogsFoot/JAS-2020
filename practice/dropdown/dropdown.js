(function () {
	const trigger = document.getElementById('exp_button');
	const listBox = document.getElementById('exp_elem_list');
	const listArray = Array.prototype.slice.call(listBox.children);
	let selectedIndex;

	// 펼치기
	function expand () {
		trigger.setAttribute('aria-expanded', 'true');
		listBox.removeAttribute('class');
		listBox.focus();
	}
	
	// 접기
	function collapse () {
		trigger.removeAttribute('aria-expanded');
		listBox.classList.add('hidden');
		trigger.focus();
	}

	//선택된 인덱스 반환
	function findIndex (array) {
		let findedIndex;
		array.some(function (val, index) {
			if (val.getAttribute('aria-selected') === 'true') {
				findedIndex = index;
				return true;
			}
		});

		return findedIndex;
	}
	
	//클릭
	trigger.addEventListener('click', function () {
		if (trigger.getAttribute('aria-expanded') === null) {
			expand();
		}
	});

	listBox.addEventListener('blur', function () {
		collapse();
	});

	listBox.addEventListener('click', function (e) {
		let target;

		if (!(e.target === this ? false : target = e.target)) {
			return false;
		}

		listArray.forEach(function (val) {
			val.removeAttribute('class');
			val.removeAttribute('aria-selected');
		});
		listBox.setAttribute('aria-activedescendant', target['id']);
		target.classList.add('focused');
		target.setAttribute('aria-selected', 'true');
		trigger.textContent = target.textContent;
		selectedIndex = findIndex(listArray);
	});

	listBox.addEventListener('keydown', function (e) {
		const enter = 13;
		const esc = 27;
		const upArrow = 38;
		const downArrow = 40;
		const focusedItem = document.querySelector('.focused');
		const isAnySelected = listArray.every(item => item.getAttribute('aria-selected') === null);

		if (e.keyCode === esc || e.keyCode === enter) {
			this.blur();
			e.preventDefault();
		} else if (e.keyCode === upArrow) {
			e.preventDefault();
			
			if (isAnySelected) {
				listArray[0].classList.add('focused');
				listArray[0].setAttribute('aria-selected', 'true');
				listBox.setAttribute('aria-activedescendant', listArray[0]['id']);
				trigger.textContent = listArray[0].textContent;
				selectedIndex = 0;
			} else if (selectedIndex !== 0) {
				focusedItem.previousElementSibling.scrollIntoViewIfNeeded(false);

				listArray.forEach(function (item) {
					item.removeAttribute('class');
					item.removeAttribute('aria-selected');
				});

				listArray[selectedIndex - 1].classList.add('focused');
				listArray[selectedIndex - 1].setAttribute('aria-selected', 'true');
				listBox.setAttribute('aria-activedescendant', listArray[selectedIndex - 1]['id']);
				trigger.textContent = listArray[selectedIndex - 1].textContent;
				selectedIndex--;
			}
		} else if (e.keyCode === downArrow) {
			e.preventDefault();

			if (isAnySelected) {
				listArray[0].classList.add('focused');
				listArray[0].setAttribute('aria-selected', 'true');
				listBox.setAttribute('aria-activedescendant', listArray[0]['id']);
				trigger.textContent = listArray[0].textContent;
				selectedIndex = 0;
			} else if (selectedIndex < listArray.length - 1) {
				focusedItem.nextElementSibling.scrollIntoViewIfNeeded(false);

				listArray.forEach(function (item) {
					item.removeAttribute('class');
					item.removeAttribute('aria-selected');
				});
		
				listArray[selectedIndex + 1].classList.add('focused');
				listArray[selectedIndex + 1].setAttribute('aria-selected', 'true');
				listBox.setAttribute('aria-activedescendant', listArray[selectedIndex + 1]['id']);
				trigger.textContent = listArray[selectedIndex + 1].textContent;
				selectedIndex++;
			}
		}
	});
} ());