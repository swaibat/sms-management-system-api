/* eslint-disable linebreak-style */
import { Property } from '../models/property';
import { User } from '../models/users';


// eslint-disable-next-line consistent-return
export async function queryType(req, res, next) {
  const property = await User.queryTypeOfProperty(req.query.type);
  if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, property: property.rows });
  next();
}

// eslint-disable-next-line consistent-return
export async function getPropertyById(req, res, next) {
  const property = await Property.getPropertyById(req.params.Id);
  res.locals.property = property.rows[0];
  if (!res.locals.property) {
    return res.status(404).send({ error: 404, message: 'property with given id not Found' });
  }
  next();
}

// find if atall that agent owners the advert he wants to do operations on
export async function AgentAndOwner(req, res, next) {
  const owner = await Property.getPropertyByOwner(res.locals.user.id);
  if (!owner.rows[0]) return res.status(403).send({ error: 403, message: 'Your do not own this property' });
  next();
}
