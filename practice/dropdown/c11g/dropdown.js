class Dropdown {
  constructor(element) {
    // DOM 참조
    this.wrapper = document.querySelector(element);
    this.button = this.wrapper.querySelector('button');
    this.listbox = this.wrapper.querySelector(`[role='listbox']`);
    this.options = [...this.wrapper.querySelectorAll(`[role='option']`)];
    
    // 선택된 옵션 index
    this.selectedIndex = 0;

    // add events
    this.addEvents();
  }

  toggleExpanded() {
    if ( this.button.getAttribute('aria-expanded') ) {
      this.button.removeAttribute('aria-expanded');
      this.listbox.classList.add('hidden');
    } else {
      this.button.setAttribute('aria-expanded', true);
      this.listbox.classList.remove('hidden');
    }
  }

  selectOption() {
    const currentOption = this.options[this.selectedIndex];
    
    this.options.some(option => {
      if ( option.getAttribute('aria-selected') ) {
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
    this.button.addEventListener('click', e => {
      this.toggleExpanded();
      this.listbox.focus();
      this.selectOption();
    });

    this.listbox.addEventListener('click', e => {
      if ( e.target.getAttribute('aria-selected') ) return;
      const clikedOptionIndex = this.options.indexOf(e.target);
      this.selectedIndex = clikedOptionIndex;
      this.selectOption();
    });
  }
}