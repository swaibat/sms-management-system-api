import jwt from 'jsonwebtoken';
import {users} from '../data/data'
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
  jwt.verify(res.locals.token, process.env.appSecreteKey, (err, data) => {
    if (err) return res.status(403).json({ error: 403, message: err.message });    
    const user = users.find(u => u.email === data.email);
    res.locals.user = user;
    next();
  });
}
