/* eslint-disable linebreak-style */
import express from 'express';
import { PropertyController } from '../controller/propertyController';
import { adsInputValidate } from '../helpers/validator';
import { queryType, getPropertyById, AgentAndOwner,verifyPropertyOwer } from '../midleware/property';
import { verifyToken } from '../helpers/protector';
import { ensureToken,agentCheck } from '../midleware/users';


const router = express.Router();
router.use(verifyToken,ensureToken)
// eslint-disable-next-line new-cap
const property = new PropertyController();

// create property
router.post('/', agentCheck, adsInputValidate, property.postProperty);

/** 
 * @verifyToken check if users provides valid token
 * @adminCheck  check if users is Agent
 * @getPropertyById get requested propety
 * @AgentAndOwner agent should perfom operations on his own property
 * @perfomOperation if all conditions okay do the operation
*/

// update his own property
router.put('/:Id',agentCheck, getPropertyById, AgentAndOwner, property.updateProperty);

// mark property as sold (his own)
router.patch('/:Id/sold',agentCheck, getPropertyById, AgentAndOwner, property.markSold);

// delete property(his own)
router.delete('/:Id',agentCheck, getPropertyById, AgentAndOwner, property.deleteProperty);

/** 
 * @verifyToken check if users provides valid token
 * @perfomOperation if all conditions okay do the operation
*/

// view all propertys (only available)
router.get('/', property.getAllProperty);

// get specific property(only available)
router.get('/:Id',queryType, getPropertyById, property.singleProperty);

export default router;
