/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
// validate input on sighup
// eslint-disable-next-line import/prefer-default-export
export function adsInputValidate(req, res, next) {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
    state: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    address: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    imageUrl: Joi.string().required(),
  });
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }
  next();
}
