import { products } from '../data/data'

export class Product{
  constructor(price,address,city,state,type,image_url){
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.image_url = image_url;
    this.status = "available"
  }

  createProduct(product){
    products.push(product);
  }
}