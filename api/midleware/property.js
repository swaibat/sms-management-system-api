import Joi from '@hapi/joi';
import Property from '../models/property';
import { User }from '../models/users';
import resHandle from '../helpers/response';
import errHandle from '../helpers/errors';

class adsMiddleware {
  static adsValidator(req, res, next) {
    const schema = Joi.object().keys({
      price: Joi.required(),
      address: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().min(2).required(),
      type: Joi.string().regex(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/).required(),
      imageUrl: Joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/).required(),
    });
    const data = Joi.validate(req.body, schema);
    if (typeof req.body.price !== 'number' ) return errHandle(400, 'price should be a number not less than 1', res)
    if (data.error) {
      const resFomart = data.error.details[0].message.replace('"', '').split('"');
      const gotElem = resFomart[0];
      return errHandle(400, `${gotElem} field  is invalid `, res);
    }
    next();
  }

  static getPropertyById(req, res, next) {
    const { Id } = req.params;
    const validparam = Id.match(/^[0-9]+$/);
    if(!validparam) return res.status(400).send({ status: 400, error: 'provide a valid number in parameters' })
    const property = Property.getPropertyById(Id);
    property.then((e) => {
      res.locals.property = e.rows[0];
      if (!res.locals.property) return errHandle(404, 'property with given id not Found', res);
      next();
    });
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    const owner = Property.getPropertyByOwner(res.locals.user.id);
    owner.then((e) => {
      if (!e.rows[0]) return errHandle(403, 'Your do not own this property', res);
      next();
    });
  }

  static async checkIfAdExist(req, res, next) {
    const ownerId = res.locals.user.id;
    const { price, address, type } = req.body;
    const newProperty = await Property.checkIfPropertyExist(ownerId, price, address, type);
       if (newProperty.rows[0]) return errHandle(409, 'You can not post this propety again', res);
       next();
  }

  static queryType(req, res, next) {
    if (typeof req.query.type !== 'undefined') {
      const property = User.queryTypeOfProperty(req.query.type, res.locals.user.isagent);
      const matchType = req.query.type.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/);
      if (!matchType) return errHandle(400, 'We only have these types 1bedrooms, 3bedrooms, 5bedrooms, miniFlat ,others', res);
      return property.then(e => resHandle(200, 'operation successfull', e.rows, res));
    }
    next();
  }

}

export default adsMiddleware;
