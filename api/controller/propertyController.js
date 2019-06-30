import { Property } from '../models/property';
import { propertys } from '../data/data';
import { users } from '../data/data';
import { User,Admin } from '../models/users';

export class PropertyController {
  postProperty(req, res) {
      const { price, address, city, state, type, imageUrl} = req.body;
      const id = propertys.length + 1;
      const owner = users.find(user => user.email === res.locals.email)
      const property = new Property(id, parseInt(owner.id), price, address, city, state, type, imageUrl); 
      property.createProperty(property);
      return res.status(201).send({ status: 'success', property });
    };

  updateProperty(req, res) {
    // eslint-disable-next-line no-shadow
    const { property } = res.locals;
    const {address,city} = req.body
    const advert = Property.updateProperty(property,address,city);
    res.status(200).send({status:200,property:advert});
  }

  markSold(req, res) {
      const { property } = res.locals;
      const advert = Property.markPropertySold(property);
      res.status(200).send({status:200,property:advert});
  }

  deleteProperty(req, res) {
    const { property } = res.locals
    const advert = Property.deleteProperty(property);
    if (!advert) return res.status(200).send({ status: 'success', message: 'property deleted successfully' });
  }

  // eslint-disable-next-line consistent-return
  getAllProperty(req, res) {
    const property = User.allProperty();
    res.status(200).send({ status: 200, property });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 'success', property });
  }
}
