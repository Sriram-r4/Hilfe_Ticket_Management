import './Dashboard.css';
import Badge from './component/Badge';
import CustomChart from './component/Chart';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import { Table } from './component/Table';
import { useNaviToggle } from '../CustomHook/useNaviToggle';
import React,{useRef} from 'react';
import Loader from '../Common/util/Loader';
import { useNavigate } from 'react-router-dom';
import useTicketList from '../CustomHook/useTicketList';

function Dashboard() {
  const [style, style1, style2, setToggle] = useNaviToggle();
  const sortIdRef = useRef(0);
  const id = localStorage.getItem("id");
  const navigate=useNavigate();
  const [loading,data,setData1]=useTicketList(id,navigate,sortIdRef);

  return (
    <div className='base-container'>
      <div className={style}>
        <Navigation toggle={setToggle} />
      </div>
      <div className={style2}><Header /></div>
      <div>
        <div className={style1}>

          <div className='badge-container mt-2 mt-sm-3 mt-lg-5'>
            <Badge />
            <div className='fs-2 m-1 py-2 title-chart'>Overall Ticket Status</div>
          </div>

          <div className='chart-container mb-2'>

            <div className='card m-1 h-100 card-shape'>
              <CustomChart />

            </div>

          </div>
          <div className='accord-container '>
            <div className='card m-1 h-100 card-shape'>
              <div className='card-header'>
                <div className="row  text-secondary text-center">
                  <h6 className="col-3 fs-5">Status </h6>
                  <h6 className="col-4 fs-5 ps-0">Ticket ID</h6>
                  <h6 className="col-4 fs-5 ps-0 pe-lg-5 pe-md-5 pe-sm-5 pe-3">Summary</h6>
                </div>
              </div>
              <div className='card-body table-box-accord m-0 p-0'>
                <Table  data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading?<Loader/>:null}
    </div>
  );
}

export default Dashboard;
