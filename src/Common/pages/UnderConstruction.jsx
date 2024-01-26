import React from 'react'
import './Error.css'
import underConstruct from '../../assets/uc.svg';
import logo from "../../assets/error/logo-hilfe.svg";
import { useNavigate } from 'react-router-dom';
import "./UnderConstruction.css"


function UnderConstruction() {
  const navigate=useNavigate();
  return (
    <div className='w-100 h-100 bg-white'>
      <div className='logo1'>
      <img src={logo} className='w-50 h-50' alt="bg" />
      </div>
      <div className='constructframe mx-auto'>
      <img src={underConstruct}  alt="bg"  className='construct'/>
      <div >
        <p className='navigate fs-1  text-decoration-none'>We're working on improvements!</p>
        <p className='navigate fs-1 text-decoration-none'>Check back later for updates.</p>
      </div>
      </div>
    </div>

  )
}

export default UnderConstruction