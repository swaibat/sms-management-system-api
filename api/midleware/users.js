/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { users } from '../data/data';

// eslint-disable-next-line consistent-return
export const checkUserExists = (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const user = users.find(user => user.email === req.body.email);
  if (user) {
    return res.status(409).send({ message: 'user already exists' });
  }
  next();
};
