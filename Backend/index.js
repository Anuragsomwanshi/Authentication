import express from 'express'
import cors from "cors"
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import AuthRoutes from './Routes/Auth.Routes.js'
import userRouter from './Routes/User.Routes.js';
const app = express();

const port = process.env.PORT|| 4000

// database connection


const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Database connected "));
}




const allowdorigins = ['https://authentication-frontend-olive.vercel.app',
  

]
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { 
        origin: allowdorigins , 
        credentials:true,
        method:["POST","GET"]
    }));
app.use( '/api/auth',AuthRoutes);
app.use('/api/user',userRouter);


app.get('/',(req,res)=>{
    res.send("ApI working");
})
app.listen(port,()=>{
    console.log("server started at port: " ,port);
    connectDB();
});
