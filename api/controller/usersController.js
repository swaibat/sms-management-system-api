import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User,Agent, Admin } from '../models/users';
import { users } from '../data/data';

dotenv.config();

export class UserController {
  async signUp(req, res) {
    const {
      firstName, lastName, email, address, phoneNumber, password,isAdmin,
    } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const userObj = new User(firstName, lastName, email, address, phoneNumber, hashPassword,isAdmin);
    try {
      const user = await userObj.createUser();
      const token = await jwt.sign({ email }, process.env.appSecreteKey, { expiresIn: '1hr' });
      res.status(201).send({
        status: 201,
        user: {
          id: user.rows[0].id,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          email: user.rows[0].email,
          address: user.rows[0].address,
          isAdmin: user.rows[0].isadmin,
          status: user.rows[0].status,
          token,
        },
      });
    } catch (error) {
      res.status(400).send({ status: 400, message:error.message });
    }
  }
  

  // eslint-disable-next-line consistent-return
  signIn(req, res) {
    const { email, password } = req.body;
    const { token } = res.locals;
    const user = users.find(user => {return user.email === email && bcrypt.compareSync(password, user.password) });
    if (!user) return res.status(401).send({ status: 401, message: 'wrong username or password' });
    user.token = token;
    res.status(200).send({ status: 200, user});
  }
}
