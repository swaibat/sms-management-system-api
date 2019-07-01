/* eslint-disable linebreak-style */

import express from 'express';
import { UserController } from '../controller/usersController';
import { checkUserExists } from '../midleware/users';
import { createUserToken } from '../helpers/protector';
import { inputValidator } from '../helpers/signupValidator';

const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup', inputValidator, checkUserExists,createUserToken, user.signUp);

// signin route

router.post('/auth/signin',createUserToken, user.signIn);

export default router;
