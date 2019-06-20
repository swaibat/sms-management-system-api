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

// create property
router.put('/:Id', property.updateProperty);

// create property
router.patch('/:Id/sold', property.markSold);

export default router;
