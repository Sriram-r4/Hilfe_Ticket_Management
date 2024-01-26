import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import profile from "../assets/profile.png";
import { useNavToggle } from '../CustomHook/useNavToggle';
import useFetchData from '../CustomHook/useFetchData';
import Capitalize from '../Common/CapitalConverter';
import Popup from '../Common/pages/Popup';
import Loader from '../Common/util/Loader';
import AxiosInterceptors from '../Common/axios-config';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [style, style1, style2, setToggle] = useNavToggle();
    const navigate=useNavigate();
    const [uname, fname, lname, email, phno, company, desg,loading, FetchData,setData] = useFetchData(navigate);
    const [bool,setbool]=useState(false);
   
    useEffect(() => {
        var email = localStorage.getItem("email")
        if (email !== null) {
            AxiosInterceptors(navigate).post("/users/", { "email": email }).then((res) => {
                const user = res.data;
                if (user.firstname === "" || user.username === "" || user.lastname === "") {
                  setbool(true);
                }
                else{
                  setData(res.data);
                }
            })
        }
    }, [bool,FetchData,loading])
    
    function handleSubmit(event) {
        event.preventDefault();
        const [uname, fname, lname, email, phno, company, desg] = document.forms[0];
        const uname1 = uname.value;
        const fname1 = fname.value;
        const lname1 = lname.value;
        const email1 = email.value;
        const phno1 = phno.value;
        const com = company.value;
        const desg1 = desg.value;
        FetchData(uname1, fname1, lname1, email1, phno1, com, desg1);
    }
    return (
      <div className='base-container1'>
            <div className={style}>
                <Navigation toggle={setToggle} />
            </div>
            <div className={style2}><Header /> </div>
          
            <div className={style1}>
                <div className='body-container'>
                    <div className='profile-page-cont'>
                        <div className='profile-cont mt-5 ms-4'>
                            <img src={profile} alt='profile' className='profile-pic fs-5' />
                            <p className='fs-2 my-3 px-3'>{Capitalize(uname)}</p>
                        </div>
                        <div className='account-cont'>
                            <form onSubmit={handleSubmit}>
                                <div className=' fs-2 m-3'>
                                    Account Settings
                                </div>
                                <div className='acc-form-cont'>
                                    <div className='user-cont ps-4 pe-3 mt-3'>
                                        <div className='row form-group '>
                                            <label className='text text-label'>Username</label>
                                            <input type='text' className='form-control fs-4' defaultValue={uname} />
                                        </div>
                                    </div>
                                    <div className='m-2'>
                                        <div className='row form-group form-input-cont '>
                                            <label className='text text-label'>Firstname</label>
                                            <input type='text' className='form-control fs-4' defaultValue={fname} />
                                        </div>
                                    </div>
                                    <div className='m-2 '>
                                        <div className='row form-group form-input-cont'>
                                            <label className='text text-label'>Lastname</label>
                                            <input type='text' className='form-control fs-4' defaultValue={lname} />
                                        </div>
                                    </div>
                                    <div className='m-2'>
                                        <div className='row form-group form-input-cont '>
                                            <label className='text text-label'>Email</label>
                                            <input type='email' className='form-control fs-4' defaultValue={email} disabled />
                                        </div>
                                    </div>
                                    <div className='m-0'>
                                        <div className='row form-group form-input-cont'>
                                            <label className='text text-label'>Phone Number</label>
                                            <input type='text' className='form-control fs-4' defaultValue={phno} />
                                        </div>
                                    </div>
                                    <div className='m-2'>
                                        <div className='row form-group form-input-cont'>
                                            <label className='text text-label'>Company</label>
                                            <input type='text' className='form-control fs-4' defaultValue={company} />
                                        </div>
                                    </div>
                                    <div className='m-2'>
                                        <div className='row form-group form-input-cont'>
                                            <label className='text text-label'>Designation</label>
                                            <input type='text' className='form-control fs-4' defaultValue={desg} />
                                        </div>
                                    </div>

                                </div>
                                <div className='row form-group m-0 '>
                                    <button type='submit' className='btn-lg ticket-type form-submit fs-4 fs-lg-5   text-white col-4  col-sm-3 col-md-2 col-lg-2 col-xl-1 mx-2'>Update</button>
                                    <button type='button' className='btn-lg ticket-type form-cancel fs-4  fs-lg-5 col-4 col-sm-3 col-md-2 col-lg-2 col-xl-1 mx-2 '>Cancel</button>
                                </div>
                            </form>
                        </div>
                      
                    </div>
                </div>
            </div>
            {  bool?<Popup email={email} setbool={setbool}></Popup> :<div/>}
            {loading?<Loader/>:null}
        </div>
    )
}

export default ProfilePage