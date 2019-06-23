import { Property } from '../models/property';
import { propertys } from '../data/data';
import { users } from '../data/data';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class PropertyController {
  postProperty(req, res) {
    jwt.verify(req.token, process.env.appSecreteKey, (err, data) => {
      if (err) return res.status(404).json({ message: err.message });
      const { price, address, city, state, type, imageUrl} = req.body;
      const id = propertys.length + 1;
      const owner = users.find(user => user.email === data.email)
      const property = new Property(id, parseInt(owner.id), price, address, city, state, type, imageUrl); 
      propertys.push(property);
      return res.status(201).send({ status: 'success', property });
    });
    
  }

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
    const adAvailable = propertys.filter(property => property.status === 'available');
    if (!adAvailable) return res.status(404).send({error:404, message:'No adverts found try to check later'})
    res.status(200).send({ status: 'success', adAvailable });
  }

  getPropertyById(req, res) {
    // eslint-disable-next-line no-shadow
    const { property } = res.locals;
    if (property.status === 'sold') return res.status(404).send({error:404, message:'the property has either been sold or unavailable'})
    res.status(200).send({ status: 'success', property });
  }
}
