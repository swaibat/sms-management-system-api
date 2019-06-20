/* eslint-disable linebreak-style */
// eslint-disable-next-line import/named
import { propertys } from '../data/data';

// eslint-disable-next-line import/prefer-default-export
export class Property {
  constructor(id, price, address, city, state, type, imageUrl) {
    this.id = id;
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
    this.status = 'available';
  }

  // eslint-disable-next-line class-methods-use-this
  createProperty(property) {
    propertys.push(property);
  }
}
