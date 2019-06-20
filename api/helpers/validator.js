/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';


// validate input on signup
// eslint-disable-next-line consistent-return
export function inputValidator(req, res, next) {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    phoneNumber: Joi.number().min(7).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
  });
  const result = Joi.validate(req.body, schema);
  // input validation
  if (result.error) {
    return res.status(400).send({ message: result.error.details[0].message });
  }
  next();
}

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
