import React from 'react'
import './Error.css'
import errorframe from '../../assets/error/404_error.svg';
import logo from "../../assets/error/logo-hilfe.svg";
import { useNavigate } from 'react-router-dom';


function Error() {
  const navigate=useNavigate();
  return (
    <div className='w-100 h-100 bg-white'>
      <div className='logo1'>
      <img src={logo} className='w-50 h-50' alt="logo" />
      </div>
      <div className='errorframe'>
      <img src={errorframe}  alt="Error"  className='errorIcon'/>
      <div onClick={()=>navigate("/signin")}><p className='navigate fs-1'>Back to Homepage</p></div>
      </div>
    </div>
  )
}

export default Error