import React,{ useRef } from 'react'
import { IndeterminateCheckbox } from './CustomCheckbox';
import view from "../../assets/svg/view_option.svg";
import "./CustomFilter.css";

function CustomFilter({ search, toggle, allcolumns, filter }) {
    const inputRef = useRef();
    const clear = () => {
        search("");
        inputRef.current.value = ""
    }
    return (
        <div className='row  '>
            <div className=' col-12 col-sm-12 col-md-4 col-lg-3  search-filter1'>
                <div className='border-box-style1  mb-3 '>
                    <input ref={inputRef} className='filter-search  filter  fs-4' type='text' placeholder='Filter tasks ...' onChange={(e) => search(e.target.value)} />
                </div>
            </div>
            <div className=' col-9 col-sm-9 col-md-6 col-lg-6 drop-filter '>
                {filter !== "" ? <div>
                    <div className='border-box-style   me-2 mb-3 table-text1' onClick={() => clear()}>
                        <i className="bi bi-x-circle table-text1"></i> Clear
                    </div>
                </div> : <div></div>}
                <div className='border-box-style  me-2 table-text1'>
                    <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true">
                        <i className="bi bi-plus-circle table-text1"> </i> Status
                    </div>
                    <div className='dropdown-menu my-2 me-3 menu-position' aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item fs-5" onClick={() => search("open")}>Open</div>
                        <div className="dropdown-item fs-5" onClick={() => search("in progress")}>In Progress</div>
                        <div className="dropdown-item fs-5" onClick={() => search("closed")}>Closed</div>
                        <div className="dropdown-item fs-5" onClick={() => search("on hold")}>On Hold</div>
                    </div>
                </div>

                <div className='border-box-style   table-text1'>
                    <div id="dropdownMenuButton11" data-bs-toggle="dropdown" aria-haspopup="true">
                        <i className="bi bi-plus-circle table-text1"></i> Priority
                    </div>
                    <div className='dropdown-menu my-2 me-3 menu-position1 ' aria-labelledby="dropdownMenuButton11">
                        <div className="dropdown-item fs-5" onClick={() => search("high")}>High</div>
                        <div className="dropdown-item fs-5" onClick={() => search("medium")}>Medium</div>
                        <div className="dropdown-item fs-5" onClick={() => search("low")} >Low</div>

                    </div>
                </div>
            </div>
            <div className='col-3 col-sm-3 col-md-2 col-lg-3 view-filter'>
                <div className='border-box-style  table-text1'>
                    <div id="dropdownMenuButton11" data-bs-toggle="dropdown" aria-haspopup="true">
                        <img src={view} alt='view' className='fs-4 w-25 h-25' /> View
                    </div>
                    <div className='dropdown-menu my-2 me-3 menu-position1 ' aria-labelledby="dropdownMenuButton11">
                        <div>
                            <div className='fs-5 ms-3'>
                                <IndeterminateCheckbox {...toggle()} /> Toggle
                                All
                            </div>
                            {allcolumns.map((column) => {

                                return (
                                    <div key={column.id} className="dropdown-item fs-5">
                                        <div className='d-flex align-items-center' >
                                            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                                            <p className='m-0 ms-2'>{column.id} </p>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            <br />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default CustomFilter