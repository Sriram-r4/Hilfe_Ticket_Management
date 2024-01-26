import React, { useState } from 'react'
import AxiosInterceptors from '../axios-config';

function EditFormPopup({ id, setLoading, onClose, navigate,setData,labels,res,history,comment }) {
    const [errorMessages, setErrorMessages] = useState({});
    const uid = localStorage.getItem("id");
    const errors = {
        label: "please enter ticket labels",
        res: "please enter resolution",
    };
    var style = {
        borderRadius: "2%",
        paddingInline:"2em",
        height: "275px",
        width: "230px",
        maxWidth:"350px",
        backgroundColor: "white"
    }
    const handleEdit = (onClose) => {
        const [label, res] = document.forms[0];
        const l = label.value;
        const r = res.value;
        if (l === "") {
            setErrorMessages({ name: "label", message: errors.label })
        }
        else if (r === "") {
            setErrorMessages({ name: "res", message: errors.res })
        }
        else {
            setErrorMessages({})
            var req = {
                "ticket_id":id,
                "user_id": uid,
                "resolution": r,
                "labels": l
            }
            setLoading(true);
            onClose();
            AxiosInterceptors(navigate).patch("/update-ticket/", req).then((res) => {
                const data = res.data;
                setData(data, history, comment);
                setLoading(false);
            }).catch((err) => { console.log(err); setLoading(false); });
        }


    }
    const renderErrorMessage = (name, errorMessages) =>
        name === errorMessages.name && (
            <div className="error fs-5 px-2 pb-2 pt-1">{errorMessages.message}</div>
        );
    return (
        <div className='custom-ui d-flex align-items-stretch flex-column justify-content-between' style={style}>
        <div>
            <div>
                <h1 className='fs-3 mt-3'>Edit Ticket</h1>
            </div>
            <div>
                <form>
                     <div className='mb-3'>
                        <p className='fs-4 mb-0'>Labels</p>
                        <input type='text' className='form-control form-control-md mb-3 fs-3' id='label' name='label' defaultValue={labels} maxLength={25} />
                        {renderErrorMessage("label", errorMessages)}
                        <p className='fs-4 mb-0'>Resolution</p>
                        <input type='text' className='form-control form-control-md mb-3 fs-3' id='res' name='res' defaultValue={res} maxLength={15} />
                        {renderErrorMessage("res", errorMessages)}
                    </div> 
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
        </div>
    )
}

export default EditFormPopup