class Product {
  constructor(id,name,stock,imgUrl){
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.imgUrl = imgUrl;
  }

  setStock(count){
    this.stock = count;
  }
}

export default Product;