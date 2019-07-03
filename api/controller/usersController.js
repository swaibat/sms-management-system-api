import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import '@babel/polyfill';

dotenv.config();

export class UserController {
  async signUp(req, res) {
    const {
      firstName, lastName, email, address, phoneNumber, password, isAdmin,
    } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const userObj = new User(firstName, lastName, email, address, phoneNumber, hashPassword, isAdmin);
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
          phoneNumber: user.rows[0].phoneNumber,
          isAdmin: user.rows[0].isadmin,
          status: user.rows[0].status,
          token,
        },
      });
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message });
    }
  }


  async signIn(req, res) {
    const { email, password } = req.body;
    // check if a user with the given email exist.
    const user = await User.getUserByEmail(email);
    if (!user.rows[0]) return res.status(401).send({ status: 401, message: 'wrong username or password' });
    const passCompare = bcrypt.compareSync(password, user.rows[0].password);
    if (!passCompare) return res.status(401).send({ status: 401, message: 'wrong username or password' });
    const token = await jwt.sign({ email: req.body.email }, process.env.appSecreteKey, { expiresIn: '8hr' });
    res.status(200).send({
      status: 200,
      user: {
        id: user.rows[0].id,
        firstName: user.rows[0].firstname,
        lastName: user.rows[0].lastname,
        email: user.rows[0].email,
        address: user.rows[0].address,
        phoneNumber: user.rows[0].phoneNumber,
        isAdmin: user.rows[0].isadmin,
        status: user.rows[0].status,
        token,
      },
    });
  }
}
