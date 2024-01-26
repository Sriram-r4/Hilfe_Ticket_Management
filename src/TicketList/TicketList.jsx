import React, { useCallback, useRef, useMemo } from 'react';
import "./TicketList.css";
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import TicketTable from './component/TicketTable';
import { Sorting } from './component/Sorting';
import { column } from './component/columns';
import { Link, useNavigate } from 'react-router-dom';
import { useNavToggle } from '../CustomHook/useNavToggle';
import Loader from '../Common/util/Loader';
import useTicketList from '../CustomHook/useTicketList';


function TicketList() {
    const [style, style1, style2, setToggle] = useNavToggle();
    const id = localStorage.getItem("id");
    const sortIdRef = useRef(0);
    const navigate = useNavigate()
    const [loading, data, setData1] = useTicketList(id, navigate, sortIdRef);
    const columns = useMemo(() => {
        return column
    }, []);


    const handleSort = (sortBy, filters, data) => {
        if (filters === "") {
            const sorted = Sorting(sortIdRef, sortBy, data);
            setData1(sorted);
    }
}

return (
    <div className='base-container1'>
        <div className={style}>
            <Navigation toggle={setToggle} />
        </div>
        <div className={style2}><Header /> </div>

        <div className={style1}>
            <div className='body-container'>
                <div className='list-title-cont'>
                    <p className='fs-1 mx-2 my-5 ticket-title-list me-auto'>Ticket List</p>
                    <div className='d-flex justify-content-end'>
                        <Link to="/cticket">
                            <button className='btn btn-primary m-2 fs-lg-3 fs-4  btn-box-shadow'>
                                <i className="bi bi-pencil-fill me-1"></i> New Ticket
                            </button></Link>
                    </div>
                </div>
                <div className='list-container'>
                    <TicketTable columns={columns}
                        data={data}
                        onSort={handleSort}
                    />
                </div>
            </div>
        </div>
        {loading ? <Loader /> : null}
    </div>
)
}

export default TicketList