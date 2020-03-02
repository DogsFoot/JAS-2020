import { addClass, removeClass } from "./classToggle.js";
import template from "./todolistTemplate.js";

let toDos = [];

const TODOS_LS = "toDos"; 

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function checkboxHandler(e, toDoObj) {
  const checkbox = e.target;
  if(checkbox.classList.contains("done")) {
    removeClass(checkbox, "done");
    checkbox.removeAttribute("checked");
    toDoObj.checked = "none";
  } else {
    addClass(checkbox, "done");
    checkbox.setAttribute("checked", true);
    toDoObj.checked = "checked";
  }
  saveToDo();
}

function removeToDoHandler(e, elemtodoBox) {
  const removeButton = e.target;
  const li = removeButton.parentNode;
  elemtodoBox.removeChild(li);

  const cleanToDo = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDo;
  saveToDo();
}

function addToDoListHandler(elemValue, elemtodoBox, elemCheckedStatus) {
  const li = document.createElement("li");
  li.innerHTML = template;
  
  const newId = toDos.length + 1;
  const span = li.querySelector("span");
  const checkbox = li.querySelector(".todo-checkbox");
  const removeButton = li.querySelector(".todo-delete");
  
  li.id = newId;

  span.innerText = elemValue;
  elemtodoBox.appendChild(li);


	const toDoObj = {
		text: elemValue,
    id: newId,
    checked: elemCheckedStatus
  }
  
  if(elemCheckedStatus == "checked") {
    addClass(checkbox, "done");
    checkbox.setAttribute("checked", "");
    
    toDoObj.checked = "checked";
  } else {
    removeClass(checkbox, "done");
    checkbox.removeAttribute("checked");
    
    toDoObj.checked = "none";
  }

	toDos.push(toDoObj);
  saveToDo();

  checkbox.addEventListener("click", function(e){
    checkboxHandler(e, toDoObj);
  });

  removeButton.addEventListener("click", function(e){
    removeToDoHandler(e, elemtodoBox);
  });
}

function addButtonHandler(elemInput, elemtodoBox) {
  const elemValue = elemInput.value.trim();
  const elemCheckedStatus = "none"; // 체크 기본 상태
  
  if(elemValue == "") {
    alert("입력해주세요.");
  } else {
    addToDoListHandler(elemValue, elemtodoBox, elemCheckedStatus);
  }
}

function loadTodo(elemtodoBox){
  const loadedToDos = localStorage.getItem(TODOS_LS); // 스토리지에서 투두리스트 데이터 가져오기

  if(loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);

    parseToDos.forEach(function(toDo){
      addToDoListHandler(toDo.text, elemtodoBox, toDo.checked);
    });
  }
}

function todolist(elemAddButton, elemInput, elemtodoBox) {

  loadTodo(elemtodoBox);

  elemAddButton.addEventListener("click", function(){
		addButtonHandler(elemInput, elemtodoBox);
  });
}

export default todolist;