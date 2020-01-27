### 과제 가이드

**주요 기능**
1. 추가 버튼: `.card` 요소 생성
  - `.card` 요소에 넘버링 추가
  - `.card` 요소에 랜덤한 배경 컬러(`#2e8b57`)
2. 삭제 버튼: 마지막에 위치한  `.card` 요소 제거
  - `.card`의 갯수가 1개 보다 작아지는 경우는 없습니다.(alert 경고 문구 노출)
3. `.card` 클릭: 배경 컬러 변경

```html
<button type="button" id="add">추가</button>
<button type="button" id="delete">삭제</button>
<hr>
<div class="card-wrap" id="card-wrap">
  <a class="card" role="button" style="background:#2e8b57">1</a>
</div>
```
[modifyDOM.html](modifyDOM.html) 복사해서 쓰세요.