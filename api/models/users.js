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
}
