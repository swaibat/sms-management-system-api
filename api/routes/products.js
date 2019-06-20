import express from 'express';
import { productController } from '../controller/productsController';
import{ adsInputValidate } from '../midleware/products';


const router = express.Router();

const product = new productController();

// create product
router.post('/',adsInputValidate,product.postProduct);

export default router;