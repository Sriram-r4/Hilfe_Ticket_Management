import { useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import './Header.css';

function Header() {
    const navigate=useNavigate();
    function logout(){
        const user=localStorage.getItem("type");
        if(user!==null){
            localStorage.removeItem("type")
            
        }
        navigate("/signin")
    }
    return (
        <div className='head'>
            <div className='custom-elements '>
                <span className='search-input'>
                    <input type='search' placeholder='Search' className=" search fs-4  " />
                    <a href='#' className='text-decoration-none'><i className="bi bi-search fs-3  mx-1 search-icon"></i></a></span>
                <div className="dropdown ">
                    <button className="drop bg-white dropdown-toggle px-2 fs-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" >
                        <span className='text-black fs-4'> All </span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Actions</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div className='profile-box   my-2'>
                <div className='icon-circle mx-1 mx-lg-4 p-1'>
                    <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true">
                        <i className="bi bi-bell  fs-2 " ></i>
                    </div>
                    <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <p className='text-account m-0'>Hi, Laura Jane</p>
                <div className='icon-circle ms-lg-4 ms-1 me-3'>
                    <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true">
                        <img src={profile} alt='profile' className='profile-icon  fs-2' />
                    </div>
                    <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item" onClick={()=>logout()}>Logout</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header;