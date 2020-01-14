import handleButton from "./js/ButtonEvent.js";
import { handleSelectKey, handleListBlur, handleOptionClick } from "./js/SelectEvent.js";

const dropdown = () => {
  handleButton();

  handleSelectKey();
  handleListBlur();
  handleOptionClick();
}

dropdown();