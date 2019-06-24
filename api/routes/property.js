/* eslint-disable linebreak-style */
import express from 'express';
import { PropertyController } from '../controller/propertyController';
import { adsInputValidate } from '../helpers/validator';
import { queryType, getById, AgentAndOwner } from '../midleware/property';
import { verifyToken } from '../helpers/protector';
import { ensureToken,agentCheck } from '../midleware/users';


const router = express.Router();
// router.use(verifyToken,ensureToken)
// eslint-disable-next-line new-cap
const property = new PropertyController();

// create property
router.post('/',verifyToken,ensureToken, agentCheck, adsInputValidate, property.postProperty);

// update his own property
router.put('/:Id', agentCheck, getById, AgentAndOwner, property.updateProperty);

// mark property as sold (his own)
router.patch('/:Id/sold',agentCheck, getById, AgentAndOwner, property.markSold);

// delete property(his own)
router.delete('/:Id', agentCheck, getById, AgentAndOwner, property.deleteProperty);

// view all propertys (only available)
router.get('/',property.getAllProperty);

// get specific property(only available)
router.get('/:Id', getById, queryType, property.getPropertyById);

export default router;
