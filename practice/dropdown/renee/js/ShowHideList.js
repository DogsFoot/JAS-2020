import { expBtn, expList } from "./DropdownItem.js"

const showList = () => {
	expBtn.setAttribute("aria-expanded", "true");
  expList.classList.remove("hidden");
	// expList.focus();
}

const hideList = () => {
	expBtn.removeAttribute("aria-expanded");
	expList.classList.add("hidden");
	// expBtn.focus();
}

export {
  showList,
  hideList
};