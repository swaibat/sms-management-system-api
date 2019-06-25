/* eslint-disable linebreak-style */

import express from 'express';
import { UserController } from '../controller/usersController';
import { checkUserExists } from '../midleware/users';
// eslint-disable-next-line import/named
import { inputValidator } from '../helpers/validator';

const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup', inputValidator, checkUserExists, user.signUp);

// signin route

router.post('/auth/signin', user.signIn);

export default router;
