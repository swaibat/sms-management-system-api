import Joi from '@hapi/joi';

export function adsValidator(req, res, next) {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
    address: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    city: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
    state: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    type: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    imageUrl: Joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/).required(),
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    const errMsg = result.error.details[0].message;
    return res.status(400).send({ status: 400, message: `${errMsg}` });
  }
  next();
}