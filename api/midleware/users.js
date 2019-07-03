/* eslint-disable linebreak-style */
import { User } from '../models/users';

// eslint-disable-next-line consistent-return
export function checkUserExists(req, res, next){
  const user = User.getUserByEmail(req.body.email);
  user.then(e => {
    if (e.rows[0]) return res.status(409).send({error:409, message: 'user already exists'});
    next();
  });
};

export function agentCheck(req, res, next) {
    if (res.locals.user.isadmin === false) return res.status(403).send({error:403, message:'Only agent can access this service'})
    next();
}