import React from 'react';
import './Customtable1.css'

function CustomTable1({ data, type }) {
    return (
        <div className=' custom-table-container'>
            <div className='table-box-container'>
                <div className='row table-head p-2'>
                    <div className='text col-2 fs-4  my-3'>
                        <div className='d-flex justify-content-center'>
                            ID
                        </div>
                    </div>
                    <div className='text col-6 fs-4 my-3'>{type}</div>
                    <div className='text col-2 fs-4 my-3'></div>
                    <div className='text col-2 fs-4 my-3'></div>
                </div>

                <div className='table-body'>
                    <div className='col'>
                        {data.length !== 0 ? data.map((i) => {
                            return (i.input === undefined) ? <div key={i.id} className='row  table-cells p-2'>
                                <div className='text col-2 fs-4 my-2'>
                                    <div className='d-flex justify-content-center'>
                                        {i.id}
                                    </div>
                                </div>
                                {type === "Product" ?
                                    <div className='text col-6 fs-4 my-2'>{i.prodname}
                                    </div> : <div className='text col-6 fs-4 my-2'>{i.catname}</div>}
                                {type === "Product" ?
                                    <div className='text col-2 fs-4 my-3'>
                                        <img src={i.icon} alt='product' className='w-25 h-25' />
                                    </div> : <div className='text col-2 fs-4 my-3'></div>}
                                <div className='text col-2 fs-4 my-3 '>
                                    <div className='d-flex justify-content-center'>
                                        <div className='mx-2'>
                                            <i className="bi bi-pencil-square" />
                                        </div>
                                        <div className='mx-2'>
                                            <i className="bi bi-trash" />
                                        </div>
                                    </div>
                                </div>
                            </div> :
                                <div key={i.key} className='row  table-cells p-2 justify-content-center'>
                                    <div className='text col-1 fs-4 my-2'></div>       
                                        {i.picker !== undefined ? <>
                                            <div className='text col-3 fs-4 my-2'>{i.input}</div>
                                            <div className='text col-4 fs-4 my-2'>{i.picker}</div>
                                        </> : <div className='text col-6 fs-4 my-2'>{i.input}</div>}
                                        <div className='text col-4 fs-4 my-2'>
                                            <div className='d-flex justify-content-end'>
                                                {i.move}
                                            </div>
                                        </div>
                                </div>
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomTable1