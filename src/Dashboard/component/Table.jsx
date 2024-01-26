import './table.css';
import React from 'react';
import { icons } from "./table_data"
import Capitalize from '../../Common/CapitalConverter';
export function Table({ data }) {
    return (
        <div className=" table  accordion align-content-center px-3 m-0">
            {
                data.map((val, did) => {
                    const status = val.status.toLowerCase();
                    const icon = icons[status]
                    return (
                        <React.Fragment key={did}>
                            <div className="row row-data text-center " data-bs-toggle="collapse" data-bs-target={"#" + did}>
                                <p className="col-3 fs-5 mb-0"><img src={icon} alt='ic' /> </p>
                                <p className="col-4 fs-5 mb-0 d-flex align-items-center justify-content-center">{val["ticket_id"]}</p>
                                <p className="col-4 fs-5 mb-0 d-flex align-items-center justify-content-center px-0 text-ellipse">{Capitalize(val.title)}</p>
                                <p className='col-1 mb-0'><i className='bi bi-chevron-down m-0 px-0 d-flex justify-content-end fs-5'></i></p>
                            </div>
                            <div className="row row-data collapse accordion-collapse text-left fs-5" id={did} data-bs-parent=".table">
                                <p className='ps-5 py-3'>{val.description}</p>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div >
    );
}