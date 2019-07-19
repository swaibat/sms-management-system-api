import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import errHandle from '../helpers/errors';

dotenv.config();


class authMiddleware {
  static inputValidator(req, res, next) {
    const authSchema = Joi.object().keys({
      firstName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      lastName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      phoneNumber: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      isAgent: Joi.required(),
    });
    const data = Joi.validate(req.body, authSchema);
    if (typeof req.body.isAgent !== 'boolean') return errHandle(400, 'isAgent should be a boolean', res)
    if (data.error) {
      const resFomart = data.error.details[0].message.replace('"', '').split('"');
      const gotElem = resFomart[0];
      return errHandle(400, `${gotElem} field  is invalid `, res);
    }
    next();
  }

  // verify user token
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return errHandle(403, 'provide a token to get our services', res);
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    res.locals.token = bearerToken;
    next();
  }

  // check if real users trying access
  static ensureUserToken(req, res, next) {
    jwt.verify(res.locals.token, process.env.appSecreteKey, (err, user) => {
      if (err){
        let newMsg = err.message.replace("jwt", "Token");
        if (newMsg) return errHandle(403, err.message, res);;
      } 
      const dbUser = User.getUserByEmail(user.email);
      dbUser.then((u) => {
        res.locals.user = u.rows[0];
        return next();
      });
    });
  }

  // function creates user token
  static createUserToken(req, res, next) {
    const { email } = req.body;
    res.locals.token = jwt.sign({ email }, process.env.appSecreteKey, { expiresIn: '24hr' });
    return next();
  }

  // check if user already exists
  static checkUserExists(req, res, next) {
    const user = User.getUserByEmail(req.body.email);
    user.then(newUser =>{
      if (newUser.rows[0]) return errHandle(409, 'user already exists', res);
      return next();
    })
  }

  // check if user already exists
  static checkNoUser(req, res, next) {
    const { email, password } = req.body;
    const user = User.getUserByEmail(email);
    user.then((u) => {
      if (!u.rows[0]) return errHandle(404, 'user doesnt exist please signup', res);
      const passCompare = bcrypt.compareSync(password, u.rows[0].password);
      if (!passCompare) return errHandle(400, 'wrong username or password', res);
      return next();
    });
  }

  // check if the user is an agent
  static agentCheck(req, res, next) {
    
    if (res.locals.user.isagent === false) return errHandle(403, 'Only agent can access this service', res);
    next();
  }
}

export default authMiddleware;
