let elementBtnAdd = $('#add');
let elementBtnRemove = $('#delete');
let elementCardWarp = $('#card-wrap');

let add = () => {
	let cardLength = elementCardWarp.find('a').length;
	let newCard = elementCardWarp.find('a:first-child').clone();
	newCard.text(cardLength + 1).css('background', colorMaker());
	elementCardWarp.append(newCard);
}

let remove = () => {
	elementCardWarp.find('a:last-child').remove();
}

let colorMaker = () => {
	let colorR = Math.round(Math.random() * 0xFF).toString(16);
	let colorG = Math.round(Math.random() * 0xFF).toString(16);
	let colorB = Math.round(Math.random() * 0xFF).toString(16);
	let color = '#' + colorR + colorG + colorB;
	return color;
}

elementBtnAdd.on('click',function(){
	add();
});

elementBtnRemove.on('click', function(){
	let cardLength = elementCardWarp.find('a').length;
	if (cardLength === 1) {
		alert( '경고 : 제거할 수 없습니다');
	} else remove();
});

elementCardWarp.on('click', function(e){
	let thisCard = $(e.target);
	if(thisCard.hasClass('card')) {
		thisCard.css('background', colorMaker());
	}
});


