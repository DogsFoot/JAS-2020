class Product {
  constructor(id,name,stock,available,imgUrl){
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.available = available;
    this.imgUrl = imgUrl;
  }

  setStock(count){
    this.stock = count;
  }

  setAvailable(count){
    this.available = count;
  }
}

export default Product;