import { users,propertys } from '../data/data';
export class User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.isAdmin = false;
    this.password = password;
  }

  static getUserByEmail(email){
    return users.find(u => u.email === email)
  }
  static allProperty(){
    return propertys
  }
}

export class Admin extends User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password){
      super(id, firstName, lastName, email, address, phoneNumber, password)
      this.isAdmin = true
  }
  static createProperty(property){
    propertys.push(property);
  }

  static updateProperty(property,address,city){
    property.address = address;
    property.city = city;
    return property;
  }

  static markPropertySold(property){
    property.status = 'sold';
    return property;
  }

  static deleteProperty(property){
    const findIndex = propertys.indexOf(property);
    propertys.splice(findIndex, 1);
  }
  
}
