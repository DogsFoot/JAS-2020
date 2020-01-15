# Dropdown

## 구현1. 펼침 기능
### 조건
- `#exp_button`에 포커스후 엔터 시
- `#exp_button`를 클릭시

### 필요 작업
- `#exp_button에 aria-expanded="true"` 추가
- `#exp_elem_list`의 `.hidden` 클래스 제거
- `#exp_elem_list`로 포커스 이동

## 구현2. 닫기 기능
### 조건
- `#exp_wrapper` 외 클릭시
- ESC키 입력시
- `#exp_button[aria-expanded="true"]` 을 클릭시
- `#exp_elem_list`에서 엔터시
- `#exp_elem_list`로 포커스가 다른 곳으로 이동시

### 필요 작업
- `#exp_button`에 `aria-expanded="true"` 제거
- `#exp_elem_list`의 `.hidden` 클래스 추가
- `#exp_button`로 포커스 이동


## 구현3. 선택 기능
### 조건
- UP/DOWN키로 접근시
- 마우스로 클릭시 (이 때 닫히지 않음)

### 필요 작업
- 이전 다른 추가되어 있던  `.focused` 제거
- 선택된 `li`에 `.focused` 클래스 추가, `[aria-selected="true"]` 추가
- `#exp_elem_list`의 `aria-activedescendant` 어트리뷰트 값을 선택된 `li`의 `id`값으로 변경
- `#exp_button`의 text를 선택된 `li`의 텍스트로 변경

## Source
### HTML
```html
<div id="exp_wrapper">
  <button type="button"
          aria-haspopup="listbox"
          aria-labelledby="exp_elem exp_button"
          id="exp_button">
    Neptunium
  </button>
  <ul id="exp_elem_list"
      tabindex="-1"
      role="listbox"
      aria-labelledby="exp_elem"
      class="hidden">
    <li id="exp_elem_Np" role="option">
      Neptunium
    </li>
    <li id="exp_elem_Pu" role="option">
      Plutonium
    </li>
    <li id="exp_elem_Am" role="option">
      Americium
    </li>
    <li id="exp_elem_Cm" role="option">
      Curium
    </li>
    <li id="exp_elem_Bk" role="option">
      Berkelium
    </li>
    <li id="exp_elem_Cf" role="option">
      Californium
    </li>
  </ul>
</div>
```

### CSS
```css
[role="listbox"] { margin: 1em 0 0; padding: 0; min-height: 18em; border: 1px solid #aaa; background: white; }
[role="option"] { position: relative; display: block; padding: 0 1em 0 1.5em; line-height: 1.8em; }
[role="option"].focused { background: #bde4ff; }
[role="option"][aria-selected="true"]::before { position: absolute; left: 0.5em; content: "✓"; }
button[aria-haspopup="listbox"] { position: relative; padding: 5px 10px; width: 150px; border-radius: 0; text-align: left; }
button[aria-haspopup="listbox"]::after {position: absolute;right: 5px;top: 10px;width: 0;height: 0;border: 8px solid transparent;border-top-color: currentColor;border-bottom: 0;content: ""; }
button[aria-haspopup="listbox"][aria-expanded="true"]::after {position: absolute;right: 5px;top: 10px;width: 0;height: 0;border: 8px solid transparent;border-top: 0;border-bottom-color: currentColor;content: ""; }
button[aria-haspopup="listbox"] + [role="listbox"] { position: absolute; margin: 0; width: 9.5em; max-height: 10em; border-top: 0; overflow-y: auto; }
button { font-size: inherit; }
.hidden { display: none; }
```
