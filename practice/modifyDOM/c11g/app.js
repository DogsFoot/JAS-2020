/* TODO
[ ] 추가 버튼: .card 요소 생성 -> makeCard
[ ] .card 요소에 넘버링 추가
[ ] .card 요소에 랜덤한 배경 컬러(#2e8b57) -> getRandomColor
[ ] 삭제 버튼: 마지막에 위치한 .card 요소 제거 -> deleteCard
[ ] .card의 갯수가 1개 보다 작아지는 경우는 없습니다.(alert 경고 문구 노출)
[ ] .card 클릭: 배경 컬러 변경

.card: <a class="card" role="button" style="background:#2e8b57">1</a>
*/
const getRandomColor = () => {
  return '#ff0000';
};

const App = class {
  constructor() {
    console.log('app fire');

    // DOM 참조
    this.el = {
      add: document.querySelector('#add'),
      delete: document.querySelector('#delete'),
    };

    // 이벤트 등록
    this.addEvents();
  }

  makeCard() {
    
  }

  deleteCard() {

  }

  addEvents() {
    
  }
};

export default App;