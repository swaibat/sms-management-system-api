import Joi from '@hapi/joi';

export function inputValidator(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      lastName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      phoneNumber: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      isAdmin: Joi.boolean(),
  });
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      const errMsg = result.error.details[0].message
      return res.status(400).send({status:400, message: `${errMsg}` });
    }
    next();
}