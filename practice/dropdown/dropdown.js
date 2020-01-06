(function () {
	const wrapper = document.getElementById('exp_wrapper');
	const trigger = document.getElementById('exp_button');
	const listBox = document.getElementById('exp_elem_list');
	const listArray = Array.prototype.slice.call(listBox.children);
	let selectedIndex = 0;

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

	//인덱스찾기
	function findIndex (array) {
		array.forEach(function (val, index) {
			if (val.getAttribute('aria-selected') === 'true') {
				selectedIndex = index;

				return false;
			}
		});

		return selectedIndex;
	}
	
	//클릭
	trigger.addEventListener('click', function () {
		if (trigger.getAttribute('aria-expanded') === null) {
			expand();
		}
	});

	//선택된 항목이 최소 스크롤해야 볼 수 있는 항목인지아닌지
	function isFocusedItemIndexBiggerThanLastItemInVisibleScreenWithoutScroll (dropdownLayer, selectedIndex) {
		const layerHeight = dropdownLayer.offsetHeight;
		const itemHeight = listArray[0].offsetHeight;
		const itemCountOnScreen = Math.round(layerHeight / itemHeight);

		if (selectedIndex> itemCountOnScreen - 2) {
			return true;
		}
		return false;
	}

	listBox.addEventListener('blur', function () {
		collapse();
	});

	listArray.forEach(function (item) {
		item.addEventListener('click', function () {
			listArray.forEach(function (val) {
				val.removeAttribute('class');
				val.removeAttribute('aria-selected');
			});
			listBox.setAttribute('aria-activedescendant', item['id']);
			item.classList.add('focused');
			item.setAttribute('aria-selected', 'true');
			trigger.textContent = item.textContent;
			findIndex(listArray);
		});
	});

	listBox.addEventListener('keydown', function (e) {
		const enter = 13;
		const esc = 27;
		const upArrow = 38;
		const downArrow = 40;
		let focusedItem = document.querySelector('.focused');

		if (e.keyCode === esc || e.keyCode === enter) {
			this.blur();
			e.preventDefault();
		} else if (e.keyCode === upArrow) {
			e.preventDefault();
			
			if (listArray.every(function(item) {
					return item.getAttribute('aria-selected') === null;
				})) {
				listArray[0].classList.add('focused');
				listArray[0].setAttribute('aria-selected', 'true');
				trigger.textContent = listArray[0].textContent;
				selectedIndex = 0;
			} else if (selectedIndex > 0) {
				focusedItem.previousElementSibling.scrollIntoViewIfNeeded(false);

				listArray.forEach(function (item) {
					item.removeAttribute('class');
					item.removeAttribute('aria-selected');
				});

				listArray[selectedIndex - 1].classList.add('focused');
				listArray[selectedIndex - 1].setAttribute('aria-selected', 'true');
				trigger.textContent = listArray[selectedIndex - 1].textContent;
				selectedIndex--;
			}
		} else if (e.keyCode === downArrow) {
			e.preventDefault();

			if (listArray.every(function(item) {
					return item.getAttribute('aria-selected') === null;
				})) {
				listArray[0].classList.add('focused');
				listArray[0].setAttribute('aria-selected', 'true');
				trigger.textContent = listArray[0].textContent;
				selectedIndex = 0;
			} else if (selectedIndex < listArray.length - 1) {
				if (isFocusedItemIndexBiggerThanLastItemInVisibleScreenWithoutScroll (listBox, selectedIndex)){
					focusedItem.nextElementSibling.scrollIntoViewIfNeeded(false);
				};

				listArray.forEach(function (item) {
					item.removeAttribute('class');
					item.removeAttribute('aria-selected');
				});
		
				listArray[selectedIndex + 1].classList.add('focused');
				listArray[selectedIndex + 1].setAttribute('aria-selected', 'true');
				trigger.textContent = listArray[selectedIndex + 1].textContent;
				selectedIndex++;
			}
		}
	});
} ());