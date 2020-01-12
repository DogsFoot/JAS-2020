import handleButton from "./js/ButtonEvent.js";
import { handleSelectKey, handleListBlur, handleOptionClick } from "./js/SelectEvent.js";

const init = () => {
  handleButton();

  handleSelectKey();
  handleListBlur();
  handleOptionClick();
}

(function() {
  init();
})();