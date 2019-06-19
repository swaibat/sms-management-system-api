import { User } from '../models/users';
import { users } from '../data/users';
import bcrypt from 'bcrypt';

export class UserController {

    signUp(req,res){
        const {firstName,lastName,email,address,phoneNumber,password} = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const userObj = new User(firstName,lastName,email,address,phoneNumber,hashPassword);
        userObj.createUser(userObj);
        res.status(201).send({status:'success',users});
      }
}