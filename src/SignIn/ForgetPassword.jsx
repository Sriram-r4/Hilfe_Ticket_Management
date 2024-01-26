import React,{useState} from 'react';
import '../assets/frame1.png';
import logo from "../assets/logo.png";
import frame from "../assets/frame1.png";
import arrow from "../assets/arrow-forward.png";
import '../Common/pages/Main.css';
import './Forget.css';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInterceptors from '../Common/axios-config';
import Loader from '../Common/util/Loader';

function ForgetPassword() {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  const errors = {
    email: "invalid mailid"
  };
  const handleRequest=(email)=>{  
    var data = {
      email: email,
    }
    setErrorMessages({});
    setLoading(true);
    AxiosInterceptors(navigate).post("/forgot-password", data)
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
        navigate("/reset",{state:{data:res.data}});
      }
      )
      .catch((res) => 
      {
        setLoading(false);
        if(res.code!=="ERR_NETWORK"){
        const status=res.response.status;
        const error=res.response.data.message;
        if(status===401){
          setErrorMessages({name:"email",message:error});
        }
      }
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var { email} = document.forms[0];
    const pattern = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const emailid = email.value;
    var flag=true;

    if (!pattern.test(emailid)) {
      setErrorMessages({ name: "email", message: errors.email });
      flag=false;
    }

    if(flag){
      handleRequest(emailid);
    }
  };

  const renderErrorMessage = (name,errorMessages) =>
        name === errorMessages.name && (
            <div className="error fs-5 p-2">{errorMessages.message}</div>
        );

  return (
    <div>
      <img className="frame " src={frame}  alt='background'/>
      <div className='right-container my-lg-auto'>
        <div className='row d-flex justify-content-center '>          
          <img className="col-3  fs-4 " alt="icon" src={logo} />
        </div>
        <div className='row d-flex justify-content-end mb-4 '> 
        <img className=" col-1  " alt="arrow" src={arrow} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-2 p-2">
            <h4 className='title fs-2'>
              Forget Your Password?
            </h4>
            <p className='text mb-2 fs-4 text-secondary'>No Worries! Enter Your email and we will send you are set </p>
          </div>
          <div className='form-group form-group-lg px-2 row-md mb-3 mt-3  '>
            <label className='text fs-4 py-2 my-2'>Email address</label>
            <input type='email' className='text form-control  fs-4 ' id='email' name='email' placeholder='Enter email' required />
            {renderErrorMessage("email",errorMessages)}
          </div>
          <div className='row  form-group-lg mt-5 mb-5  mx-1' >
            <button className='btn temp-color txt-btn btn-lg font-weight-bold py-2  fs-5' type='submit'> Submit</button>
          </div>
          <div className="row my-5">
            <span className='justify-content-center col-12 d-flex nowrap my-2 '> <p className='text  text-secondary my-2 fs-5'> Don&#39;t have an account?</p>
              <Link to="/signup" className=' text text-primary active text-decoration-none my-2 fs-5'><strong>&nbsp;Sign up</strong></Link>
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

export default ForgetPassword