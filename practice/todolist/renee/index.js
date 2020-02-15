import todolist from "./js/todolist.js";

const todo = {
  elemAddButton: document.querySelector('.todo-add'),
  elemInput: document.querySelector('.todo-input'),
  elemtodoBox: document.querySelector('.todo-list'),
};

const { elemAddButton, elemInput, elemtodoBox } = todo;

todolist(elemAddButton, elemInput, elemtodoBox);