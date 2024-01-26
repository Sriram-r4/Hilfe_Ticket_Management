import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import './Main.css'
import '../../SignIn/SignIn.css';
import './VerifyOtp.css';
import '../../assets/frame1.png'
import logo from "../../assets/logo.png";
import frame from "../../assets/frame1.png";
import arrow from "../../assets/arrow-forward.png";
import AxiosInterceptors from '../axios-config';
import Loader from '../util/Loader';


function VerifyOtp() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const locate = useLocation();
  const email = locate.state;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {

    var data = {
      email: email,
      otp: otp
    }
    event.preventDefault();
    setErrorMessages({});
    setLoading(true);
    AxiosInterceptors(navigate).post("/verify-otp", data).then((res) => {
      const role = res.data.role;
      const id = res.data.id;
      if(res.data.message===undefined){
        localStorage.setItem("email", email)
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
      }
      else{
        alert(res.data.message);
      } 
      setLoading(false);
      navigate("/profile");
    }
    )
      .catch((res) => {
        setLoading(false);
        if (res.code !== "ERR_NETWORK") {
          const status = res.response.status;
          const error = res.response.data.message;
          console.log(error);
          if (status === 400) {
            setErrorMessages({ name: "otp", message: error });
          }
        }
      });

  }

  const renderErrorMessage = (name, errorMessages) =>
    name === errorMessages.name && (
      <div className="error fs-5 p-2">{errorMessages.message}</div>
    );


  return (
    <div>
      <img className="frame " src={frame} alt='bg' />
      <div className='right-container '>
        <div className='row d-flex justify-content-center '>
          <img className="col-3  fs-4 " alt="icon" src={logo} />
        </div>
        <div className='row d-flex justify-content-end mb-4 '>
          <img className=" col-1  " alt="arrow" src={arrow} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-5 p-2">
            <h4 className='title fs-2'>
              Email Verification
            </h4>
            <p className='text text-secondary mb-2 fs-4'>We have sent code to your email {email} </p>
          </div>
          <div className=' d-flex justify-content-center mt-3 mb-5'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputType={'number'}
              renderSeparator={<span> &nbsp;</span>}
              renderInput={(props) => <input  {...props} className='otp fs-3 m-2' />}
            /></div>
          {renderErrorMessage("otp", errorMessages)}
          <div className='row  form-group-lg mt-5 mb-2  mx-1' >
            <button className='btn temp-color txt-btn btn-lg my-3 font-weight-bold py-2  fs-5' type='submit' > Verify Account</button>
          </div>
          <div className="row mb-5 mt-4">
            <span className='justify-content-center col-12 d-flex nowrap mb-2 '> <p className='text  text-secondary fs-5'>  Didn&#39;t receive code? </p>
              <Link to="/verify" className=' text text-primary active text-decoration-none fs-5' state={locate.state}><strong>&nbsp;Resend</strong></Link>
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
      {loading ? <Loader /> : null}
    </div>
  )
}

export default VerifyOtp