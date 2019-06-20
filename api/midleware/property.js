/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

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

export function validateEditAd(req, res, next) {
  const schema = Joi.object().keys({
    price: Joi.number(),
    state: Joi.string().min(2),
    city: Joi.string().min(2),
    address: Joi.string().min(3),
    type: Joi.string().min(3),
    imageUrl: Joi.string(),
  });
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }
  next();
}
