import React from 'react';
import "./CustomAttachment.css";
import getFilenameFromUrl from './getFilename';

function CustomAttachments(props) {
    const data=props.data;
  return (
    <div className='d-flex m-2 ps-5'>
        {data!=null?data.map((i)=>{
            return(
                <div className='d-flex flex-column justify-content-center m-2 ' key={getFilenameFromUrl(i)}>
                    <div className='border-box'>
                        <img src={i} alt='.'/>
                    </div>
                    <p>{getFilenameFromUrl(i)}</p>
                </div>
            )
        }):<div className='fs-4'>No attachments</div>}
    </div>
  )
}

export default CustomAttachments