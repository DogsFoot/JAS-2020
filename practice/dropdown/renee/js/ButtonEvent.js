import { expBtn, expList} from "./DropdownItem.js"
import { showList, hideList } from "./ShowHideList.js";

const handleButton = () => {
  expBtn.addEventListener("click", function(){
    if(expBtn.getAttribute('aria-expanded')) {
			hideList();
			expBtn.focus();
		} else {
			showList();
			expList.focus();
		}
  });
}

export default handleButton;