import Product from './Product.js';

class OrderingSystem {
  constructor(inventory){
    this.products = this.getProducts(inventory);
    this.cart = {};
    this.el = {
      shopProdcuts: document.querySelector('.shop .product'),
      customerProdcuts: document.querySelector('.customer .product'),
      cart: document.querySelector('.cart'),
    };

    this.renderProducts(inventory);
    this.addEvents();
  }

  getProducts(inventory){
    return inventory.map(({id, name, stock, imgUrl}) => new Product(id, name, stock, imgUrl));
  }

  updateCart(product, count){
    this.cart[product.id] = [product.name, count];
    if(count < 1) delete this.cart[product.id];
  }

  deleteHandler(e){
    const target = e.target;
    if (target.nodeName !== 'BUTTON') return;
    const product_id = target.dataset.id
    delete this.cart[product_id];
    this.renderCart();
    document.querySelector(`.customer [data-id=${product_id}] .spinner`).value = 0;
  }

  shopSpinnerHandler(e){
    const spinner = e.target;
    const stock = parseInt(spinner.value);
    if(stock < 0) {
      spinner.value = 0;
      return alert('재고를 0개 이상으로 설정해주세요.');
    }
    const product_id = spinner.parentElement.dataset.id;
    const product = this.products.find(({id}) => id === product_id);
    product.setStock(stock);
    this.renderCustomerProducts();
  }

  customerSpinnerHandler(e){
    const spinner = e.target;
    const count = parseInt(spinner.value);
    const product_id = spinner.parentElement.dataset.id;
    const product = this.products.find(({id}) => id === product_id);
    if(count < 0) {
      spinner.value = 0;
      return alert('주문 수량은 0개 이상으로 설정해주세요.');
    } else if(count > product.stock) {
      spinner.value = product.stock;
      return alert(`재고가 부족합니다. (최대 주문가능 수량: ${product.stock}개)`);
    }
    this.updateCart(product, count);
    this.renderCart();
  }
  
  addEvents(){
    const {shopProdcuts,customerProdcuts} = this.el;
    shopProdcuts.addEventListener('change', e => this.shopSpinnerHandler(e));
    customerProdcuts.addEventListener('change', e => this.customerSpinnerHandler(e));
    this.el.cart.addEventListener('click', e => this.deleteHandler(e));
  }

  renderCart(){
    this.el.cart.innerHTML = Object.entries(this.cart)
      .reduce((acc, product) => `${acc}<li>${product[1][0]} <span>${product[1][1]}</span><button type="button" class="btn-delete" data-id="${product[0]}">x</button></li>`
    , '');
  }

  renderProducts(inventory){
    this.renderShopProducts(inventory);
    this.renderCustomerProducts();
  }

  renderShopProducts(inventory){
    this.el.shopProdcuts.innerHTML = inventory.reduce((acc, {id,name,stock,imgUrl}) => {
      return `${acc}
      <li class="list-item" data-id="${id}">
        <label>
          <span>${name}</span>
        </label>
        <span class="thum"><img src="${imgUrl}" alt="${name}"></span>
        <input type="number" value="${stock}" class="spinner">
      </li>`
    }, '');
  }
  
  renderCustomerProducts(){
    this.el.customerProdcuts.innerHTML = this.products.reduce((acc, {id,name,stock,imgUrl}) => {
      return `${acc}
      <li class="list-item ${stock < 1 ? 'is-disabled' : ''}" data-id="${id}">
        <label for="for-chklist-${id}">
        <input type="checkbox" name="order-product" id="for-chklist-${id}">
          <span>${name}</span>
        </label>
        <span class="thum"><img src="${imgUrl}" alt="${name}"></span>
        <input type="number" value="0" class="spinner">
      </li>`
    }, '');
  }
}

export default OrderingSystem;

// ## 발주 시스템
// 소매사가 도매사에게 발주주문을 하는 간단 발주 시스템 입니다
// 재고의 개념과, 주문가능 수량과의 개념이 다릅니다.

// ## 소매사 스펙 정의
// [v] 아이템의 재고수량 조절시, 도매사의 재고보다 많은 수량을 입력하면, 얼럿노출되며 수량이 올라가지 않습니다.
//   [v] "재고가 부족합니다 (최대 주문가능 수량: N개)"
// [v] 수량을 1이라도 올리면, 바로바로 "소매 발주신청"란에 추가됩니다
// [v] "소매 발주신청"란에서 반대로 아이템을 제거할 수 있습니다
// [ ] 주문하기를 누르는 순간의 시간으로 "소매 발주 신청"이 텅 비게 되며, 히스토리로 옮겨집니다 `상태 : 발주 신청`
// [ ] 신청한 발주를 도매사가 처리 결정전, 취소 할 수 있습니다
// [ ] 도매사가 수락하면 취소할 수 없습니다
// [v] is-disabled 재고가 없으면

// ## 도매사 스펙 정의
// [v] 수시로 재고수량을 조절 할 수 있습니다.
// [v] 소매에서 발주 신청시, 다음 소매주문에서 `주문가능 수량`에서 차감됩니다
// [ ] 주문란
//   [ ] 수락이나 불가를 누르면 주문란 제거
//   [ ] 주문란은 리스트형태로 쌓일 수 있습니다
// [ ] 주문의 수락을 눌르면
//   [ ] `재고`수량 변경
//   [ ] 도매사에서 수락을 하면 히스토리의 상태변경 `상태 : 발주 완료`
// [ ] 주문의 불가를 누르면
//   [ ] `주문가능 수량` 변경
//   [ ] 도매사에서 불가을 하면 히스토리의 상태변경 `상태 : 발주 불가`