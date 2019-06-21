/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { propertys } from '../data/data';


// eslint-disable-next-line consistent-return
export function queryType(req, res, next) {
  const adType = propertys.filter(ad => ad.type === req.query.type);
  if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, adType });
  next();
}
