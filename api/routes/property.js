/* eslint-disable linebreak-style */
import express from 'express';
// eslint-disable-next-line import/named
import { PropertyController } from '../controller/propertyController';
// eslint-disable-next-line import/named
import { adsInputValidate } from '../helpers/validator';


const router = express.Router();
// eslint-disable-next-line new-cap
const property = new PropertyController();

// create property
router.post('/', adsInputValidate, property.postProperty);

// update property
router.put('/:Id', property.updateProperty);

// mark property as sold
router.patch('/:Id/sold', property.markSold);

// delete property
router.delete('/:Id', property.deleteProperty);

// view all propertys
router.get('/', property.getAllProperty);

export default router;
