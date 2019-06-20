/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Property } from '../models/property';
// eslint-disable-next-line import/named
import { propertys } from '../data/data';

export class PropertyController {
  postProperty(req, res) {
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const id = propertys.length + 1;
    const adObj = new Property(id, price, address, city, state, type, imageUrl);
    adObj.createProperty(adObj);
    res.status(201).send({ status: 'success', propertys });
  }

  // eslint-disable-next-line consistent-return
  updateProperty(req, res) {
    // eslint-disable-next-line no-shadow
    const property = propertys.find(property => property.id === parseFloat(req.params.Id));
    if (!property) {
      return res.status(404).send({ error: 404, message: 'property with given id not Found' });
    }
    property.price = req.body.price;
    property.address = req.body.address;
    property.city = req.body.city;
    property.state = req.body.state;
    property.type = req.body.type;
    property.imageUrl = req.body.imageUrl;
    res.send(property);
  }
}
