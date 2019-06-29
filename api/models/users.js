import { propertys, users } from '../data/data';
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
  static allProperty(){
    return propertys.filter(property => property.status === 'available');
  }
  static getUserByEmail(email){
    users.find(u => u.email === email)
  }
}

export class Admin extends User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password){
      super(id, firstName, lastName, email, address, phoneNumber, password)
      this.isAdmin = true
  }
  static markPropertySold(property){
    property.status = 'sold';
  }
}
