import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../Context/StoreContex";
import {  useNavigate } from "react-router-dom";

const verify = () => {

  axios.defaults.withCredentials = true; // for cookies

  const [data,setData] = useState({otp:""})

  const navigate = useNavigate();

  const {backendurl,getData,setLogin} = useContext(StoreContext);

  const handleOnchange = (e) => {
  const  value = e.target.value;
    const name  = e.target.name;

    setData((data)=>({...data,[name]:value}))

  }

  const handleOnsubmit = async(e)=>{
    try {

      e.preventDefault();
      

      const response = await axios.post(backendurl+'/api/auth/isverify',data);
      console.log(response.data);

      if(response.data.success){

        setLogin(true);
        getData();

        navigate('/');

        toast.success(response.data.message);
      }
      


    } catch (error) {

      toast.error(error.message);
      
    }
  }
  
  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleOnsubmit}>
        <div className="fields">
          <p>Enter 6 digit OTP that was send in your Email</p>
          <input type="text" placeholder="Enter OTP" name="otp" value={data.otp} onChange={handleOnchange}  />
          <button type="submit" className="btn btnverify"> verify Email</button>
        </div>
      </form>

     
    </div>
  );
};

export default verify;
