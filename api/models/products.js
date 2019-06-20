/* eslint-disable linebreak-style */
import { products } from '../data/data';

// eslint-disable-next-line import/prefer-default-export
export class Product {
  constructor(price, address, city, state, type, imageUrl) {
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
    this.status = 'available';
  }

  // eslint-disable-next-line class-methods-use-this
  createProduct(product) {
    products.push(product);
  }
}
