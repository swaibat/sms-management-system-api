import { users } from '../data/users';
import Joi from '@hapi/joi';

export const  checkUserExists = (req, res, next) =>{
    const user = users.find(user => user.email == req.body.email);
    if (user) {
      return res.status(409).send({ message: 'user already exists' }); 
    }
    next();
};

// validate input on sighup
export function inputValidator(req, res, next) {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    phoneNumber: Joi.number().min(7).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 })
});
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  next();
}