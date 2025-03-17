import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContex";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();




  const [data,setData] = useState ({
    name:"",
    email:"",
    password:"",
  })

  const handleOnchange =(event)=>{

    const name = event.target.name;
    const value = event.target.value;

    setData((data)=>({...data,[name]:value}))

    

  }
  
  
  
  const { backendurl, setLogin,getData } =
  useContext(StoreContext);
  const [state, setState] = useState("sign up");
  
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true; // for sending cookies
      
      
      if (state === "sign up") {
        const response = await axios.post(backendurl+"/api/auth/register",data);
        if (response.data.success) {
          setLogin(true);
          getData();
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        
        
        const response = await axios.post(backendurl+"/api/auth/login",data);

       
        
        
        if (response.data.success) {
          setLogin(true);
          getData()
          navigate("/");
          toast.success(response.data.message);
        
        } else {
          toast.error(response.message);
        }
        
      }
    } catch (error) {
      console.log(`error in login ${error.message}`)

    }
  };

  return (
    <div>
      <img
        className="favimg"
        onClick={() => navigate("/")}
        src={assets.favicon}
        alt=""
      />
      <p>Click Me</p>

      <div className="form-container">
        <h2>{state === "sign up" ? "create account" : "Login your account"}</h2>

        <form onSubmit={handleOnSubmit}>
          <div className="fields">
            {state === "sign up" ? (
              <input
                name="name"
                onChange={handleOnchange}
                value={data.name}
                type="text"
                placeholder="Full Name"
                required
              />
            ) : (
              ""
            )}

            <input
              name="email"
              onChange={handleOnchange}
              value={data.email}
              type="email"
              placeholder="Email"
              required
            />
            <input
              name="password"
              onChange={handleOnchange}
              value={data.password}
              type="password"
              placeholder="password"
              required
            />
          </div>
          <p className="forgot" onClick={() => navigate("/reset")}>
            Forgot password
          </p>

          <button type="submit" className="btn">
            {state}
          </button>
          <p>
            {" "}
            {state === "sign up"
              ? `already have account`
              : "create account"}{" "}
            <span
              onClick={() =>
                state === "sign up" ? setState("login") : setState("sign up")
              }
              className="span"
            >
              click here
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
