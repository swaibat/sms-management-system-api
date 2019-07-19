import Property from '../models/property';
import { Agent, User } from '../models/users';
import resHandle from '../helpers/response';

class PropertyController {
  postProperty(req, res) {
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const { id } = res.locals.user;
    const adObj = new Property(id, price, address, city, state, type, imageUrl);
    const property = adObj.addProperty(adObj);
    property.then(e => resHandle(201, 'Property created', e.rows[0], res));
  }

  updateProperty(req, res) {
    const { address, city, state } = req.body;
    const property = Agent.updateProperty(address, state, city, req.params.Id);
    property.then(e => resHandle(200, 'Property Updated', e.rows[0], res));
  }

  markSold(req, res) {
    const property = Agent.markPropertySold(req.params.Id);
    property.then(e => resHandle(200, 'property marked as sold', e.rows[0], res));
  }

  deleteProperty(req, res) {
    Agent.delProperty(req.params.Id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }

  getAllProperty(req, res) {
    const property = User.allProperty(res.locals.user.isagent);
    property.then(e => resHandle(200, 'all available property', e.rows, res));
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}

export default PropertyController;
