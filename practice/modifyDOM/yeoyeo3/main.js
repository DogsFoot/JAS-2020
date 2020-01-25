(function(){
const elementBtnAdd = $('#add');
const elementBtnRemove = $('#delete');
const elementCardWarp = $('#card-wrap');

const add = () => {
	const cardLength = elementCardWarp.find('a').length;
	const newCard = elementCardWarp.find('a:first-child').clone();
	newCard.text(cardLength + 1).css('background', getRandomColor());
	elementCardWarp.append(newCard);
}

const remove = () => {
	elementCardWarp.find('a:last-child').remove();
}

const getRandomColor = () => {
	const hexColorR = Math.round(Math.random() * 0xFF).toString(16);
	const hexColorG = Math.round(Math.random() * 0xFF).toString(16);
	const hexColorB = Math.round(Math.random() * 0xFF).toString(16);
	const hexColor = '#' + hexColorR + hexColorG + hexColorB;
	return hexColor;
}

elementBtnAdd.on('click',function(){
	add();
});

elementBtnRemove.on('click', function(){
	const cardLength = elementCardWarp.find('a').length;
	if (cardLength === 1) {
		alert( '경고 : 제거할 수 없습니다');
	} else remove();
});

elementCardWarp.on('click', function(e){
	const thisCard = $(e.target);
	if(thisCard.hasClass('card')) {
		thisCard.css('background', getRandomColor());
	}
});
})();

