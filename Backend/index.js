import express from 'express'
import cors from "cors"
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/Database.js'
import AuthRoutes from './Routes/Auth.Routes.js'
import userRouter from './Routes/User.Routes.js';
const app = express();

const port = process.env.PORT|| 4000

const origin = ['http://localhost:5173.versal.app']
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { 
        origin:origin, 
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
