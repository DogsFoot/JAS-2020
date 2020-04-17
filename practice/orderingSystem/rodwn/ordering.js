(function() {
	const DOM = {
		domae: document.querySelector('.shop'),
		somae: document.querySelector('.customer'),
		domaeList: document.querySelector('.shop .list.product'),
		somaeList: document.querySelector('.customer .list.product'),
		cart: document.querySelector('.list.cart'),
		domaeHistory: document.querySelector('.shop .list.order'),
		somaeHistory: document.querySelector('.customer .list.order'),
		spinner: document.querySelectorAll('.spinner'),
		submit: document.querySelector('.btn-submit')
	};
	const request = new XMLHttpRequest();
	request.open('GET', './stock.json');
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		const {domae, somae, domaeList, somaeList, cart, somaeHistory, spinner, submit} = DOM;
		const domaeData = request.response;
		const somaeData = {
			cart: {},
			history: []
		};

		// 최초 재고를 화면에 출력
		function displayStock () {
			domaeList.querySelectorAll('li').forEach((element, index) => {
				element.querySelector('label span').textContent = domaeData[index].item;
				element.querySelector('.spinner').valueAsNumber = domaeData[index].stockQuantity;
			});
		}

		// 날짜형식
		Date.prototype.format = function () {
			let AMPM;
			const day = ['일', '월', '화', '수', '목', '금', '토'];
			let hour = this.getHours();

			if (hour - 12 > 0) {
				AMPM = '오후';
				hour -= 12;
			} else if (hour === 0) {
				AMPM = '오후';
			} else {
				AMPM = '오전';
			}

			return `${this.getFullYear()}년 ${this.getMonth() + 1}월 ${this.getDate()}일 (${day[this.getDay()]}) ${AMPM} ${hour}시 ${this.getMinutes()}분 ${this.getSeconds()}초`;
		};

		function isNegativeValue (targetSpinner) {
			if (targetSpinner.valueAsNumber < 0) {
				targetSpinner.valueAsNumber = 0;
				alert('수량은 0개 이하일 수 없습니다.');

				return true;
			}
		}

		function displayCart () {
			cart.innerHTML = '';
			for (let item in somaeData.cart) {
				const LI = document.createElement('li');
				
				LI.innerHTML = `<label>${item}</label>
								<span>${somaeData.cart[item]}</span>
								<button type="button" class="btn-delete">x</button>`;
				cart.appendChild(LI);
			}
		}

		function displayHistory () {
			[...document.querySelectorAll('.list.order')].forEach(ul => {
				ul.innerHTML = '';

				somaeData.history.forEach(element => {
					const LI = document.createElement('li');
					let subLITemplate = '';
					let statusTemplate;
					let timeStamp;
	
					for (let item in element) {
						if (item === 'status') {
							statusTemplate = element[item];
						} else if (item === 'time') {
							timeStamp = element[item];
						}	else {
							subLITemplate += `<li>${[item]} <span>${element[item]}</span></li>`;
						}
						
						if (ul.parentElement.className	 === 'shop') {
							LI.innerHTML = `<span class="text-date">${timeStamp}</span>
											<ul class="order-item">${subLITemplate}</ul>
											<div class="btn-area"><button type="button" class="btn-confirm">수락</button> <button type="button" class="btn-reject">불가</button></div>`;
							ul.appendChild(LI);
						} else if (ul.parentElement.className === 'customer') {
							LI.innerHTML = `<span class="text-date">${timeStamp}</span>
											<ul class="order-item">${subLITemplate}</ul>
											<div class="btn-area"><button type="button" class="btn-cancel">취소</button></div>
											<div class="status">${statusTemplate}</div>`;
							ul.prepend(LI);
						}
					}
				});
			});
		}
		
		function changeSpinnerHandler () {
			const target = this;
			let targetItem, targetQuantity;
			let orderableQuantity;

			isNegativeValue(target);
			
			targetItem = target.previousElementSibling.previousElementSibling.querySelector('span').textContent;
			targetQuantity = target.valueAsNumber;
			
			if (domae.contains(target)) {
				domaeData.some(element => {
					if (element.item === targetItem) {
						element.stockQuantity = targetQuantity;
						if (element.hasOwnProperty('orderableQuantity')) {
							if (element.stockQuantity - element.orderedQuantity < 0) {
								element.stockQuantity = element.orderedQuantity;
								target.valueAsNumber = element.orderedQuantity;
								return alert('이미 주문받은 수량이하로 재고를 조정할 수 없습니다.\n발주처리를 먼저 하십시오.');
							}
							element.orderableQuantity = element.stockQuantity - element.orderedQuantity;
						}
					}
				});

				console.table(domaeData);
			} else if (somae.contains(target)) {
				domaeData.some(element => {
					if (element.item === targetItem) {
						if (element.hasOwnProperty('orderableQuantity')) {
							orderableQuantity = element.orderableQuantity;
						} else {
							orderableQuantity = element.stockQuantity;
						}
						
						return true;
					}
				});
				
				if (targetQuantity > orderableQuantity) {
					target.valueAsNumber = orderableQuantity;
					targetQuantity = orderableQuantity;
					alert(`재고가 부족합니다 (최대 주문가능 수량: ${orderableQuantity}개)`);
				}
	
				if (targetQuantity <= 0) {
					delete somaeData.cart[targetItem];
				} else {
					somaeData.cart[targetItem] = targetQuantity;
				}
				
				displayCart();
	
				console.table(somaeData.cart);
			}
		}

		function removeCartItemHandler (e) {
			const target = e.target;
			let targetItem;
			
			if (target.className !== 'btn-delete') {
				return;
			}

			targetItem = target.previousElementSibling.previousElementSibling.textContent;
			delete somaeData.cart[targetItem];
			
			[...somaeList.children].some(element => {
				if (element.querySelector('label span').textContent === targetItem) {
					element.querySelector('.spinner').valueAsNumber = 0;
					return true;
				}
			});

			displayCart();

			console.table(somaeData.cart);
		}

		function submitButtonHandler () {
			const timeStamp = new Date().format();

			if (!cart.hasChildNodes()) {
				return alert('상품이 없습니다.');
			}

			cart.innerHTML = '';
			[...somaeList.children].filter(element => {
				return element.querySelector('.spinner').valueAsNumber !== 0;
			}).forEach(element => {
				element.querySelector('.spinner').valueAsNumber = 0;
			});

			for (let item in somaeData.cart) {
				domaeData.some(element => {
					if (element["item"] === item) {
						if (element.hasOwnProperty('orderableQuantity')) {
							element.orderableQuantity -= somaeData.cart[item];
						} else {
							element.orderableQuantity = element.stockQuantity - somaeData.cart[item];
						}
						element.orderedQuantity = element.stockQuantity  - element.orderableQuantity;
						return true;
					}
				});
			}

			somaeData.cart.status = '발주 신청';
			somaeData.cart.time = timeStamp;
			somaeData.history.push(somaeData.cart);
			somaeData.cart = {};

			displayHistory();
			console.table(domaeData);
			console.table(somaeData.history);
		}

		function cancelOrderingHandler (e) {
			const target = e.target;
			let orderIndex, matchedIndex;

			if (target.className !== 'btn-cancel') {
				return;
			}

			orderIndex = Array.prototype.indexOf.call([...somaeHistory.children].reverse(), target.parentElement.parentElement);
			
			somaeData.history.some((element, index) => {
				if (index === orderIndex) {
					matchedIndex = index;
					
					return true;
				}
			});
			for(let item in somaeData.history[matchedIndex]) {
				if (!(item === 'status' || item === 'time')) {
					domaeData.some(element => {
						if (element["item"] === item) {
							element.orderableQuantity += somaeData.history[matchedIndex][item];
							element.orderedQuantity -= somaeData.history[matchedIndex][item];
						}
					});
				}
			}
			somaeData.history.splice(matchedIndex, 1);
			displayHistory();

			console.table(domaeData);
			console.table(somaeData.history);
		}
		
		function addEvents () {
			displayStock();
			[...spinner].forEach(element => {
				element.addEventListener('change', changeSpinnerHandler);
			});
			cart.addEventListener('click', removeCartItemHandler);
			submit.addEventListener('click', submitButtonHandler);
			somaeHistory.addEventListener('click', cancelOrderingHandler);
		}

		addEvents();
	}
})();