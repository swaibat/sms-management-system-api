/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { users } from '../data/data';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line consistent-return
export const checkUserExists = (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const user = users.find(user => user.email === req.body.email);
  if (user) return res.status(409).send({ message: 'user already exists' });
  next();
};

// check if real users trying access
export function ensureToken(req, res, next) {
  jwt.verify(req.token, process.env.appSecreteKey, (err, user) => {
    if (err) return res.status(404).json({ message: err.message });
    next();
  });
}

export function agentCheck(req, res, next) {
  const user = users.find(user => user.isAdmin === true);
  if (!user) return res.status(403).send({error:403, message:'Only agent can access this service'})
  next();
}