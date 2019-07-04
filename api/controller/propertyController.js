import { Property } from '../models/property';
import { Admin, User } from '../models/users';

export class PropertyController {
  postProperty(req, res) {
    const {price, address, city, state, type, imageUrl,} = req.body;
    const { id } = res.locals.user;
    const adObj = new Property(id, price, address, city, state, type, imageUrl);
    const property = adObj.addProperty(adObj);
    property.then(e =>{
      res.status(201).send({status: 201,property: e.rows[0],});
    });
  }

  updateProperty(req, res) {
    const { address, city, state } = req.body;
    const property = Admin.updateProperty(address, state, city, req.params.Id);
    property.then(e =>{
      res.status(200).send({status: 200,property: e.rows[0]});
    });
  }
  
  markSold(req, res) {
    const property = Admin.markPropertySold(req.params.Id);
    property.then(a =>{
      res.status(200).send({status: 200,property: a.rows[0]});
    });
  }

  deleteProperty(req, res) {
    Admin.delProperty(req.params.Id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }
  
  // eslint-disable-next-line consistent-return
  getAllProperty(req, res) {
    const property = User.allProperty();
    property.then(e =>{
      res.status(200).send({ status: 200, property: e.rows });
    });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}
