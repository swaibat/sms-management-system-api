import { Property } from '../models/property';
import { propertys } from '../data/data';
import { users } from '../data/data';

export class PropertyController {
  postProperty(req, res) {
      const { price, address, city, state, type, imageUrl} = req.body;
      const id = propertys.length + 1;
      const owner = users.find(user => user.email === res.locals.email)
      const property = new Property(id, parseInt(owner.id), price, address, city, state, type, imageUrl); 
      propertys.push(property);
      return res.status(201).send({ status: 'success', property });
    };

  updateProperty(req, res) {
    // eslint-disable-next-line no-shadow
    const { property } = res.locals;
    property.price = req.body.price;
    property.address = req.body.address;
    property.city = req.body.city;
    property.state = req.body.state;
    property.type = req.body.type;
    property.imageUrl = req.body.imageUrl;
    res.send(property);
  }

  markSold(req, res) {
      res.locals.property.status = 'sold';
      res.send(res.locals.property);
  }

  deleteProperty(req, res) {
    const findIndex = propertys.indexOf(res.locals.property);
    propertys.splice(findIndex, 1);
    res.status(200).send({ status: 'success', message: 'property deleted successfully' });
  }

  // eslint-disable-next-line consistent-return
  getAllProperty(req, res) {
    const property = propertys.filter(property => property.status === 'available');
    // if (!property ) return res.status(404).send({error:404, message:'No adverts found try to check later'})
    res.status(200).send({ status: 'success', property });
  }

  singleProperty(req, res) {
    // eslint-disable-next-line no-shadow
    const { property } = res.locals;
    res.status(200).send({ status: 'success', property });
  }
}
