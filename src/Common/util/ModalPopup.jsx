import { confirmAlert } from 'react-confirm-alert';
import "./ModalPopup.css";
import axios from 'axios';
import { BACKEND_URL } from '../env';

const GetModalPopup = (id, type,setLoading) => {
    const uid = localStorage.getItem("id");
    var style = {
        padding: "2em",
        borderRadius: "2%",
        height: "30vh",
        backgroundColor: "white"
    }

    const handleDelete = () => {
       
        var data = { user_id: uid }
        var headers={
            'Content-Type': 'application/json' 
        }
        if (type === "product") {
            setLoading(true);
            axios({
                method: 'delete',
                url: BACKEND_URL + "/product/" + id,
                data: data,
                headers: headers
            }).then(() => {
                setLoading(false);
            }).catch(()=>{setLoading(false);})
        }
        else {
            setLoading(true);
            axios({
                method: 'delete',
                url: BACKEND_URL + "/categories/" + id,
                data: data,
                headers: headers
            }).then(() => {
                setLoading(false);
            }).catch(()=>{setLoading(false);})
        }
    }
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui d-flex align-items-center flex-column justify-content-between' style={style}>
                    <div className=''>
                        <h1 className='fs-2 mt-1'>Confirm to delete?</h1>
                        <p className='fs-3'>Are you sure to delete {type} with id:{id}?</p>
                    </div>
                    <div className='d-flex align-items-center mb-5'>
                        <button
                            className='btn btn-primary me-5 fs-3'
                            onClick={() => {
                                handleDelete();
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                        <button className='btn btn-danger mx-5 fs-3 px-3' onClick={onClose}>&nbsp;No&nbsp;</button>
                    </div>

                </div>
            );
        }
    });
};



export default GetModalPopup;