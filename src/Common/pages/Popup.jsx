import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInterceptors from '../axios-config';
import useFetchData from '../../CustomHook/useFetchData';


function Popup(props) {
    const navigate = useNavigate();
    var style = {
        paddingInline: "40%",
        paddingBlock:"10%",
        width:"100vw",
        height:"100vh",
        position:"absolute",
        left:0,
        top:0,
        zIndex:10,
        backgroundColor:"rgba(0, 0, 0, 0.2)"
    }
    var style1={
        width:"300px",
        height:"390px"
    }
    const [errorMessages, setErrorMessages] = useState({});
    const [uname, fname, lname, email, phno, company, desg,loading, FetchData,setData] = useFetchData(navigate);

    const errors = {
        uname: "Username  atleast have 5 chars",
        fname: "First name alteast have 5 chars",
        lname: "Last name alteast have 5 chars",
        phno: "phone no have 10 digits",
        company: "Invalid company name",
        desg: "Designation alteast have 5 chars"
    };

    const handleRequest = (uname, fname, lname, phno, c, desg) => {
        var email = props.email;
        var data = {
            username: uname,
            firstname: fname,
            lastname: lname,
            email: email,
            phoneno: phno,
            company: c,
            designation: desg
        }
        
        AxiosInterceptors(navigate).put("/users/", data).then((res) => {
            localStorage.setItem("email",email);
            const message=res.data.message;
            AxiosInterceptors(navigate).post("/users/", { "email": email }).then((res) => {
                setData(res.data);
                alert(message);
                props.setbool(false);
          })
        });
       
    }
    const handleForm = (event) => {
        event.preventDefault();
        var { uname, fname, lname, phno, company, desg } = document.forms[1];
        const user = uname.value;
        const fname1 = fname.value;
        const lname1 = lname.value;
        const phone = phno.value;
        const company1 = company.value;
        const designation = desg.value;
        var flag = true;
        if (user.length < 5) {
            setErrorMessages({ name: "uname", message: errors.uname });
            flag = false;
        }
        if (fname1.length < 5) {
            setErrorMessages({ name: "fname", message: errors.fname });
            flag = false;
        }
        if (lname1.length < 5) {
            setErrorMessages({ name: "lname", message: errors.lname });
            flag = false;
        }
        if (phone.length < 10) {
            setErrorMessages({ name: "phno", message: errors.phno });
            flag = false;
        }
        if (company1.length < 5) {
            setErrorMessages({ name: "company", message: errors.company });
            flag = false;
        }
        if (designation.length < 5) {
            setErrorMessages({ name: "desg", message: errors.desg });
            flag = false;
        }

        if (flag) {
            setErrorMessages({});
            handleRequest(user, fname1, lname1, phone, company1, designation)
        }
    }
    const renderErrorMessage = (name, errorMessages) =>
        name === errorMessages.name && (
            <div className="error fs-5 p-2">{errorMessages.message}</div>
        );

    return (
        <div style={style} >
            <div >
                <div className="bg-white  p-3 rounded" style={style1}>
                    <h5 className="text-center fs-3" id="exampleModal">Register</h5>
                    <form onSubmit={handleForm}>
                        <div className="mb-3  row">
                            <div id="uname" className=" col-4 fs-4">User Name:</div>
                            <div className='col-8'>
                                <input type="text" className="form-control fs-4" id="uname" name="uname" defaultValue={uname} required  />
                            </div>
                            {renderErrorMessage("uname", errorMessages)}
                        </div>
                        <div className="mb-3 row">
                            <div id="fname" className="col-4 fs-4">First Name:</div>
                            <div className='col-8'>
                                <input type="text" className="form-control  fs-4" id="fname" name="fname" defaultValue={fname} required />
                            </div>
                            {renderErrorMessage("fname", errorMessages)}
                        </div>
                        <div className="mb-3 row">
                            <div id="lname" className="col-4 fs-4">Last Name:</div>
                            <div className='col-8'>
                                <input type="text" className="form-control fs-4" id="lname" name="lname" defaultValue={lname} required />
                            </div>
                            {renderErrorMessage("lname", errorMessages)}
                        </div>
                        <div className="mb-3 row">
                            <div id="phno" className="col-4 fs-4">Phone No:</div>
                            <div className='col-8'>
                                <input type="number" className="form-control fs-4" id="phno" name="phno" defaultValue={phno} required />
                            </div>
                            {renderErrorMessage("phno", errorMessages)}
                        </div>
                        <div className="mb-3 row">
                            <div id="company" className="col-4 fs-4">Company:</div>
                            <div className='col-8'>
                                <input type="text" className="form-control fs-4" id="company" name="company" defaultValue={company} required />
                            </div>
                            {renderErrorMessage("company", errorMessages)}
                        </div>
                        <div className="mb-3 row">
                            <div className="col-4 fs-4">Designation:</div>
                            <div className='col-8'>
                                <input type="text" className="form-control fs-4" id="desg" name="desg" defaultValue={desg} required />
                            </div>
                            {renderErrorMessage("desg", errorMessages)}
                        </div>


                        <div className="text-center">
                            <button type="submit" className="btn btn-primary fs-4" >Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Popup