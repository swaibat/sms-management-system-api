import { User } from '../models/users';
import { users } from '../data/data';
import bcrypt from 'bcrypt';

export class UserController {

    signUp(req,res){
        const {firstName,lastName,email,address,phoneNumber,password} = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const userObj = new User(firstName,lastName,email,address,phoneNumber,hashPassword);
        userObj.createUser(userObj);
        res.status(201).send({status:'success',users});
      }

      signIn(req, res) {
          const {email,password} = req.body
          const user = users.find(user => user.email == email);
          if (user){
            const passCompare = bcrypt.compareSync(password, user.password);   
            if(passCompare){
              res.status(200).send({
                status: "200",
                message: "You have signed in successfully",
              })
            }
          }
          res.status(401).send({status: "401", message: "wrong username or password"})        
      }
}