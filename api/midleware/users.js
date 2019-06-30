/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { User } from '../models/users';

// eslint-disable-next-line consistent-return
export const checkUserExists = (req, res, next) => {
  const user = User.getUserByEmail(req.body.email);
  if (user) return res.status(409).send({error:409, message: 'user already exists'});
  next();
};

export function agentCheck(req, res, next) {
  const agent = User.getUserByEmail(res.locals.user.email);
  if(!agent) return res.send({error:404, message:'Your details were not correctly stored signup again'})
  if (agent.isAdmin === false) return res.status(403).send({error:403, message:'Only agent can access this service'})
  res.locals.email = agent.email
  next();
}