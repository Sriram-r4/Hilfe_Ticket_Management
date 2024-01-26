import React from 'react'
import "./Loader.css"

function Loader() {
    return (
        <div className='loader-page'>
            <span className="loader"></span>
            <div className='load'>
            <span className="loader1">Loading</span>
            </div>
        </div>
    )
}

export default Loader