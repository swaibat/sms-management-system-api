/* eslint-disable linebreak-style */
import { propertys } from '../data/data';
import { users } from '../data/data';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line consistent-return
export function queryType(req, res, next) {
  const adType = propertys.filter(ad => ad.type === req.query.type);
  if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, adType });
  next();
}

// eslint-disable-next-line consistent-return
export function getById(req, res, next) {
  res.locals.property = propertys.find(property => property.id === parseFloat(req.params.Id));
  if (!res.locals.property) {
    return res.status(404).send({ error: 404, message: 'property with given id not Found' });
  }
  next();
}

export function verifyPropertyOwer(req, res, next) {
  jwt.verify(req.token, process.env.appSecreteKey, (err, owner) => {
    if (err) return res.status(404).json({ message: err.message });
    res.send(owner)
  });
}

// find if atall that agent owners the advert he wants to do operations on
export function AgentAndOwner(req, res, next) {
  // get decoded token id
  jwt.verify(req.token, process.env.appSecreteKey, (err, data) => {
    if (err) return res.status(404).json({ message: err.message });
        const owner = users.find(user => user.email == data.email );
    if (!owner)res.send({error:403, message:'your not the owner of this property'})
        const property = propertys.find(property => property.owner === parseInt(owner.id));
    if (!property) return res.status(404).send({ error: 404, message: 'your not allowed to do any operation' });
     next();
})
}