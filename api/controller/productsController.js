import { Product } from '../models/products';
import { products } from '../data/data';

export class productController {

  postProduct(req,res){
        const {price,address,city,state,type,image_url} = req.body;
        const adObj = new Product(price,address,city,state,type,image_url);
        adObj.createProduct(adObj);
        res.status(201).send({status:'success',products});
      }
}