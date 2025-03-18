import express from 'express'
import cors from "cors"
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/Database.js'
import AuthRoutes from './Routes/Auth.Routes.js'
import userRouter from './Routes/User.Routes.js';
const app = express();

const port = process.env.PORT|| 4000


app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { 
        origin:'https://authentication-frontend-orcin.vercel.app', 
        credentials:true,
        method:["POST","GET","PUT","DELETE"]
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
