/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Product } from '../models/products';
import { products } from '../data/data';

export class productController {
  postProduct(req, res) {
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const adObj = new Product(price, address, city, state, type, imageUrl);
    adObj.createProduct(adObj);
    res.status(201).send({ status: 'success', products });
  }
}
