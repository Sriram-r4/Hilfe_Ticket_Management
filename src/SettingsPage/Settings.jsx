import React, { useMemo, useRef } from 'react';
import './Settings.css';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import { useNavToggle } from '../CustomHook/useNavToggle';
import useProduct from './Table/Product';
import useCategory from './Table/Category';
import { useNavigate } from 'react-router-dom';
import { Sorting } from '../TicketList/component/Sorting';
import { getColumns } from './Table/columns';
import SettingsTable from './Table/SettingsTable';
import { getColumns1 } from './Table/columns1';
import Loader from '../Common/util/Loader';


function Settings() {
    const [style, style1, style2, setToggle] = useNavToggle();
    const navigate=useNavigate();
    const id=localStorage.getItem("id");
    var data={user_id:id}
    const [prod,loading,addProduct,setProduct,setLoading]=useProduct(navigate,data);
    const [cat,loading1,addCategory,setCategory,setLoading1]=useCategory(navigate,data);
    const sortIdRef = useRef(0);
    const columns = useMemo(() => {
        return getColumns(setLoading,navigate)
    }, []);
    const columns1 = useMemo(() => {
        return getColumns1(setLoading1,navigate)
    }, []);


    const handleSort = (sortBy, data,type) => {
        const sorted = Sorting(sortIdRef, sortBy, data);
        if (type === "product") {
            setProduct(sorted);
        }
        else{
            setCategory(sorted);
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
                    <div className='product-container'>
                        <div className='table-container'>
                        <p className='fs-2  mt-3'>Your Products </p>
                            <div className='d-flex justify-content-end'>
                                <button type='button' className='btn-lg ticket-type form-submit  text  text-white  btntext' onClick={addProduct}>Add Product</button>
                            </div>
                            <SettingsTable data={prod} columns={columns} onSort={handleSort} type="product"/>
                        </div>
                    </div>

                    <div className='product-container'>
                        
                        <div className='table-container'>
                        <p className='fs-2 mt-3'>Your Category </p>
                            <div className='d-flex justify-content-end'>
                                <button type='button' className='btn-lg ticket-type form-submit  text  text-white  btntext ' onClick={addCategory}>Add Category</button>
                            </div>
                            <SettingsTable data={cat} columns={columns1} onSort={handleSort} type="category"/>
                        </div>
                    </div>
                </div>
            </div>
            {(loading||loading1)?<Loader></Loader>:null}
          </div>
    )
}

export default Settings;