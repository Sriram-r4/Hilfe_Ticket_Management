import React, { useState } from 'react';
import "./SignIn.css";
import '../assets/frame1.png';
import logo from "../assets/logo.png";
import frame from "../assets/frame1.png";
import arrow from "../assets/arrow-forward.png";
import '../Common/pages/Main.css';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInterceptors from '../Common/axios-config';
import Loader from '../Common/util/Loader';
import Password from '../Common/util/Password';

function SignIn() {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const errors = {
    email: "Invalid Email",
    pass: "Invalid Password"
  };

  const handleRequest = (email, password) => {
    setErrorMessages({});
    var data = {
      email: email,
      password: password
    }
    setloading(true);
    AxiosInterceptors(navigate).post("/signin", data)
      .then((res) => {
        const id = res.data.id;
        const role = res.data.role;
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        AxiosInterceptors(navigate).post("/users/", { email: email }).then((res) => {
          const data = res.data;
          localStorage.setItem("uname", data.username);
          localStorage.setItem("fname", data.firstname);
          localStorage.setItem("lname", data.lastname);
          localStorage.setItem("phno", data.phoneno);
          localStorage.setItem("company", data.company);
          localStorage.setItem("desg", data.designation);
          alert("Sign in is successful!");

          if (role === "user") {
            navigate("/usrdash");
          }
          if (role === "admin") {
            navigate("/dashboard");
          }
          setloading(false);
        }).catch(() => {
          setloading(false);
        })


      }
      )
      .catch((res) => {
        if (res.code !== "ERR_NETWORK") {
          console.log(res);
          const status = res.response.status;
          const error = res.response.data.error;
          if (status === 401) {
            setErrorMessages({ name: "pass", message: error });
          }
        }
        setloading(false);
      });
     
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    var { email, password } = document.forms[0];
    const pattern = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const emailid = email.value;
    const pass = password.value;
    var flag = true;
    if (!pattern.test(emailid)) {
      setErrorMessages({ name: "email", message: errors.email });
      flag = false;
    }
    if (pass.length < 4 || pass === "") {
      setErrorMessages({ name: "pass", message: errors.pass });
      flag = false;
    }
    if (flag) {

      handleRequest(emailid, pass);

    }
  };


  const renderErrorMessage = (name, errorMessages) =>
    name === errorMessages.name && (
      <div className="error fs-5 m-2">{errorMessages.message}</div>
    );

  return (
    <div>
      <img className="frame " src={frame} alt='bg' />
      <div className='right-container '>
        <div className='row'>
          <img className="col-3 icon mx-auto d-block" alt="icon" src={logo} />
        </div>
        <div>
          <img className="  ms-2 fs-5" alt="arrow" src={arrow} />
          <form onSubmit={handleSubmit}>
            <div className="mb-2 my-2">
              <p className='title fs-2 my-1'>
                Sign In
              </p>
              <p className='text text-secondary mb-4 fs-4'>Please enter your details </p>
            </div>
            <div className='form-group form-group-sm form-group-md form-group-lg  row-md mb-3  '>
              <label className='text fs-4 mb-4'>Email address</label>
              <input type='email' className='text form-control form-control-sm form-control-md form-control-lg  fs-4' id='email' name='email' placeholder='Enter email' required />
              {renderErrorMessage("email", errorMessages)}
            </div>
            <div className='form-group form-group-sm form-group-md form-group-lg  row-md mb-3 mt-3'>
              <label className='text fs-4 mb-4'>Password</label>
              <Password id="password" name="password" placeholder="Enter password" />
              {renderErrorMessage("pass", errorMessages)}
            </div>
            <div className=' row form-group d-flex '>
              <div className='col-xs -12 col-6'>
                <input type='checkbox' className=' form-check-input-lg fs-lg-4 ' />
                <label className=' text ms-2 p-0 fs-5 fs-lg-4'>Remember me</label>
              </div>
              <Link to="/forget" className=' col-6 text  text-end justify-content-end text-secondary fs-5 fs-lg-4'> Forget Password?</Link>
            </div>
            <div className='row  form-group-lg mt-3 mb-5 px-2' >
              <button className='btn temp-color txt-btn btn-lg font-weight-bold my-3 fs-5 ' type='submit' > Sign in</button>
            </div>
            <div className="row ">
              <span className='justify-content-center col-12 d-flex nowrap my-2 '> <p className='text  text-secondary mb-4 fs-5'> Don&#39;t have an account?</p>
                <Link to="/signup" className=' text text-primary active text-decoration-none  mb-4 fs-5'><strong>&nbsp;Sign up</strong></Link>
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
      {loading ? <Loader /> : null}
    </div>
  )
}

export default SignIn