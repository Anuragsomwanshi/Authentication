import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);


export const StoreContextProvider = (props)=>{

  axios.defaults.withCredentials = true // for cookies

    const backendurl = 'https://authentication-41va.onrender.com' || import.meta.env.BACKEND_URL
    const [Login,setLogin]= useState(false);
    const [userdata,setUserData] = useState(false);


    const getauth = async()=>{

      try {

        const {response} = await axios.get(backendurl+'/api/auth/isAuth') ;

        if(response.success){
          setLogin(true);
          getData();
        }
        
      } catch (error) {
        toast.error(error.messsage);
      }

    }



    const getData = async()=>{
      
      try {
        const {data} = await axios.get(backendurl+'/api/user/data');
        
        
        data.success? setUserData(data.userData) : toast.error(data.message);

       
      } catch (error) {
        toast.error(error.message);
      }


    }
    

    useEffect(()=>{

      getauth();
    },[])
     

    const value = {
        backendurl,
        Login,
        setLogin,
        userdata,
        setUserData,
        getData


    }

    

    return(
       <StoreContext.Provider value={value}>
        {props.children}
        </StoreContext.Provider>
    )


}