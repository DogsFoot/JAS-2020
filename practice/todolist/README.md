### 과제 가이드

**1차 주요 기능 (2020.02.09)**

1. 추가 버튼 (.todo-add)
- 입력 값이 없으면 alert창 ("입력해주세요.")
- 입력 값이 있으면 .todo-list 안에 li를 포함한 그 이하 요소 노출 (아래 예시 참고)
    - li에 id 노출 (id값은 숫자)
    - input checkbox 노출 (.todo-checkbox)
    - span 태그 안에 입력받은 텍스트 노출
    - button 노출 (.todo-delete)

2. 삭제 버튼 (.todo-delete)
- 삭제 버튼 클릭 시 li 요소 제거

3. 체크박스 (.todo-checkbox)
- 체크 시 클래스(.done)추가, checked 추가

---------------------------------------

**2차 주요 기능 (2020.02.23)**

4. localStorage 데이터 저장하기
- li id 값
- 입력 받은 텍스트
- 체크 여부

5. localStorage에 데이터가 있을 때 데이터 가져오기
- li id 값
- 저장한 텍스트 
- check 여부 판단하여 체크된 상태는 클래스(.done), checked 추가

---------------------------------------

- 최종 화면 : 할 일을 입력 받고, 할 일 리스트 노출, 할 일 삭제, 완료 시 체크, 브라우저 새로고침 후에도 남아있는 데이터
- localStorage 참고 URL
    - https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage

---------------------------------------

``` html
<li id="1">
	<input type="checkbox" class="todo-checkbox">
	<span>입력 받은 텍스트가 들어갑니다.</span>
	<button type="button" class="todo-delete">삭제</button>
</li>
<li id="2">
	<input type="checkbox" class="todo-checkbox">
	<span>입력 받은 텍스트가 들어갑니다.</span>
	<button type="button" class="todo-delete">삭제</button>
</li>
<li id="3">
	// 체크박스에 체크 시 클래스(.done), checked 노출
	<input type="checkbox" class="todo-checkbox done" checked>
	<span>입력 받은 텍스트가 들어갑니다.</span>
	<button type="button" class="todo-delete">삭제</button>
</li>
```

[todolist.html](todolist.html) 복사해서 쓰세요.