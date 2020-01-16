(function () {
	const cardModify = {
		cardWrap: document.getElementById('card-wrap'),
		add () {
			const cardElement = `<a class="card" role="button" style="background-color:#${getRandomColor()}">${this.cardWrap.childElementCount += 1}</a>`;

			this.cardWrap.innerHTML += cardElement;
		},
		delete () {
			if (this.cardWrap.childElementCount > 1) {
				this.cardWrap.removeChild(this.cardWrap.lastElementChild);
			} else {
				alert('카드는 최소 1개는 있어야 합니다.');
			}
		}
	};

	function getRandomColor () {
		const hexCodeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
		let hexCode = '';

		for (let i = 0; i < 6; i++) {
			hexCode += hexCodeArray[Math.floor(Math.random()*hexCodeArray.length)];
		}

		return hexCode;
	}

	const adding = cardModify.add.bind(cardModify);
	const deleting = cardModify.delete.bind(cardModify);

	document.getElementById('add').addEventListener('click', adding);
	document.getElementById('delete').addEventListener('click', deleting);
	document.getElementById('card-wrap').addEventListener('click', function (e) {
		const card = e.target;

		if (card !== this) {
			card.attributes['style'].textContent = `background-color: #${getRandomColor()}`;
		}
	});
})();