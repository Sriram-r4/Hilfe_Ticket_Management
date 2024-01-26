import {  useMemo, useRef} from 'react';
import Badge from '../UserDashboard/Components/Badge';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import "../TicketList/Listdata";
import TicketTable from '../TicketList/component/TicketTable';
import { Sorting } from '../TicketList/component/Sorting';
import { column } from '../TicketList/component/columns';
import { Link, useNavigate } from 'react-router-dom';
import { useNavToggle } from '../CustomHook/useNavToggle';
import Loader from '../Common/util/Loader';
import Capitalize from '../Common/CapitalConverter';
import useTicketList from '../CustomHook/useTicketList';


function UserDashboard() {
  const [style, style1, style2, setToggle] = useNavToggle();
  const navigate=useNavigate();
  const sortIdRef = useRef(0);
  const id = localStorage.getItem("id");
  const [loading,data,setData1]=useTicketList(id,navigate,sortIdRef);
  const fname=localStorage.getItem("fname");
  const tdata=useMemo(()=>{
    return data;
  }) 
  

  const columns = useMemo(() => {
    return column
  }, []);

 

 
 
  const handleSort =(sortBy, filters,data) => {
    if (filters === "") {
      const sorted = Sorting(sortIdRef, sortBy, data);
       setData1(sorted);
    }
  }




  return (
    <div className='base-container'>
      <div className={style}>
        <Navigation toggle={setToggle} />
      </div>
      <div className={style2}><Header /></div>
      <div className={style1}>
        <div className='m-1 mx-2'>
        <div className=' p-2 ps-4  fs-1 fs-lg-3'>
          Welcome {Capitalize(fname)}
        </div>

        <div>
          <Badge />
        </div>
        <div>
          <p className='fs-1  p-2 ps-4 my-3 ticket-title-list me-auto'>My Tickets</p>
          <div className='d-flex justify-content-end'>
            <Link to="/cticket">
              <button className='btn btn-primary m-2 fs-lg-3 fs-4  btn-box-shadow'>
                <i className="bi bi-plus-lg
                 me-1"></i> New Ticket
              </button></Link>
          </div>
        </div>
        <div className='ps-1 pe-3'>
          <TicketTable columns={columns}
            data={tdata}
            onSort={handleSort}
          />
        </div>
      </div>
      </div>
      {loading?<Loader/>:null}
    </div>
  );
}

export default UserDashboard;
