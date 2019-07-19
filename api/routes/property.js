import express from 'express';
import PropertyController from '../controller/propertyController';
import Ads from '../midleware/property';
import Auth from '../midleware/auth';

const router = express.Router();
router.use(Auth.verifyToken, Auth.ensureUserToken);

const property = new PropertyController();

// create property
router.post('/', Ads.adsValidator, Auth.agentCheck,Ads.checkIfAdExist, property.postProperty);

// update his own property
router.patch('/:Id', Ads.getPropertyById, Ads.AgentAndOwner, property.updateProperty);

// mark property as sold (his own)
router.patch('/:Id/sold', Auth.agentCheck, Ads.getPropertyById, Ads.AgentAndOwner, property.markSold);

// delete property(his own)
router.delete('/:Id', Auth.agentCheck, Ads.getPropertyById, Ads.AgentAndOwner, property.deleteProperty);

// view all propertys (only available)
router.get('/', Ads.queryType, property.getAllProperty);

// get specific property(only available)
router.get('/:Id', Ads.getPropertyById, property.singleProperty);

export default router;
