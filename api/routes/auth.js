import express from 'express';
import UserController from '../controller/usersController';
import Auth from '../midleware/auth';

const router = express.Router();

const user = new UserController();

// signup route
router.post('/auth/signup', Auth.inputValidator, Auth.checkUserExists, Auth.createUserToken, user.signUp);

// signin route
router.post('/auth/signin', Auth.createUserToken, Auth.checkNoUser, user.signIn);

export default router;
