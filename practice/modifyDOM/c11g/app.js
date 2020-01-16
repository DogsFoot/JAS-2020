const App = class {
	constructor() {
		// DOM 참조
		this.el = {
			add: document.querySelector('#add'),
			remove: document.querySelector('#delete'),
			wrap: document.querySelector('#card-wrap')
		};

		// 이벤트 등록
		this.addEvents();

		// 초기화
		this.addHandler();
	}

	getRandomHexColor() {
		return `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(
			Math.random() * 255
		)})`;
	}

	makeCard() {
		const { wrap } = this.el;
		const card = document.createElement('a');
		card.setAttribute('role', 'button');
		card.classList.add('card');
		card.style.background = this.getRandomHexColor();
		card.textContent = wrap.childElementCount + 1;
		return card;
	}

	addHandler() {
		const { wrap } = this.el;
		wrap.appendChild(this.makeCard());
	}

	removeHandler() {
		const { wrap } = this.el;
		if (wrap.childElementCount <= 1) return alert('카드는 1개 이상 있어야 합니다.');
		wrap.lastElementChild.remove();
	}

	cardClickHandler(e) {
		const target = e.target;
		if (!target.classList.contains('card')) return;
		target.style.background = this.getRandomHexColor();
	}

	addEvents() {
		const { add, remove, wrap } = this.el;
		add.addEventListener('click', () => this.addHandler());
		remove.addEventListener('click', () => this.removeHandler());
		wrap.addEventListener('click', (e) => this.cardClickHandler(e));
	}
};

export default App;
