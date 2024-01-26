import React from 'react';
import iconprofile from "../../assets/svg/ticket-icon-4.svg";
import "./CustomTimeline.css";
import convertUTCtoCustomFormat from '../../Common/UTCtoCustomDate';
import Capitalize from '../../Common/CapitalConverter';

function CustomTimeline(props) {
    const data=props.data;
    return (
        <div className='timeline-box'>
            {data!=null?data.map((i,did) => {
                return (
                    <div className='history-reply-box' key={did}>
                        <div className='history-box'>
                            <div className='col-3 icon-box m-3'>
                                <div className='history-line'>         
                                    <img src={iconprofile} alt='' className='w-75 h-75' />
                                    <div className="vr mx-auto" style={{ height: "100px" }}></div>
                                </div>
                            </div>
                            <div className='col-8 d-flex flex-column fs-5 '>
                                <div className='text-temp-color fs-5 mt-5'>{Capitalize(i.firstname)}</div>
                                <div className='fs-5 '>{i.description}</div>
                                <div className='text-secondary fs-5'>{convertUTCtoCustomFormat(i.timestamp)}</div>
                            </div>
                        </div>
                    </div>

                )
            }):<div/>}

        </div>
    )
}

export default CustomTimeline