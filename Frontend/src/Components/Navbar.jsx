import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContex'
import axios from 'axios'
import { toast } from 'react-toastify'
const Navbar = () => {
    const navigate = useNavigate()
    const {backendurl,userdata,Login,setLogin,setUserData} = useContext(StoreContext);
    

    const logout = async()=>{

      try {
        axios.defaults.withCredentials = true // for cookies
        const response =  await axios.post(backendurl+'/api/auth/logout');

        if(response.data.success){


          setLogin(false);
          setUserData(false);
          

           
        navigate('/');
        toast.success(response.data.message);
        }
        
       
      } catch (error){
        toast.error(error.message);
      }
    }

    const sendverifyotp = async()=>{

      try {
        axios.defaults.withCredentials = true; // for cookies
        const response = await axios.post(backendurl+'/api/auth/sendverifyotp');

        if(response.data.success){

          navigate('/verify');
          toast.success(response.data.message);
        }
        else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error.message);
      }
    }
  return (
    <div className='nav'>
        Authetication

       {Login?(userdata.isverify? ' ' : <button  onClick={()=>sendverifyotp()} className='btn verify'>verify Email</button>):   " " }   
       

    <button  onClick={()=>  [Login? logout() :navigate('/login') ] } className=' btn btn-login'> {Login ?'LOG-OUT':'LOG-IN'}</button>
    
    </div>
  )
}

export default Navbar