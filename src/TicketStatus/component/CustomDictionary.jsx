import React from 'react';
import "./CustomDictionary.css";

function CustomDictionary(props) {

    var icon = {
        width: 10,
        height: 10,
        paddingRight:1
    }
   
    return (
        <div className={props.style1}>
            {props.data.map((i) => {
                return (           
                <div className=' row my-1 py-1 mx-0' key={i.key}>
                    <div className='d-flex align-items-center col-6'>
                        <p className='fs-5 mb-0'>{i.key}</p>
                    </div>
                    <div className='col-6 d-flex align-items-center'>
                        {i.img ? <img className={icon} src={i.img}></img> : <div ></div>}
                        <div className='mx-2 fs-5 mb-0'>{i.value}</div>
                    </div>
                </div>
             
                )
            })}
        </div>
    )
}

export default CustomDictionary