/* eslint-disable linebreak-style */
import { User } from '../models/users';

// eslint-disable-next-line consistent-return
export async function checkUserExists(req, res, next){
  const user = await User.getUserByEmail(req.body.email);
  if (user.rows[0]) return res.status(409).send({error:409, message: 'user already exists'});
  next();
};

export function agentCheck(req, res, next) {
  const agent = User.getUserByEmail(res.locals.user.email);
  if (agent.isAdmin === false) return res.status(403).send({error:403, message:'Only agent can access this service'})
  res.locals.email = agent.email
  next();
}