import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';
import store from 'store';

dotenv.config();

export function verifyToken(req, res, next) {
  let keys = store.get('token')
  if ( typeof keys === 'undefined' ) return res.status(403).send({ error: 403, message: 'provide a token to get our services' });
  res.locals.token = keys;
  next();
}

// check if real users trying access
export function ensureUserToken(req, res, next) {
  jwt.verify(res.locals.token, process.env.appSecreteKey, async (err, user) => {
    if (err) return res.status(403).json({ error: 403, message: err.message });
    const dbUser = await User.getUserByEmail(user.email);
    res.locals.user = dbUser.rows[0];
    next();
  });
}

export function createUserToken(req, res, next) {
  const { email, password } = req.body;
  res.locals.token = jwt.sign({ email, password }, process.env.appSecreteKey, { expiresIn: '1hr' });
  next();
}

