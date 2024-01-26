import profile from '../../assets/profile.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Capitalize from '../CapitalConverter';
import logout from '../clear';

function Header() {
     const navigate=useNavigate();
     const fname=localStorage.getItem("fname");
     const lname=localStorage.getItem("lname");
     var user;
     if (fname === null||lname==null) {
         user="Anonymous User";
     }else{
         user=Capitalize(fname)+" "+Capitalize(lname);
     }
    
    return (
        <div className='head2'>
           <div className='profile-box py-2'>
                <p className='text-account m-0 mx-4'>Hi, {user}</p>
                <div className='icon-circle ms-lg-4 ms-1 me-3'>
                    <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true">
                        <img src={profile} alt='profile-image' className='profile-icon  fs-2' />
                    </div>
                    <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                    <div className="dropdown-item fs-4" onClick={()=>logout(navigate)}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;