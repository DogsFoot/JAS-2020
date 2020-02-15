import { addClass, removeClass } from "./classToggle.js";
import template from "./todolistTemplate.js";

let toDos = [];

function checkboxHandler(e) {
  const checkbox = e.target;
  if(checkbox.classList.contains("done")) {
    removeClass(checkbox, "done");
    checkbox.removeAttribute("checked");
  } else {
    addClass(checkbox, "done");
    checkbox.setAttribute("checked", true);
  }
}

function removeToDoHandler(e, elemtodoBox) {
  const removeButton = e.target;
  const li = removeButton.parentNode;
  elemtodoBox.removeChild(li);
}

function addToDoListHandler(elemValue, elemtodoBox) {
  const li = document.createElement("li");
  li.innerHTML = template;
  
  const newId = toDos.length + 1;
  const span = li.querySelector("span");
  const checkbox = li.querySelector(".todo-checkbox");
  const removeButton = li.querySelector(".todo-delete");
  
  li.id = newId;
  toDos.push(newId);

  span.innerText = elemValue;
  elemtodoBox.appendChild(li);

  checkbox.addEventListener("click", function(e){
    checkboxHandler(e);
  });

  removeButton.addEventListener("click", function(e){
    removeToDoHandler(e, elemtodoBox);
  });
}

function addButtonHandler(elemInput, elemtodoBox) {
	const elemValue = elemInput.value.trim();

  if(elemValue == "") {
    alert("입력해주세요.");
  } else {
    addToDoListHandler(elemValue, elemtodoBox);
  }
}

function todolist(elemAddButton, elemInput, elemtodoBox) {
  elemAddButton.addEventListener("click", function(){
		addButtonHandler(elemInput, elemtodoBox);
  });
}

export default todolist;