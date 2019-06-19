
import express from 'express';
import { UserController } from '../controller/usercontroller';
import{ checkUserExists,inputValidator } from '../midleware/users';


const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup',inputValidator,checkUserExists,user.signUp);

// signin route
router.post('/auth/signin',user.signIn);

export default router;
