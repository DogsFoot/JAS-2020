class Dropdown {
  constructor(element) {
    // DOM 참조
    this.wrapper = document.querySelector(element);
    this.button = this.wrapper.querySelector('button');
    this.listbox = this.wrapper.querySelector(`[role='listbox']`);
    this.options = [...this.wrapper.querySelectorAll(`[role='option']`)];
    
    // 선택된 옵션 index
    this.selectedIndex = 0;
    this.keyMap = {
      up: 38,
      down: 40,
      enter: 13,
      esc: 27,
    };

    // add events
    this.addEvents();
  }

  toggleExpanded() {
    if (this.button.getAttribute('aria-expanded')) {
      this.button.removeAttribute('aria-expanded');
      this.listbox.classList.add('hidden');
      this.button.focus();
    } else {
      this.button.setAttribute('aria-expanded', true);
      this.listbox.classList.remove('hidden');
    }
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

  addEvents() {
    this.button.addEventListener('click', () => {
      console.log('button click')
      this.toggleExpanded();
      this.selectOption();
      this.listbox.focus();
    });

    this.listbox.addEventListener('click', e => {
      if (e.target.getAttribute('role') !== 'option' || e.target.getAttribute('aria-selected')) return;
      
      this.selectedIndex = this.options.indexOf(e.target);
      this.selectOption();
    });

    this.listbox.addEventListener('keydown', e => {
      switch ( e.keyCode ) {
        case this.keyMap.up:
          if (this.selectedIndex <= 0) return;
          this.selectedIndex--;
        break;
        case this.keyMap.down:
          if (this.selectedIndex >= this.options.length-1) return;
          this.selectedIndex++;
        break;
        case this.keyMap.enter:
        case this.keyMap.esc:
          this.listbox.blur();
          return;
      }
      this.selectOption();
    });

    this.listbox.addEventListener('blur', () => {
      console.log('blur')
      this.toggleExpanded();
    });
  }
}

export default Dropdown;