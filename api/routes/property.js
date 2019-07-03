/* eslint-disable linebreak-style */
import express from 'express';
import { PropertyController } from '../controller/propertyController';
// import { adsInputValidate } from '../helpers/validator';
import { queryType, getPropertyById, AgentAndOwner } from '../midleware/property';
import { verifyToken, ensureUserToken } from '../helpers/protector';
import { adsValidator } from '../helpers/adsValidator';
import { agentCheck } from '../midleware/users';


const router = express.Router();
router.use(verifyToken, ensureUserToken);
// eslint-disable-next-line new-cap
const property = new PropertyController();

// create property
router.post('/', adsValidator, agentCheck, property.postProperty);

// update his own property
router.patch('/:Id', getPropertyById, AgentAndOwner, property.updateProperty);

// mark property as sold (his own)
router.patch('/:Id/sold', agentCheck, getPropertyById, AgentAndOwner, property.markSold);

// delete property(his own)
router.delete('/:Id', agentCheck, getPropertyById, AgentAndOwner, property.deleteProperty);

// view all propertys (only available)
router.get('/', queryType, property.getAllProperty);

// get specific property(only available)
router.get('/:Id', getPropertyById, property.singleProperty);

export default router;
