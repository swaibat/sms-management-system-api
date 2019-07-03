import { Property } from '../models/property';
import { Admin, User } from '../models/users';

export class PropertyController {
  async postProperty(req, res) {
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const { id } = res.locals.user;
    const adObj = new Property(id, price, address, city, state, type, imageUrl);
    const property = await adObj.addProperty(adObj);
    res.status(201).send({
      status: 201,
      property: property.rows[0],
    });
  }

  async updateProperty(req, res) {
    const { address, city, state } = req.body;
    const property = await Property.updateProperty(address, state, city, req.params.Id);
    res.status(201).send({
      status: 201,
      property: property.rows[0],
    });
  }

  async markSold(req, res) {
    const property = await Admin.markPropertySold(req.params.Id);
    res.status(201).send({
      status: 201,
      property: property.rows[0],
    });
  }

  async deleteProperty(req, res) {
    Admin.delProperty(req.params.Id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }
  
  // eslint-disable-next-line consistent-return
  async getAllProperty(req, res) {
    const property = await User.allProperty();
    res.status(200).send({ status: 200, property: property.rows });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}
