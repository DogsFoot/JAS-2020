(function() {
	const DOM = {
		domaeList: document.querySelector('.shop .list.product'),
		somaeList: document.querySelector('.customer .list.product'),
		cart: document.querySelector('.list.cart'),
		domaeHistory: document.querySelector('.shop .list.order'),
		somaeHistory: document.querySelector('.customer .list.order'),
		spinner: document.querySelectorAll('.spinner'),
		submit: document.querySelector('.btn-submit')
	};
	let orderIndex = 1;
	const request = new XMLHttpRequest();
	request.open('GET', './stock.json');
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		const {domaeList, somaeList, cart, domaeHistory, somaeHistory, spinner, submit} = DOM;
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
			} else if (getHour === 0) {
				AMPM = '오후';
			} else {
				AMPM = '오전';
			}

			return `${this.getFullYear()}년 ${this.getMonth() + 1}월 ${this.getDate()}일 (${day[this.getDay()]}) ${AMPM} ${hour}시 ${this.getMinutes()}분 ${this.getSeconds()}초`;
		};

		// 재고 파악

		// 수량 음수로 설정 불가
		spinner.forEach(element => {
			element.addEventListener('change', () => {
				if (element.valueAsNumber < 0) {
					element.valueAsNumber = 0;
					alert('수량은 0개 이하일 수 없습니다.');
				}
			});
		});

		// 소매 수량 변화
		somaeList.addEventListener('change', (e) => {
			const target = e.target;
			let targetItem, targetQuantity;
			let orderableQuantity;

			if (target.type !== 'number') {
				return;
			}
			
			targetItem = target.previousElementSibling.previousElementSibling.querySelector('span').textContent;
			targetQuantity = target.valueAsNumber;
			
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
			
			cart.innerHTML = '';
			for (let item in somaeData.cart) {
				const LI = document.createElement('li');
				
				LI.innerHTML = `<label>${item}</label>
								<span>${somaeData.cart[item]}</span>
								<button type="button" class="btn-delete">x</button>`;
				cart.appendChild(LI);
			}

			console.table(somaeData.cart);
		});

		// 카트 품목 지우기
		cart.addEventListener('click', (e) => {
			const target = e.target;
			let targetItem;
			
			if (target.className !== 'btn-delete') {
				return;
			}

			targetItem = target.previousElementSibling.previousElementSibling.textContent;
			targetLI = target.parentElement;

			delete somaeData.cart[targetItem];
			cart.removeChild(targetLI);
			[...somaeList.children].some(element => {
				if (element.querySelector('label span').textContent === targetItem) {
					element.querySelector('.spinner').valueAsNumber = 0;
					return true;
				}
			})

			console.table(somaeData.cart);
		});

		// 발주 버튼클릭
		submit.addEventListener('click', () => {
			const domaeLI = document.createElement('li');
			let somaeLI = document.createElement('li');
			
						
			if (!cart.hasChildNodes()) {
				return alert('상품이 없습니다.');
			}

			const domaeCartNode = cart.cloneNode(true);
			const somaeCartNode = cart.cloneNode(true);

			cart.innerHTML = '';
			[...somaeList.children].filter(element => {
				return element.querySelector('.spinner').valueAsNumber !== 0;
			}).forEach(element => {
				element.querySelector('.spinner').valueAsNumber = 0;
			});

			domaeCartNode.querySelectorAll('li').forEach(element => {
				element.removeChild(element.lastElementChild);
			});
			domaeCartNode.className = 'order-item';
			
			domaeLI.innerHTML = `<span class="text-date">${new Date().format()}</span>`;
			domaeLI.appendChild(domaeCartNode);
			domaeLI.innerHTML += `<div class="btn-area"><button type="button" class="btn-confirm">수락</button> <button type="button" class="btn-reject">불가</button></div>`;			
			domaeHistory.appendChild(domaeLI);
			
			somaeCartNode.querySelectorAll('li').forEach(element => {
				element.removeChild(element.lastElementChild);
			});
			somaeCartNode.className = 'order-item';
			somaeLI.dataset.index = orderIndex;
			somaeLI.innerHTML = `<span class="text-date">${new Date().format()}</span>`;
			somaeLI.appendChild(somaeCartNode);
			somaeLI.innerHTML += `<div class="btn-area"><button type="button" class="btn-cancel">취소</button></div>`;
			somaeLI.innerHTML += `<div class="status">발주 신청</div>`;
			somaeHistory.prepend(somaeLI);

			for (let item in somaeData.cart) {
				domaeData.some(element => {
					console.log('순회수');
					if (element["item"] === item) {
						if (element.hasOwnProperty('orderableQuantity')) {
							element.orderableQuantity = element.orderableQuantity - somaeData.cart[item];
						} else {
							element.orderableQuantity = element.stockQuantity - somaeData.cart[item];
						}

						return true;
					}
				});
			}

			somaeData.cart.status = '발주 신청';
			somaeData.cart.orderIndex = orderIndex;
			somaeData.history.push(somaeData.cart);
			somaeData.cart = {};
			orderIndex++;

			console.table(domaeData);
			console.table(somaeData.history);
		});

		// 발주 취소
		somaeHistory.addEventListener('click', (e) => {
			const target = e.target;
			let orderIndex, matchedIndex;

			if (target.className !== 'btn-cancel') {
				return;
			}

			orderIndex = target.parentElement.parentElement.dataset.index;
			
			somaeData.history.some((element, index) => {
				// console.log(element["orderIndex"], orderIndex);
				if (element["orderIndex"] === Number(orderIndex)) {
					console.log(element);
					matchedIndex = index;
					return true;
				}
			});
			console.log(matchedIndex);
			somaeData.history.splice(matchedIndex, 1);

			console.table(somaeData.history);

		});
		
		displayStock();
	}
})();