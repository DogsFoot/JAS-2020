(function () {
	const cardModify = {
		cardWrap: document.getElementById('card-wrap'),
		add () {
			const cardElement = `<a class="card" role="button" style="background-color: #${getRandomColor()}">${this.cardWrap.childElementCount += 1}</a>`;

			this.cardWrap.innerHTML += cardElement;
		},
		delete () {
			if (this.cardWrap.childElementCount < 2) return alert('카드는 최소 1개는 있어야 합니다.');
			this.cardWrap.removeChild(this.cardWrap.lastElementChild);
		}
	};

	function getRandomColor () {
		const rgb = [];

		for (let i = 0; i < 3; i++) {
			rgb.push(Math.floor(Math.random()*256));
		}
	
		return rgb.reduce((acc, curr) => {
			if (acc < 16 && typeof acc === 'number') {
				acc = `0${acc.toString(16)}`;
			} else {
				acc = acc.toString(16);
			}
			if (curr < 16) {
				curr = `0${curr.toString(16)}`;
			} else {
				curr = curr.toString(16);
			}

			return acc + curr;
		});
	}

	const bindAdd = cardModify.add.bind(cardModify);
	const bindDelete = cardModify.delete.bind(cardModify);

	document.getElementById('add').addEventListener('click', bindAdd);
	document.getElementById('delete').addEventListener('click', bindDelete);
	document.getElementById('card-wrap').addEventListener('click', function (e) {
		const target = e.target;

		if (target.getAttribute('role') === 'button') {
			target.attributes['style'].textContent = `background-color: #${getRandomColor()}`;
		}
	});
})();