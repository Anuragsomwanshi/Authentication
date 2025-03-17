import React, { useContext } from 'react'
import './Head.css'
import {assets} from '../assets/assets'
import { StoreContext } from '../Context/StoreContex'
import { Navigate, useNavigate } from 'react-router-dom'

const Head = () => {
const navigate = useNavigate();
  const {userdata,Login} = useContext(StoreContext);

  
  
  return (
    <div className='header'>

      {Login?<img className='homeimg' src={assets.homeimg} alt="" /> : <img src={assets.favicon} alt="" /> }

        


        <h3>Hey {userdata ? userdata.name:'Everyone'}</h3>
        <h1>welcome to our webapp</h1>
        <button onClick={()=>navigate('/login')} className='btn btn-forward'>Move{"->"}</button>
    </div>
  )
}

export default Head