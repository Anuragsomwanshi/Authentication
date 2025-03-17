import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContex";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Reset = () => {
  const { backendurl } = useContext(StoreContext);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const [emailsend, setEmailsend] = useState("");
  const [otpsend, setOtpsend] = useState(false);

  const handleEmailsubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendurl + "/api/auth/sendresetotp", {
        email,
      });
      console.log(data.success);

      if (data.success) {
        toast.success(data.message);
        setEmailsend(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlesubmitpasswordotp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendurl + "/api/auth/resetpassword",
        { email, otp, newpassword }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        setOtpsend(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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

      

      {!emailsend && (
        <div className="form-container">
          {" "}
          <form onSubmit={handleEmailsubmit}>
            <h2>Reset password</h2>
            <div className="fields">
              <p>Enter your Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="enter email"
              />
              <button type="submit" className="btn btnverify">
                submit
              </button>
            </div>
          </form>
        </div>
      )}

      {!otpsend && emailsend && (
        <div className="form-container">
          <h2>Reset password</h2>
          <form onSubmit={handlesubmitpasswordotp}>
            <div className="fields">
              <p>Enter 6 digit OTP and New password</p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              
              

                <input
                  type="password"
                  placeholder="Enter Your New Password"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              

              <button type="submit" className="btn btnverify">
                submit
              </button>
            </div>
          </form>
        </div>
      )}

      
    </div>
  );
};

export default Reset;
