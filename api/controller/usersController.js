import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User,Agent, Admin } from '../models/users';
import { users } from '../data/data';

dotenv.config();

export class UserController {
  signUp(req, res) {
    const {firstName, lastName, email, address, phoneNumber, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const id = users.length + 1;
    const user = new User(id, firstName, lastName, email, address, phoneNumber, hashPassword);
    const agent = new Admin(id, firstName, lastName, email, address, phoneNumber, hashPassword);
    const token = jwt.sign({ email, password }, process.env.appSecreteKey, { expiresIn: '1hr' });
    user.token = token;
    agent.token = token;

    if (req.body.isAdmin){
      users.push(agent);
      res.status(201).send({ status: 201, agent });
    }
    users.push(user);
    res.status(201).send({ status: 201, user });
  }

  // eslint-disable-next-line consistent-return
  signIn(req, res) {
    const { email, password } = req.body;
    const token = jwt.sign({ email, password }, process.env.appSecreteKey, { expiresIn: '24hr' });
    // eslint-disable-next-line no-shadow
    const user = users.find(user => {return user.email === email && bcrypt.compareSync(password, user.password) });
    if (!user) return res.status(401).send({ status: '401', message: 'wrong username or password' });
    user.token = token;
    res.status(200).send({ status: 'success', user});
  }
}
