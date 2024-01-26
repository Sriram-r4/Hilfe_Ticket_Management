import React from 'react'
import { useState } from 'react';
import './Password.css';

function Password({id,name,placeholder,focus,blur,change}) {
    const [flag,setFlag]=useState(true);
    const [type,setType]=useState('password')
    const toggle=()=>{
        if(flag){
            setType('text');
            setFlag(false);
        }
        else{
            setType('password');
            setFlag(true);
        }
    }
    return (
        <div className='password'>
            <input type={type} 
            className=' text form-control form-control-sm form-control-md form-control-lg  fs-4 pinput' 
            id={id} 
            name={name} 
            placeholder={placeholder} 
            autoComplete='off' 
            onFocus={focus}
            onBlur={blur}
            onChange={change}
            required />
            <div onClick={()=>toggle()}>
            {flag?<i className="bi bi-eye-slash-fill eicon fs-2"/>:<i className="bi bi-eye-fill eicon fs-2"/>}
            </div>
        </div>
    )
}

export default Password