import React, { useState } from 'react';
import '../assets/frame1.png';
import logo from "../assets/logo.png";
import frame from "../assets/frame1.png";
import arrow from "../assets/arrow-forward.png";
import '../Common/pages/Main.css';
import './Forget.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosInterceptors from '../Common/axios-config';
import Password from '../Common/util/Password';
import Loader from '../Common/util/Loader';


function ResetPassword() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const locate=useLocation();
  const data1=locate.state.data;
  const [loading,setLoading]=useState(false);

  const errors = {
    pass: "Invalid password",
    conpass: "Password doesn't match",
  };

  const handleRequest=(password)=>{
    const data={
      otp:data1.code,
      id:data1.id,
      password:password
    };
    setErrorMessages({});
    setLoading(true);
    AxiosInterceptors(navigate).post("/reset-password",data).then((res)=>{
      setLoading(false);
      var role=res.data.role;
      localStorage.setItem("role",role);
      alert("Password Reset  successfully");
      navigate("/signin");
    }).catch((res)=>{
      setLoading(false);
      alert("Please try again");
      navigate("/forget");
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var { password, confirm } = document.forms[0];
    const pass = password.value;
    const con = confirm.value;
    var flag = true;

    if (pass.length < 4 || pass === "") {
      setErrorMessages({ name: "pass", message: errors.pass });
      flag = false;
    }
    if (pass !== con) {
      setErrorMessages({ name: "conpass", message: errors.conpass });
      flag = false;
    }
    if (flag) {
      handleRequest(pass);
    }
  };


  const renderErrorMessage = (name, errorMessages) =>
    name === errorMessages.name && (
      <div className="error fs-5 p-2">{errorMessages.message}</div>
    );

  return (
    <div>
      <img className="frame " src={frame} alt='bg'/>
      <div className='right-container my-lg-auto '>
        <div className='row d-flex justify-content-center '>
          <img className="col-3  fs-4 " alt="icon" src={logo} />
        </div>
        <div className='row d-flex justify-content-end mb-4 '>
          <img className=" col-1  " alt="arrow" src={arrow} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4 p-2">
            <h4 className='title fs-2'>
              Reset Your Password
            </h4>
          </div>
          <div className='  form-group mt-3  form-group-md'>
            <label className='text form-label my-2  fs-4'>New Password</label>
            <Password id='password' name='password' placeholder='Enter new password'/>
            {renderErrorMessage("pass", errorMessages)}
          </div>
          <div className='form-group  mt-3  form-group-md'>
            <label className='text form-label my-2 fs-4'>Confirm Password</label>
            <Password id='confirm' name='confirm' placeholder='At least 6 characters'/>
            {renderErrorMessage("conpass", errorMessages)}
          </div>
          <div className='row  form-group-lg mt-5 mb-2  mx-1' >
            <button className='btn temp-color txt-btn btn-lg font-weight-bold py-2  fs-5' type='submit'> Set Password</button>
          </div>
          <div className="row mb-5 mt-4">
            <span className='justify-content-center col-12 d-flex nowrap my-2 '> <p className='text  text-secondary fs-5'> Don&#39;t have an account ?</p>
              <Link to="/signup" className=' text text-primary active text-decoration-none fs-5'><strong>Sign up</strong></Link>
            </span>
          </div>
        </form>
      </div>
      <div className='hidden-xs  left-container'>
        <div className="adventure-start-here">
          <h1 className="h text-wrap">Adventure</h1>
          <h1 className="h text-wrap ">Start here</h1>
          <p className="p text-wrap1 ">Create an Account to Join Our</p>
          <p className="p text-wrap1">Community</p>
        </div>
      </div>
      {loading?<Loader/>:null}
    </div>
  )
}

export default ResetPassword