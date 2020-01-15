import { expBtn, expList, expListItem } from "./DropdownItem.js"

const setButtonText = text => {
	expBtn.innerHTML = text;
}

const selectedOption = selectedItem => {
	expListItem.forEach(function(items){
		items.removeAttribute("class");
		items.removeAttribute('aria-selected');
	})
	selectedItem.classList.add('focused');
	selectedItem.setAttribute('aria-selected', 'true');
	expList.setAttribute("aria-activedescendant", selectedItem.id);
	setButtonText(selectedItem.textContent);
}

export default selectedOption;