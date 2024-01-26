import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Common/pages/Main.css'
import './SignUp.css';
import '../assets/frame1.png'
import logo from "../assets/logo.png";
import frame from "../assets/frame1.png";
import arrow from "../assets/arrow-forward.png";
import PasswordStrengthBar from 'react-password-strength-bar';
import AxiosInterceptors from '../Common/axios-config';
import Password from '../Common/util/Password';
import Loader from '../Common/util/Loader';

function SignUp() {
  const [showCheck, setCheck] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [loading,setLoading]=useState(false);

  const errors = {
    email: "Invalid Email",
    pass: "Invalid Password",
    conpass: "Password doesn't match"
  };
  const handleRequest = (email, password) => {
    var data = {
      email: email,
      password: password,
      role: "user"
    }
    setLoading(true);
    AxiosInterceptors(navigate).post("/signup", data).then((res) => {
      const id=res.data.id;
      localStorage.setItem("id",id);
      setLoading(false);
      navigate("/verify", { state: email });
    }).catch((res) => {
      const error = res.response.data.email[0];
      setErrorMessages({ name: "conpass", message: error });
      setLoading(false);
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var { email, password, confirm } = document.forms[0];
    const pattern = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const emailid = email.value;
    const pass = password.value;
    const con = confirm.value;
    var flag = true;
    if (!pattern.test(emailid)) {
      setErrorMessages({ name: "email", message: errors.email });
      flag = false;
    }

    if (pass !== con) {
      setErrorMessages({ name: "conpass", message: errors.conpass });
      flag = false;
    }
    if (flag) {
      setErrorMessages({});
      handleRequest(emailid, pass)
    }
  };

  const renderErrorMessage = (name, errorMessages) =>
    name === errorMessages.name && (
      <div className="error fs-5 p-2">{errorMessages.message}</div>
    );

  return (
    <div>
      <img className="frame " alt="" src={frame} />
      <div className='right-container  '>
        <div className='row'>
          <img className="col-3 icon mx-auto d-block" alt="icon" src={logo} />
        </div>
        <div>
          <img className="  ms-2 fs-5" alt="arrow" src={arrow} />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h4 className='title fs-2'>
                Sign Up
              </h4>
              <p className='text text-secondary mb-4 fs-4'>Please provide your details </p>
            </div>
            <div className=' form-group mt-2 form-group-md'>
              <label className='text form-label fs-4'>Email address</label>
              <input type='email' className='text form-control fs-4' id='email' name='email' placeholder='Enter email' required autoFocus />
              {renderErrorMessage("email", errorMessages)}
            </div>
            <div className='  form-group mt-3 form-group-md'>
              <label className='text form-label fs-4'>Password</label>
              <Password change={e => setPassword(e.target.value)} focus={() => setCheck(true)} blur={() => setCheck(false)} id='password' name='password' placeholder='Enter password'/>
              {showCheck ? <PasswordStrengthBar password={password} className='mt-3 mb-0' scoreWords={[]} shortScoreWord="" /> : <div />}
            </div>
            <div className='form-group  mt-3  form-group-md'>
              <label className='text form-label fs-4'>Repeat Password</label>
              <Password name="confirm" id="confirm" placeholder="Enter password again"/>
              {renderErrorMessage("conpass", errorMessages)}
            </div>
            <div className=' row form-group  '>
              <div className='col text-wrap d-flex align-items-start justify-content-start'>
                <input type='checkbox' className='m-0 form-check-input-lg fs-4 align-items-center' required />
                <label className='agree  ms-2 mb-4 pt-1 fs-5 text-wrap'>
                  I&#39;ve read and agree to the <a href="#" target='_blank' className='agree1 text-danger fs-5'>Privacy Policy</a> and <a href="#" target='_blank' className='agree1 text-danger fs-5'>Terms & Conditions</a>
                </label>
              </div>
            </div>
            <div className='row  form-group-lg mt-5 mb-2  mx-1' >
              <button className='btn temp-color txt-btn btn-lg font-weight-bold py-2  fs-5' type='submit' > Continue</button>
            </div>
            <div className="row mt-4 mb-5 ">
              <span className='justify-content-center col-12 d-flex flex-nowrap mb-2 '> <p className='text  text-secondary fs-5'> Already have an account?</p>
                <Link to="/signin" className='text text-primary active text-decoration-none fs-5'><strong>&nbsp;Sign In</strong></Link>
              </span>
            </div>
          </form>
        </div>
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

export default SignUp