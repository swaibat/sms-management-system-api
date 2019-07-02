import { users,propertys } from '../data/data';
import client from '../services/db';
export class User {
  constructor(firstName, lastName, email, address, phoneNumber, password, isAdmin) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  createUser(){
    const userQuery = 'INSERT INTO users(firstName,lastName,email,address,phoneNumber,password,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
    const values = [this.firstName,this.lastName,this.email,this.address,this.phoneNumber,this.password,this.isAdmin];
    return client.query(userQuery, values) //returns a promise
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

  static createProperty(){
      const query = 'INSERT INTO property(owner, price, address, city, state, type, imageUrl) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
      const values = [this.owner, this.price, this.address, this.city, this.state, this.type, this.imageUrl];
      return client.query(query, values);    // this returns a promise 
  }

  static updateProperty(address, state,id){
    const query = 'UPDATE property SET address=$1,city=$2 WHERE id=$3 RETURNING *'
    const value = [address, state,id]
    return client.query(query,value) 
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
