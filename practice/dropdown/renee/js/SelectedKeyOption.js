import { expListItem } from "./DropdownItem.js"
import selectedOption from "./SelectedOption.js"

const handleUpKey = selectedItemIdx => {
	if(selectedItemIdx === 0) {
		selectedOption(expListItem[expListItem.length - 1]);
	} else {
		selectedOption(expListItem[selectedItemIdx - 1]);
	}
}

const handleDownKey = selectedItemIdx => {
	if(selectedItemIdx === expListItem.length - 1) {
		selectedOption(expListItem[0]);
	} else {
		selectedOption(expListItem[selectedItemIdx + 1]);
	}
}

export {
  handleUpKey,
  handleDownKey
}