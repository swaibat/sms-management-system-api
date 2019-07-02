import { propertys } from '../data/data';
export class Property {
  constructor(id, owner, price, address, city, state, type, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
    this.status = 'available';
    this.createdOn = Date.now()
  }
  createProperty(property){
    propertys.push(property);
  }
}
