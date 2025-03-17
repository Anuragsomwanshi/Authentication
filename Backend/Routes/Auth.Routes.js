import express from 'express'
import { isAutheticated, login, logout, register, resetpassword, sendResetotp, sendverifyotp, verifyEmail } from '../Controllers/Auth.controller.js';
import userAuth from '../Middlewares/userAuth.middleware.js';

const Router = express.Router();

Router.post('/register',register)
Router.post('/login',login)
Router.post('/logout',logout)
Router.post('/sendverifyotp',userAuth,sendverifyotp);
Router.post('/isverify',userAuth,verifyEmail);
Router.get('/isAuth',userAuth,isAutheticated);
Router.post('/sendresetotp',sendResetotp);
Router.post('/resetpassword',resetpassword);


export default Router;