import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();

export function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined') return res.status(403).send({ error: 403, message: 'provide a token to get our services' });
  const bearer = bearerHeader.split(' ');
  // get token from array
  const bearerToken = bearer[1];
  res.locals.token = bearerToken;
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

