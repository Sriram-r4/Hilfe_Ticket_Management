import './badge.css';
import React  from 'react';
import useData from './useData';
function Badge() {
    const data=useData();
    return (
        <div className="badges m-1">
            
            {data.map((i) => {
                return (
                    <div className='card-badge m-1 ' key={i.type}>
                        <div className='row'>
                        <div className='col-5 p-0 '><h3 className='circle  text '><b>{i.no}</b></h3></div>
                        <div className='col-7  text px-0 px-lg-auto text-center justify-content-start'><p>{i.type}</p></div>
                        </div>
                    </div>)
            })}
      
        </div>
    );
}

export default Badge; 