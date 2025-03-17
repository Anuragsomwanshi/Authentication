import express from 'express'
import userAuth from '../Middlewares/userAuth.middleware.js';
import { getUserData } from '../Controllers/User.controller.js';

const userRouter = express.Router();


userRouter.get('/data',userAuth,getUserData);


export default userRouter;