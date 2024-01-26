import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import "./ModalPopup.css";
import FormPopup from './FormPopup';

function GetFormModal(id, type, setLoading,navigate,name) {
   
    var style = {
        borderRadius: "2%",
        paddingInline:"2em",
        height: "35vh",
        width: "230px",
        maxWidth:"350px",
        backgroundColor: "white"
    }
  
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui d-flex align-items-stretch flex-column justify-content-between' style={style}>
                    <FormPopup id={id} type={type} setLoading={setLoading} onClose={onClose} navigate={navigate} name={name}/>
                </div>
            );
        }
    });
}

export default GetFormModal