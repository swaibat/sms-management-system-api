import Joi from '@hapi/joi';

export function inputValidator(req, res, next) {
  const authSchema = Joi.object().keys({
    firstName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    lastName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
    address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    phoneNumber: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    isAdmin: Joi.boolean(),
  });
  const data = Joi.validate(req.body, authSchema);
  if (data.error) return res.status(400).send({ status: 400, message: `${data.error.details[0].message}` });
  next();
}
