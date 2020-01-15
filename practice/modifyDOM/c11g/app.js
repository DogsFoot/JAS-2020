/* TODO
[v]] 추가 버튼: .card 요소 모델에 추가 -> makeCard
[v] .card 요소에 넘버링 추가
[v] .card 요소에 랜덤한 배경 컬러(#2e8b57) -> getRandomHexColor
[ ] 삭제 버튼: 마지막에 위치한 .card 요소 제거 -> removeCard
[ ] .card의 갯수가 1개 보다 작아지는 경우는 없습니다.(alert 경고 문구 노출)
[ ] .card 클릭: 배경 컬러 변경

.card: <a class="card" role="button" style="background:#2e8b57">1</a>
*/
const getRandomHexColor = () =>
  `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(
    Math.random() * 255
  )},${Math.ceil(Math.random() * 255)})`;

const App = class {
  constructor() {
    console.log("app fire");

    // DOM 참조
    this.el = {
      add: document.querySelector("#add"),
      remove: document.querySelector("#delete")
    };

    // 이벤트 등록
    this.addEvents();

    // 초기화
    this.addHandler();
  }

  makeCard() {
    const card = document.createElement("a");
    card.setAttribute("role", "button");
    card.classList.add("card");
    card.style.background = getRandomHexColor();
    card.textContent = document.querySelectorAll(".card").length + 1;
    return card;
  }

  addHandler() {
    console.log("call addHandler");
    document.querySelector("#card-wrap").appendChild(this.makeCard());
  }

  removeHandler() {
    console.log("call removeHandler");
  }

  addEvents() {
    const { add, remove } = this.el;
    add.addEventListener("click", () => this.addHandler());
    remove.addEventListener("click", () => this.removeHandler());
  }
};

export default App;
