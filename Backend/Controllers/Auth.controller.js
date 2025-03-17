import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/UserModel.js";
import transporter from '../config/Nodemailer.js'



export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "please fill all fields " });
  }

  try {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 8);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NDOE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // Sending  email

    const mail ={
      from:process.env.SENDER_EMAIL,
      to: email,
      subject:'welcome to Authentication page',
      text:   `welcome to Authentication website your account has been created with email id: ${email}` 
  }

  await transporter.sendMail(mail);

    return res.json({ success: true, message: "register user successfully" });
  }
  
  catch (error) {
    res.json({ success: false, message: ` register function error : ${error.message}`});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: " user does not exist " });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NDOE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    

    return res.json({ success: true, message: "Login user successfully"});
  } 
  
  catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NDOE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "logout user successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendverifyotp = async(req,res)=>{

  try {

    const{userId} = req.body;
    const user = await userModel.findById(userId);

    if(user.isverify){

      return res.json({success:false,message:"account already verified"});
    }

   const otp =  String(Math.floor(100000+Math.random()*900000));

   user.verifyotp = otp;
   user.verifyotpExpireAt = Date.now()+24*60*60*1000

   await user.save();

   const mail = {
    from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:'Account verification OTP',
      text:   `your OTP is ${otp} . verify your account using this OTP` 
   }

   await transporter.sendMail(mail);
   res.json({success:true,message:"verification otp send on email"})
    
  } catch (error) {

    res.json({success:false,message: `this error ${error.message}`})
    
  }
}

export const verifyEmail = async(req,res)=>{

  const{userId,otp} = req.body;


  if(!userId  || !otp){
    return res.json({success:false,message:"missing details"});

  }

  try {

    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success:false,message:"user not found"});
    }

    if(user.verifyotp==='' || user.verifyotp!==otp){

      return res.json({success:false,message:"Invalid OTP"})
    }

    if(user.verifyotpExpireAt<Date.now()){
      return res.json({success:false,message:"OTP expired"})
    }

    user.isverify = true;
    user.verifyotp = '';
    user.verifyotpExpireAt=0;

    await user.save();

    return res.json({success:true,message:"Email verified successfully "});
    
  } catch (error) {

    return res.json({success:false,message:error.message});
    
  }
}

export const isAutheticated = async (req,res)=>{


  try {


    return res.json({success:true,message:" user Autheticted"});
    
  } catch (error) {

    res.json({success:false,message:error.message})
    
  }
}

export const sendResetotp = async(req,res)=>{

  const{email} = req.body;

  if(!email){

    return res.json({success:false,message:"Email is required "});
  }

  try {

    const user = await userModel.findOne({email});

    if(!user){

      return res.json({success:false,message:" user not found "});
    }



    
   const otp =  String(Math.floor(100000+Math.random()*900000));

   user.resetotp = otp;
   user.resetotpExpireAt = Date.now()+24*60*60*1000

   await user.save();

   const mail = {
    from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:' Password Reset OTP',
      text:   `your OTP for reseting your password is  ${otp} . use this OTP to proceed with resetting your password` 
   }

   await transporter.sendMail(mail);
   res.json({success:true,message:" OTP send to your  email"})



    
  } catch (error) {
    return res.json({success:false,message:error.message});
  }
}

export const resetpassword = async(req,res)=>{

  const{email,otp,newpassword} = req.body;

  if(!email|| !otp || !newpassword){

    if(!newpassword){

      return res.json({success:false,message:" newpassword is required"});


    }


    if(!email){

      return res.json({success:false,message:" email  is required"});


    }


    if(!otp){

      return res.json({success:false,message:" otp is required"});


    }

    return res.json({success:false,message:"email otp and newpassword is required"});
  }

  try {

    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success:false,message: "user not found"});
    }

    if(user.resetotp === "" || user.resetotp !== otp){

      return res.json({success:false,message:"Invalid otp"});
    }

    if(user.resetotpExpireAt <Date.now()){
      return res.json({success:false,message:"OTP expired"});
    }

    const hashedpassword = await bcrypt.hash(newpassword,10);

    user.password = hashedpassword;
    user.resetotp = "";
    user.resetotpExpireAt = 0;

    await user.save();

    return res.json({success:true,message:"password has been reset successfully "});
    
  } catch (error) {

    return res.json({success:false,message:`thsi is eror: ${error.message}`});
    
  }
}