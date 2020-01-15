import { expBtn, expList, expListItem } from "./DropdownItem.js"
import { hideList } from "./ShowHideList.js"
import selectedOption from "./SelectedOption.js"
import { handleUpKey, handleDownKey } from "./SelectedKeyOption.js"

const handleSelectKey = () => {
	expList.addEventListener("keydown", function(e){
		const code = e.keyCode;
		const esc = 27,
			    enter = 13,
			    up = 38,
			    down = 40;

		let selectedItemIdx;
		expListItem.forEach(function(target, idx){
			if(target.getAttribute('class') === 'focused') {
				selectedItemIdx = idx;
			}
		});

    if (code === esc || code === enter) {
			hideList();
		} else if (code === up) {
			handleUpKey(selectedItemIdx);
		} else if (code === down) {
			handleDownKey(selectedItemIdx);
		}	
	});
}

const handleListBlur = () => {
	expList.addEventListener("blur", function(){
		hideList();
		expBtn.focus();
	});
} 

const handleOptionClick = () => {
	expListItem.forEach(function(target, idx){
		target.addEventListener("click", function(){
			selectedOption(expListItem[idx]);
		});
	});
}

export { 
	handleSelectKey,
	handleListBlur,
	handleOptionClick
};