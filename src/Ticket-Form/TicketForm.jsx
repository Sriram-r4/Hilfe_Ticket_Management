import './TicketForm.css';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNavToggle } from '../CustomHook/useNavToggle';
import getFuturedate from './getFuturedate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import getValuefromHTML from './getvalue';
import {getUsername} from './getUserName';
import getfilePath from './getFilePath';
import CreateTicket from './createTicket';

function TicketForm() {
    const [style, style1, style2, setToggle] = useNavToggle();
    const [editor, setEditorHtml] = useState('');
    const locate=useLocation()
    const [selectedFile, setSelectedFile] = useState(null);
    const product=locate.state.prodname;
    const navigate = useNavigate();
    const handleChange = (html) => {
        setEditorHtml(html);
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFile(files);
      };
    var formH = {
        height: "300px"
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const desc=getValuefromHTML(editor)
        const [title, cc, subject, priority, cat]= document.forms[0];
        const t = title.value;
        const c = cc.value;
        const s = subject.value;
        const p = priority.value;
        const c1 = cat.value;
        const id = localStorage.getItem("id");
        const currentDate = new Date();
        const uname=await getUsername(c,navigate);
        const time = getFuturedate(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
        
        var files= getfilePath(selectedFile,navigate);
        await CreateTicket(t,c,s,p,c1,desc,id,time,uname,files,product,navigate);          
    }
    return (
        <div className='base-container1'>
            <div className={style}>
                <Navigation toggle={setToggle} />
            </div>
            <div className={style2}><Header /></div>
            <div className={style1}>
                <div className='body-container'>
                    <div className='type-cont'>
                        <p className='ticket-logo ticket-type mx-2'>
                            IT
                        </p>
                        <p className='bi bi-chevron-right  fs-2 mx-2'>

                        </p>
                        <p className='ticket-type'>
                            New Ticket
                        </p>
                    </div>
                    <div className='ticketform-cont m-1 p-3'>
                        <form className='col' onSubmit={handleSubmit} encType="multipart/form-data" >
                            <div className='row form-group'>
                                <label className='ticket-type fs-3'>Title <span className='text-danger'>*</span></label>
                                <input type='text' placeholder='Enter the issue' className='form-control px-2 fs-4 title-place ' required />
                            </div>
                            <div className='row form-group'>
                                <label className='ticket-type fs-3'>CC</label>
                                <input type='text' className='form-control fs-4' required />
                            </div>
                            <div className='row form-group'>
                                <label className='ticket-type fs-3'>Subject <span className='text-danger'>*</span></label>
                                <input type='text' className='form-control fs-4' required />
                            </div>
                            <div className='row form-group'>
                                <label className='ticket-type fs-3'>Priority <span className='text-danger'>*</span></label>
                                <select className="form-select  fs-4 " required>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>

                                </select>
                            </div>
                            <div className='row form-group'>
                                <label className='ticket-type fs-3'>Department Category</label>
                                <select className="form-select  fs-4 " required>
                                    <option>Software</option>
                                    <option>DevTools</option>
                                    <option>ITSupport</option>
                                    <option>HR</option>
                                </select>
                            </div>
                            <div className='card' style={formH}>
                                <ReactQuill
                                 style={{ height: '250px' }} 
                                    value={editor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='row form-group mt-3'>
                                <label className='ticket-type fs-3'><div className='attach-icon'><i className="bi bi-paperclip "></i> </div> Attach file</label>
                                <div className=" files ">
                                    <input type="file" className="file-upload" multiple={true} name='files' id='files' onChange={handleFileChange}  accept=".jpg, .jpeg, .png, .pdf"/>
                                </div>
                            </div>
                            <div className='row form-group m-0 justify-content-end'>
                                <button type='button' className='btn-lg ticket-type form-cancel fs-5 col-3 col-md-2 col-lg-1  '>
                                    <Link to="/tlist" className='text-decoration-none text-black'>Cancel
                                    </Link>
                                </button>
                                <button type='submit' className='btn-lg ticket-type form-submit fs-5  text-white  col-3 col-md-2 col-lg-1 mx-2'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketForm;