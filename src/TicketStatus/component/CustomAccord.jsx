import React,{ useState } from 'react';
import "./CustomAccord.css";

function CustomAccord(props) {
    
    const[style,setStyle]=useState(true);
    const iconRotate=()=>{
       setStyle(!style);
    }

    return (
        <div className="accordion " id={props.id1}>
            <div className="accordion-item accord-color">
                <h6 className="accordion-header py-1 accord-color " id={props.id3}>
                    <div className=" fs-4 p-3 " data-bs-toggle="collapse" data-bs-target={"#"+props.id2} onClick={()=>iconRotate()}  aria-expanded="true">
                      {style ?<i className='bi bi-chevron-down btn-border-box fs-4 mx-2 px-1' >
                      </i>:<i className='bi bi-chevron-up btn-border-box fs-4 mx-2 px-1' ></i>}
                       {props.title}
                    </div>
                   
                </h6>
                <div id={props.id2} className="collapse accordion-collapse show accord-color" aria-labelledby={props.id3} data-bs-parent={"#"+props.id1}>
                    <div className={props.style}>{props.children} </div>
                </div>
            </div>
        </div>
    )
}

export default CustomAccord