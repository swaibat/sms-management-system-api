/* eslint-disable linebreak-style */
import { Property } from '../models/property';
import { User } from '../models/users';


// eslint-disable-next-line consistent-return
export function queryType(req, res, next) {
  const property =  User.queryTypeOfProperty(req.query.type);
  property.then(e => {
    if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, property: e.rows });
    next();
  }); 
}

// eslint-disable-next-line consistent-return
export function getPropertyById(req, res, next) {
  const property =  Property.getPropertyById(req.params.Id);
  property.then(e => {
    res.locals.property = e.rows[0];
    if (!res.locals.property) return res.status(404).send({ error: 404, message: 'property with given id not Found' });
    next();
  });
}

// find if atall that agent owners the advert he wants to do operations on
export function AgentAndOwner(req, res, next) {
  const owner = Property.getPropertyByOwner(res.locals.user.id);
  owner.then(e => {
    if (!e.rows[0]) return res.status(403).send({ error: 403, message: 'Your do not own this property' });
    next();
  });
}
