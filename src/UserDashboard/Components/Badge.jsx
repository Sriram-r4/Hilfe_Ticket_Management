import './badge.css';
import useData from './badgeData'
import React  from 'react';
function Badge() {
    const data=useData();
    return (
        <div className="badges-usr1 m-1 mb-5">
            
            {data.map((i) => {
                return (
                    <div className='card-badge-usr1  m-1 p-2 ' key={i.type} style={{
                       border:'1px solid  '+i.color ,
                        boxShadow: "-1px 3px 10px -5px "+i.color}}>
                        <div className='row w-100 align-items-center h-100 justify-content-stretch'>
                        <div className='col-6 py-2 '><div className='card-circle-usr1'><img src={i.src} alt="."  className='w-100 h-100 p-2'/></div></div>
                        <div className='col-6  text px-0 px-lg-auto text-center justify-content-start'>
                            <h3 className='card-text-usr1  fs-md-3 fs-sm-5 fs-xl-5 fs-lg-2'><b>{i.no}</b></h3>
                            <p className=' fs-md-4 fs-lg-3 card-text-usr1'>{i.type}</p>
                        </div>
                        </div>
                    </div>)
            })}
      
        </div>
    );
}

export default Badge; 