import menu from '../../assets/svg/menuicon.svg';
import logo from '../../assets/whitelogo.png';
import './Navigation.css';
import dashboard from '../../assets/svg/homeicon.svg';
import account from '../../assets/svg/accounticon.svg';
import tickets from '../../assets/svg/ticketicon.svg';
import settings from '../../assets/svg/settingsicon.svg';
import logouticon from '../../assets/svg/logouticon.svg';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStyle from '../../CustomHook/useStyle';
import logout from '../clear';


function Navigation(props) {
  const [bool, setBool] = useState(true);
  const [navClass, setNavClass] = useState("items-defaults");
  const [style, style1] = useStyle();
  var linkStyle = { textDecoration: 'none' }
  const user = localStorage.getItem("role");
  const data1 = useRef();
  const data2 = useRef();
  const data3 = useRef();
  const data4 = useRef();
  const data5 = useRef();
  const data6 = useRef();
  const navigate = useNavigate();
  
  function navDash() {
    if (user === "admin") {
      navigate("/dashboard");
    }
    else {
      navigate("/usrdash")
    }
  }
  const toggle = () => {
    if (bool) {
     style1({
        display: "none"
      });
      setNavClass("custom-items1");
      setBool(false);
      props.toggle(!bool);
    }
    else {
     style1({
        display: "inline"
      });

      setNavClass("custom-items");
      setBool(true);
      props.toggle(!bool);
    }
  }
  return (
    <div className='nav-box'>
      <div className={navClass} >
        <div onClick={() => toggle()}  >
          <div className=" ham-link-container" >
            <img src={logo} ref={data1} alt='logo' className='icon-logo mx-2  custom-data ' style={style} />
            <img src={menu} alt='menu' className=' icons  fs-1 ms-auto' />
          </div>
        </div>
        <div className='nav-link-cont'>
          <div className='link-container' onClick={() => navDash()}>
            <img src={dashboard} alt='dashboard' className='icons' />
            <h4 ref={data2} className=' text text-white fs-4  mx-2  custom-data mb-0' style={style}>Dashboard</h4>
          </div>

          <Link to="/profile" style={linkStyle}>
            <div className='link-container '>
              <img src={account} alt='profile' className='d-sm-inline icons' />
              <h4 ref={data3} className='text text-white fs-4 mx-2  custom-data mb-0' style={style}>Account</h4>
            </div>
          </Link>

          <Link to="/tlist" style={linkStyle}>
            <div className='link-container '>
              <img src={tickets} alt='tickets' className='d-sm-inline icons' />
              <h4 ref={data4} className='text text-white fs-4 mx-2  custom-data mb-0' style={style}>Tickets</h4>
            </div>
          </Link>

          {user==="admin" ? <Link to="/settings" style={linkStyle}>
            <div className='link-container '>
              <img src={settings} alt='settings' className='d-sm-inline icons' />
              <h4 ref={data5} className='text text-white fs-4 mx-2  custom-data mb-0' style={style}>Settings</h4>
            </div>
          </Link>:<div></div>}

          <div className='link-container' onClick={()=>logout(navigate)}>
            <img src={logouticon} alt='logout' className='d-sm-inline icons' />
            <h4 ref={data6} className='text text-white fs-4 mx-2  custom-data mb-0' style={style}>Logout</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;