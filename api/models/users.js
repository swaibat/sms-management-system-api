import {users} from '../data/users'

export class User{
  constructor(firstName,lastName,email,address,phoneNumber,password){
    this.firstName = firstName;
    this.lastName =lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  createUser(user){
    users.push(user);
  }
}
