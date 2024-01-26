import React,{ useEffect,useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import "./TicketStatus.css";
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import audio from "../assets/svg/audio.svg"
import CustomAccord from './component/CustomAccord';
import CustomDictionary from './component/CustomDictionary';
import CustomAttachments from './component/CustomAttachments';
import CustomTimeline from './component/CustomTimeline';
import CustomActions from './component/CustomActions';
import { useNavToggle } from '../CustomHook/useNavToggle';
import useStatusData from '../CustomHook/useStatusData';
import getColor from '../Common/getButtonColor';
import Loader from '../Common/util/Loader';
import AxiosInterceptors from '../Common/axios-config';
import EditFormPopup from '../Common/util/EditForm';
import { confirmAlert } from 'react-confirm-alert';


function TicketStatus() {
    const [style, style1, style2, setToggle] = useNavToggle();
    const style3 = "tickets-accord-box";
    const locate = useLocation();
    const [title, subject, details, desc, status, assign, date, attach, comment, history, setData] = useStatusData();
    const [selectedColor, setSelectedColor] = useState(getColor(status));
    const id = localStorage.getItem("id");
    const [text, setText] = useState('');
    const [addFlag, setaddFlag] = useState(true);
    const [change, setChange] = useState(false);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const handleTextChange = (event) => {
        const t = event.target.value;
        setText(t);
        if (t !== "") {
            setaddFlag(false);
        }
        else {
            setaddFlag(true);
        }

    };
    const addComment = () => {
        var reqdata = {
            "tick": locate.state,
            "user": id,
            "description": text
        }
        setLoading(true);
        AxiosInterceptors(navigate).post("/add-comment", reqdata).then((res) => {
            console.log(res.data);
            setText("");
            setChange(true);
            setaddFlag(true);
            setLoading(false);
        }).catch((err) => {console.log(err);setLoading(false);});
    }
    const handleColorChange = (value) => {
        update(value);
    };
    const edit = ()=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <EditFormPopup
                        id={locate.state} setLoading={setLoading}
                        onClose={onClose} 
                        navigate={navigate}
                        setData={setData}
                        labels={details[3].value}
                        res={details[4].value}
                        history={history}
                        comment={ comment}
                        />
                    
            );
        }
    });
}
    const update = (val) => {
        console.log(id);
        var req = {
            "ticket_id": locate.state,
            "user_id": id,
            "status": val
        }
        setLoading(true);
        AxiosInterceptors(navigate).patch("/update-ticket/", req).then((res) => {
            console.log(res.data);
            const data = res.data;
            setData(data, history, comment);
            setChange(true);
            setSelectedColor(getColor(val));
            setLoading(false);
        }).catch((err) => {console.log(err);setLoading(false);});
    }
    const closeTicket = () => {
        var res = {
            "ticket_id": locate.state,
            "user_id": id
        }
        setLoading(true);
        AxiosInterceptors(navigate).post("/close-ticket", res).then((res) => {
            alert(res.data.message);
            setLoading(false);
            navigate("/tlist");
        }).catch((err) => {console.log(err);setLoading(false);});
    }
    var resdata = {
        "ticket_id": locate.state
    }
    useEffect(() => {
        AxiosInterceptors(navigate).post("/get-ticket", resdata).then((res) => {
            const data = res.data;
            const info = data["ticket_info"];
            const hist = data["history"];
            const coms = data["comments"];
            setSelectedColor(getColor(data["ticket_info"].status));
            setData(info, hist, coms);
            setLoading(false);
        }).catch((err) => {console.log(err);setLoading(false);});
    }, [loading])

    return (
        <div className='base-container1'>
            <div className={style}>
                <Navigation toggle={setToggle} />
            </div>
            <div className={style2}><Header /> </div>

            <div className={style1}>
                <div className='body-container '>
                    <div className='title-top-box'>
                        <div className='ticket-title-wrapper'>
                            <div className='ticket-title-box'>
                                <div className='audio-box'>
                                    <img src={audio} alt='audio' className='w-100 h-100' />
                                </div>
                                <div className='ticket-title'>
                                    <div className='ticket-item1 fs-4'>{title}</div>
                                    <div className=' fs-3'><p className='ticket-item2 mb-0'>{subject}</p></div>
                                </div>
                            </div>
                            <div className='title-options'>
                                 <button className='btn btn-light m-2 fs-lg-3 fs-md-4 fs-sm-4 fs-5  btn-box-shadow text-secondary text-decoration-none' onClick={()=>edit()}><i className="bi bi-pencil-fill me-1"></i> Edit  </button>
                                <button className='btn btn-light m-2 fs-lg-3 fs-md-4 fs-sm-4 fs-5 btn-box-shadow text-secondary  ' disabled={addFlag} onClick={() => addComment()}>
                                    <div className='d-flex'>
                                        <div className='btn-rotate me-1' ><i className="bi bi-chat  "></i> </div> Add Comment </div>
                                </button>
                                <div className="btn-group " id="dropdownMenu" data-bs-toggle="dropdown" aria-haspopup="true">
                                    <button type="button" className={`btn ${selectedColor} dropdown-toggle m-2 fs-lg-3 fs-md-4 fs-sm-4 fs-5 btn-box-shadow`} >
                                        {status} <i className="bi bi-chevron-down"></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                                        <li><div className="dropdown-item fs-4" onClick={() => handleColorChange('Open')}>Open</div></li>
                                        <li><div className="dropdown-item fs-4" onClick={() => handleColorChange('In Progress')}>In Progress</div></li>
                                        <li><div className="dropdown-item fs-4" onClick={() => handleColorChange('Closed')}>Closed</div></li>
                                        <li><div className="dropdown-item fs-4" onClick={() => handleColorChange('On Hold')}>On Hold</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='close-box fs-1'>
                            <button className='btn btn-danger fs-lg-3 btn-box-shadow fs-4' onClick={()=>closeTicket()}> Close Ticket&nbsp; <span>x</span></button>
                        </div>
                    </div>
                    <div className='ticket-body-container'>
                        <div className='ticket-body-left'>
                            <div className='ticket-laccord-box-1'>
                                <CustomAccord title="Details" id1="accordion3" id2="flush-collapse4" id3="flush-heading4" style={style3 + " accordion-body"}>
                                    <CustomDictionary style1="d-flex flex-column  flex-wrap align-items-between w-100" data={details}/>
                                </CustomAccord>

                            </div>
                            <div className='ticket-laccord-box-2'>
                                <CustomAccord title="Description" id1="accordion4" id2="flush-collapse5" id3="flush-heading5">
                                    <p className='mx-3 fs-5 ps-4'>{desc} </p>
                                </CustomAccord>
                            </div>
                            <div className='ticket-laccord-box-3'>
                                <CustomAccord title="Attachment" id1="accordion5" id2="flush-collapse6" id3="flush-heading6" >
                                    <CustomAttachments data={attach} />
                                </CustomAccord>

                            </div>
                            <div className='ticket-laccord-box-4'>
                                <CustomAccord title="Activity" id1="accordion6" id2="flush-collapse7" id3="flush-heading7" >
                                    <CustomActions data={comment} text={text} handleTextChange={handleTextChange} />
                                </CustomAccord>

                            </div>
                        </div>
                        <div className='ticket-body-right'>
                            <div className='ticket-raccord-box-1'>
                                <CustomAccord title="People" id1="accordion" id2="flush-collapse1" id3="flush-heading1" >
                                    <CustomDictionary style1="d-flex flex-column  flex-wrap align-items-between w-100 ps-4" data={assign} />
                                </CustomAccord>
                            </div>
                            <div className='ticket-raccord-box-2'>
                                <CustomAccord title="Date" id1="accordion1" id2="flush-collapse2" id3="flush-heading2" >
                                    <CustomDictionary style1="d-flex flex-column  flex-wrap align-self-center w-100  justify-content-center ps-4 " data={date} />
                                </CustomAccord>
                            </div>
                            <div className='ticket-raccord-box-3'>
                                <CustomAccord title="History" id1="accordion2" id2="flush-collapse3" id3="flush-heading3" >
                                    <CustomTimeline data={history} />
                                </CustomAccord>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading?<Loader/>:null}
        </div>
    )
}

export default TicketStatus