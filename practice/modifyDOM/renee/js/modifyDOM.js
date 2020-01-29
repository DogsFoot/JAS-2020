function randomColor() {
  let color = Math.random().toString(16); // 16진수를 문자열로 랜덤 반환
  let colorHex =  "#" + color.slice(2, 8); // slice 문자열의 일부를 추출하면서 새로운 문자열을 반환
  return colorHex;
}

function addCardHandler(cardWrapper) {
  const card = cardWrapper.querySelectorAll(".card");
  let cardNumber = card.length + 1;
  const cardItem = `<a class="card" role="button" style="background-color: ${randomColor()}">${cardNumber}</a>`;
  cardWrapper.innerHTML += cardItem;
}

function removeCardHandler(cardWrapper) {
  const card = cardWrapper.querySelectorAll(".card");
  if (card.length > 1) {
    cardWrapper.removeChild(card[card.length-1]);
  } else {
    alert("카드의 최소 갯수는 1개입니다. 더이상 삭제 할 수 없습니다.")
  }
}

function modifyDOM(addButton, delButton, cardWrapper) {
  addButton.addEventListener("click", function(){
    addCardHandler(cardWrapper);
  });
  delButton.addEventListener("click", function(){
    removeCardHandler(cardWrapper);
  });
  cardWrapper.addEventListener("click", function(e){
    const target = e.target;
    if (target.classList.contains("card")) {
        target.style.backgroundColor = randomColor();
    }
  });
}

export default modifyDOM;