class Dropdown {
  constructor(element) {
    // DOM 참조
    this.wrapper = document.querySelector(element);
    this.button = this.wrapper.querySelector('button');
    this.listbox = this.wrapper.querySelector(`[role='listbox']`);
    this.options = [...this.wrapper.querySelectorAll(`[role='option']`)];
    
    // 선택된 옵션 초기화
    this.selectedIndex = 0;
    this.options[this.selectedIndex].classList.add('focused');
    this.options[this.selectedIndex].setAttribute('aria-selected', true);

    // 이벤트 등록
    this.addEvents();
  }

  expand() {
    this.button.setAttribute('aria-expanded', true);
    this.listbox.classList.remove('hidden');
  }
  
  collapse() {
    this.button.removeAttribute('aria-expanded');
    this.listbox.classList.add('hidden');
  }

  selectOption() {
    const currentOption = this.options[this.selectedIndex];
    
    // 옵션을 순회하면서 기존에 선택된 옵션 해제
    this.options.some(option => {
      if (option.getAttribute('aria-selected')) {
        option.removeAttribute('aria-selected');
        option.classList.remove('focused');
        return true;
      }
    });
    
    currentOption.classList.add('focused');
    currentOption.setAttribute('aria-selected', true);

    this.button.textContent = currentOption.textContent;
    this.listbox.setAttribute('aria-activedescendant', currentOption.id);
  }

  // handler
  buttonClickHandler() {
    if (this.button.getAttribute('aria-expanded')) {
      this.collapse();
      this.button.focus();
    } else {
      this.expand();
      this.listbox.focus();
    }
  }

  optionClickHandler(e) {
    if (e.target.getAttribute('role') !== 'option' || e.target.getAttribute('aria-selected')) return;
    this.selectedIndex = this.options.indexOf(e.target);
    this.selectOption();
  }

  optionKeyHandler(e) {
    switch (e.keyCode) {
      case 38: // up
        if (this.selectedIndex <= 0) return;
        this.selectedIndex--;
        this.selectOption();
      break;
      case 40: // down
        if (this.selectedIndex >= this.options.length-1) return;
        this.selectedIndex++;
        this.selectOption();
      break;
      case 13: // enter
      case 27: // esc
        e.preventDefault();
        this.collapse();
        this.button.focus();
      break;
    }
  }

  blurHander(e) {
    if (e.relatedTarget === this.button) return;
    this.collapse();
  }

  addEvents() {
    this.button.addEventListener('click', () => this.buttonClickHandler());
    this.listbox.addEventListener('click', e => this.optionClickHandler(e));
    this.listbox.addEventListener('keydown', e => this.optionKeyHandler(e));
    this.listbox.addEventListener('blur', e => this.blurHander(e));
  }
}

export default Dropdown;