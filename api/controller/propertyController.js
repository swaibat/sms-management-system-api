import { Property } from '../models/property';
import { propertys } from '../data/data';
import { users } from '../data/data';
import { Admin,User } from '../models/users';

export class PropertyController {
  postProperty(req, res) {
      const id = propertys.length + 1;
      const owner = users.find(user => user.email === res.locals.email)
      const property = new Property(id, parseInt(owner.id), req.body.price, req.body.address, req.body.city, req.body.state, req.body.type, req.body.imageUrl); 
      Admin.createProperty(property);
      return res.status(201).send({ status:201, property });
    };

  updateProperty(req, res) {
    // eslint-disable-next-line no-shadow
    const { property } = res.locals;
    const {address,city} = req.body
    const advert = Admin.updateProperty(property,address,city);
    res.status(200).send({status:200,advert});
  }

  markSold(req, res) {
      const { property } = res.locals;
      const advert =  Admin.markPropertySold(property);
      res.status(200).send({status:200,property:advert});
  }

  deleteProperty(req, res) {
    const { property } = res.locals
    Admin.deleteProperty(property);
    return res.status(200).send({ status:200, message: 'property deleted successfully' });
  }

  // eslint-disable-next-line consistent-return
  getAllProperty(req, res) {
    const property = User.allProperty();
    res.status(200).send({ status: 200, property });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}
