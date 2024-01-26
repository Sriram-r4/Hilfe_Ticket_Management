import React, { useState } from 'react'
import Capitalize from '../CapitalConverter';
import AxiosInterceptors from '../axios-config';

function FormPopup({id,type,setLoading,onClose,navigate,name}) {
    const [errorMessages, setErrorMessages] = useState({});
    const uid = localStorage.getItem("id");
    const errors = {
        val: `Please enter ${type} name`,
        file: "Please upload file",
    };
    const handleEdit = (onClose) => {
        if (type === "product") {
            const [epvalue, efile] = document.forms[0];
            const val = epvalue.value;
            const file = efile.value;
            if (!file) {
                setErrorMessages({ name: "file", message: errors.file })
            }
            else if (val === "") {
                setErrorMessages({ name: "value", message: errors.val })
            }
            else {
                setErrorMessages({})
                var data = {
                    user_id: uid,
                    prodname: val,
                    icon: file
                }
                setLoading(true);
                onClose();
                AxiosInterceptors(navigate).put("/product/" + id, data).then(() => {
                    setLoading(false);
                }).catch(()=>{
                    setLoading(false);
                })
            }
        }
        else {
            const [ecvalue] = document.forms[0];
            const val = ecvalue.value;
            if (val === "") {
                setErrorMessages({ name: "value", message: errors.val })
            }
            else {
                setErrorMessages({})
                var data = {
                    user_id: uid,
                    catname: val
                }
                setLoading(true);
                onClose();
                AxiosInterceptors(navigate).put("/categories/" + id, data).then(() => {
                    setLoading(false);
                }).catch(()=>{
                    setLoading(false);
                })
            }
        }
    }
    const renderErrorMessage = (name, errorMessages) =>
        name === errorMessages.name && (
            <div className="error fs-5 p-2">{errorMessages.message}</div>
        );
    return (

        <div>
            <div>
                <h1 className='fs-3 mt-3'>Edit {Capitalize(type)} of ID {id}</h1>
            </div>
            <div>
                <form>
                    {type === "product" ? <div className='mb-3'>
                        <input type='text' className='form-control form-control-md mb-3 fs-3' id='epvalue' name='epvalue' defaultValue={name} />
                        <input type='file' id="efile" name='efile' className='form-control form-control-sm fs-4' />
                        {renderErrorMessage("file", errorMessages)}
                    </div> : <div className='mt-5 mb-3'>
                        <input type='text' className='form-control form-control-md fs-3' id='ecvalue' name='ecvalue' defaultValue={name}/>

                    </div>
                    }

                    {renderErrorMessage("value", errorMessages)}
                </form>
            </div>
            <div className='d-flex align-items-center justify-content-center pb-5 mx-5'>
                <button
                    className='btn btn-primary fs-3 mx-2'
                    onClick={() => {
                        handleEdit(onClose);

                    }}
                >
                    Submit
                </button>
                <button className='btn btn-danger fs-3 mx-2' onClick={onClose}>Cancel</button>
            </div>

        </div>
    )
}

export default FormPopup