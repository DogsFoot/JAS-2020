class Product {
  constructor(id,name,stock){
    this.id = id;
    this.name = name;
    this.stock = stock;
  }

  setStock(count){
    this.stock = count;
  }
}

export default Product;