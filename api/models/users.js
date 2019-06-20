import {users} from '../data/data'

export class User{
  constructor(firstName,lastName,email,address,phoneNumber,password){
    this.firstName = firstName;
    this.lastName =lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isAdmin = false;
  }

  createUser(user){
    users.push(user);
  }
}
