/* eslint-disable linebreak-style */
import express from 'express';
import { productController } from '../controller/productsController';
import { adsInputValidate } from '../midleware/products';


const router = express.Router();
// eslint-disable-next-line new-cap
const product = new productController();
// create product
router.post('/', adsInputValidate, product.postProduct);

export default router;
