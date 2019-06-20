// import { products } from '../data/data';
import Joi from '@hapi/joi';

// validate input on sighup
export function adsInputValidate(req, res, next) {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
    state: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    address: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    image_url: Joi.string().required()
});
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }
  next();
}