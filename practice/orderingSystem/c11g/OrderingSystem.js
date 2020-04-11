import Product from './Product.js';

class OrderingSystem {
  constructor(inventory){
    this.products = this.getProducts(inventory);
    this.cart = {};
    this.shopOrderList = [];
    this.customerOrderList = [];
    this.statusMsg = ['발주 신청','발주 완료','발주 불가'];
    
    this.el = {
      shopProdcuts: document.querySelector('.shop .product'),
      customerProdcuts: document.querySelector('.customer .product'),
      cart: document.querySelector('.cart'),
      shopOrder: document.querySelector('.shop .order.list'),
      customerOrder: document.querySelector('.customer .order.list'),
      placeOrder: document.querySelector('.btn-submit'),
      shopOrder: document.querySelector('.shop .order'),
      customerOrder: document.querySelector('.customer .order'),
    };

    this.renderProducts();
    this.addEvents();
  }

  getProducts(inventory){
    return inventory.map(({id,name,stock,available,imgUrl}) => new Product(id,name,stock,available,imgUrl));
  }

  updateCart(product, count){
    this.cart[product.id] = [product.name, count];
    if(count < 1) delete this.cart[product.id];
  }

  findProductById(product_id){
    return this.products.find(({id}) => id === product_id);
  }

  restoreAvailableByOrder(order){
    order.products.forEach(product => {
      const p = this.products.find(p => p.id === product[0]);
      p.setAvailable(p.available+product[1][1]);
    });
  }

  findOrderById(id){
    return this.customerOrderList.find(order => order.date === parseInt(id));
  }

  dateFormatter(time){
    const date = new Date(time);
    return date.toString().split(' ').slice(0, 5).join(' ')
  }

  // Event & Handler
  addEvents(){
    const {shopProdcuts,customerProdcuts,cart,placeOrder,shopOrder,customerOrder} = this.el;
    shopProdcuts.addEventListener('change', e => this.shopSpinnerHandler(e));
    customerProdcuts.addEventListener('change', e => this.customerSpinnerHandler(e));
    cart.addEventListener('click', e => this.deleteHandler(e));
    placeOrder.addEventListener('click', _ => this.placeOrderHandler());
    shopOrder.addEventListener('click', e => this.shopOrderHandler(e));
    customerOrder.addEventListener('click', e => this.cancelOrderHandler(e));
  }

  shopSpinnerHandler(e){
    const spinner = e.target;
    const count = parseInt(spinner.value);
    const product = this.findProductById(spinner.parentElement.dataset.id);
    if(count < 0) {
      spinner.value = 0;
      return alert('재고를 0개 이상으로 설정해주세요.');
    }
    const diff = count - product.stock;
    product.setStock(count);
    product.setAvailable(product.available+diff);
    this.renderCustomerProducts();
  }

  customerSpinnerHandler(e){
    const spinner = e.target;
    const count = parseInt(spinner.value);
    const product = this.findProductById(spinner.parentElement.dataset.id);
    if(count < 0) {
      spinner.value = 0;
      return alert('주문 수량은 0개 이상으로 설정해주세요.');
    } else if(count > product.available) {
      spinner.value = product.available;
      return alert(`재고가 부족합니다. (최대 주문가능 수량: ${product.available}개)`);
    }
    this.updateCart(product, count);
    this.renderCart();
  }
  
  deleteHandler(e){
    const target = e.target;
    if (target.nodeName !== 'BUTTON') return;
    const product_id = target.dataset.id
    delete this.cart[product_id];
    this.renderCart();
    document.querySelector(`.customer [data-id=${product_id}] .spinner`).value = 0;
  }

  placeOrderHandler(){
    if (Object.keys(this.cart).length === 0) return;
    const order = {
      date: Date.now(),
      products: Object.entries(this.cart),
      status: 0, // 0: 발주 신청, 1: 발주 완료, 2: 발주 불가
    }
    order.products.forEach(product => {
      const p = this.products.find(p => p.id === product[0]);
      p.setAvailable(p.available-product[1][1]);
    });
    this.shopOrderList.push(order);
    this.customerOrderList.push(order);
    this.renderShopOrder();
    this.renderCustomerOrder();
    this.cart = {};
    this.renderCart();
    this.renderCustomerProducts();
  }

  cancelOrderHandler(e){
    const target = e.target;
    if (target.nodeName !== 'BUTTON') return;
    const currentOrder = this.findOrderById(target.dataset.id);
    this.customerOrderList = this.customerOrderList.filter(order => order !== currentOrder);
    this.shopOrderList = this.shopOrderList.filter(order => order !== currentOrder);
    this.restoreAvailableByOrder(currentOrder);
    this.renderShopOrder();
    this.renderCustomerOrder();
  }

  shopOrderHandler(e){
    const target = e.target;
    if (target.nodeName !== 'BUTTON') return;
    const role = target.dataset.role;
    const currentOrder = this.findOrderById(target.dataset.id);
    switch(role){
      case 'confirm':
        currentOrder.status = 1;
        currentOrder.products.forEach(product => {
          const p = this.products.find(p => p.id === product[0]);
          p.setStock(p.stock-product[1][1]);
        });
        this.renderProducts();
      break;
      case 'reject':
        currentOrder.status = 2;
        this.restoreAvailableByOrder(currentOrder);
      break;
      default: return;
    }
    this.shopOrderList = this.shopOrderList.filter(order => order !== currentOrder);
    this.renderShopOrder();
    this.renderCustomerOrder();
  }

  // Render
  renderCustomerOrder(){
    this.el.customerOrder.innerHTML = this.customerOrderList.reduce((acc, {date,products,status}) => `${acc}<li><span class="text-date">${this.dateFormatter(date)}</span><ul class="order-item">${
      products.map(p => `<li>${p[1][0]} <span>${p[1][1]}</span></li>`).join(' ')
    }</ul><div class="btn-area"><button type="button" class="btn-cancel" ${status !== 0?'disabled':''} data-id="${date}">취소</button></div><div class="status">${this.statusMsg[status]}</div></li>`,'');
  }

  renderShopOrder(){
    this.el.shopOrder.innerHTML = this.shopOrderList.reduce((acc, {date,products}) => `${acc}<li><span class="text-date">${this.dateFormatter(date)}</span><ul class="order-item">${
      products.map(p => `<li>${p[1][0]} <span>${p[1][1]}</span></li>`).join(' ')
    }</ul><div class="btn-area"><button type="button" class="btn-confirm" data-role="confirm" data-id="${date}">수락</button><button type="button" class="btn-reject" data-role="reject" data-id="${date}">불가</button></div></li>`,'');
  }
  
  renderCart(){
    this.el.cart.innerHTML = Object.entries(this.cart)
      .reduce((acc, product) => `${acc}<li>${product[1][0]} <span>${product[1][1]}</span><button type="button" class="btn-delete" data-id="${product[0]}">x</button></li>`
    , '');
  }

  renderProducts(){
    this.renderShopProducts();
    this.renderCustomerProducts();
  }

  renderShopProducts(){
    this.el.shopProdcuts.innerHTML = this.products.reduce((acc, {id,name,stock,imgUrl}) => {
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
        <span>${name}</span>
        <span class="thum"><img src="${imgUrl}" alt="${name}"></span>
        <input type="number" value="0" class="spinner">
      </li>`
    }, '');
  }
}

export default OrderingSystem;