import modifyDOM from "./js/modifyDOM.js";

const modify = {
  addButton: document.querySelector('#add'),
  deleteButton: document.querySelector('#delete'),
  cardWrapper: document.querySelector('#card-wrap')
};

const elemAddButton = modify.addButton;
const elemDelButton = modify.deleteButton;
const elemCardWrapper = modify.cardWrapper;

modifyDOM(elemAddButton, elemDelButton, elemCardWrapper);