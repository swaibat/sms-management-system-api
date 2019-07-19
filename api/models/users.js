import client from '../services/db';

class User {
  constructor(firstName, lastName, email, address, phoneNumber, password, isAgent) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.isAgent = isAgent;
    this.password = password;
  }

  createUser() {
    const userQuery = 'INSERT INTO users(firstName,lastName,email,address,phoneNumber,password,isAgent) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
    const values = [this.firstName, this.lastName, this.email, this.address, this.phoneNumber, this.password, this.isAgent];
    return client.query(userQuery, values);
  }

  static getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    return client.query(query, values);
  }

  static queryTypeOfProperty(type, isagent) {
    const query = isagent
      ? 'SELECT * FROM property WHERE type=$1 '
      : `SELECT * FROM property
    WHERE type=$1 and status='available' `;

    const value = [type];
    return client.query(query, value);
  }


  static allProperty(isagent) {
    const query = isagent
      ? 'SELECT * FROM property '
      : `SELECT * FROM property
    WHERE status='available' `;
    return client.query(query);
  }

}

class Agent extends User {

  static updateProperty(address, state, city, id) {
    const query = 'UPDATE property SET address=$1,city=$2,state=$3 WHERE id=$4 RETURNING *';
    const value = [address, city, state, id];
    return client.query(query, value);
  }


  static markPropertySold(id) {
    const query = 'UPDATE property SET status=$1 WHERE id=$2 RETURNING *';
    const value = ['sold', id];
    return client.query(query, value);
  }

  static delProperty(id) {
    const query = 'DELETE FROM  property WHERE id=$1 RETURNING *';
    const value = [id];
    return client.query(query, value);
  }
}

export { Agent, User }
;
