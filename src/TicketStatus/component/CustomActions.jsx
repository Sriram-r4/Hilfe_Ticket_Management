import React from 'react';
import convertUTCtoCustomFormat from '../../Common/UTCtoCustomDate';
import Capitalize from '../../Common/CapitalConverter';

function CustomActions(props) {
  
    var comment = {
        height: "150px",
        display: "block",
        overflow: "scroll"
    }
    return (
        <div className='p-1'>
            <div className=' card form-group '>
                <div className='card-header'>
                    <div className='d-flex m-2'>
                        <div className='fs-3 ms-3 me-auto'>{props.data.length} Response</div>
                        <div className='p-2'>
                            <select className='p-2 fs-5'>
                                <option>All</option>
                                <option value="actions">act1</option>
                                <option value="actions1">ac11</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body  mb-3" style={comment}>
                    {props.data.map((i,did)=> {
                        return (
                            <div className='col-12 d-flex flex-column fs-5 mb-1 ps-3' key={did}>
                                <div className='d-flex align-items-center'>
                                    <div className='text-temp-color fs-4 me-3'>{Capitalize(i.firstname)}</div>
                                    <div className='text-secondary fs-5 '>{convertUTCtoCustomFormat(i.timestamp)}</div>
                                </div>
                                <div className=' fs-4'>{Capitalize(i.description)}</div>
                                <hr></hr>
                            </div>
                        );
                    })}
                </div>
            </div>
            <textarea
                className="card-body form-control form-control-lg mb-3 p-3 fs-3 title-place"
                rows="4"
                placeholder="Add a comment..."
                value={props.text}
                onChange={props.handleTextChange}
            >
            </textarea>
        </div>
    )
}

export default CustomActions