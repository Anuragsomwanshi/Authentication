import jwt from "jsonwebtoken";

const userAuth = async(req,res,next)=>{

    const{token} = req.cookies;

    if(!token){
        return res.json({success:false,message:"Not authorized login again"})
    }

    try {

        const decode = jwt.verify(token,process.env.JWT_SECRET);


        if(decode.id){
            req.body.userId = decode.id;
        }
        else{
          return res.json({success:false,message:"Not authorized login again"})
        }

        next();
        
    } catch (error) {

        return res.json({success:false,message:`this error ${error.message}`})
        
    }
}

export default userAuth;