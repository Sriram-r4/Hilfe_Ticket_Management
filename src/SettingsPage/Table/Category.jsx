import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosInterceptors from '../../Common/axios-config';


function useCategory(navigate,data) {
    const [cat, setCategory] = useState([]);
    const [length, setLength] = useState(cat.length);
    const [loading1,setLoading1]=useState(true);

    useEffect(() => {
        AxiosInterceptors(navigate).post("/view-categories",data).then((res)=>{
            setCategory(res.data);
            setLength(res.data.length);
            setLoading1(false);
        });
    }, [loading1]);

  
    const submit = () => {
        const value = document.getElementById('value1');
        const val = value.value;
        var count = 1;
        if (val === "") {
            alert("please enter category");
            count--;
        }
       
        if (count === 1) {
            var d = {
                catname: val,
                user_id: data["user_id"]
            }
            setLoading1(true);
            setLength(cat.length);
            AxiosInterceptors(navigate).post("/add-categories",d).then(()=>{
                setLoading1(false);
                
            }).catch((err)=>{
                setLoading1(false);
                console.log(err)
            })
        }
    }

  

 

    function removeRow() {
        setCategory(cat);
    }
    
    function addCategory() {
        if (cat.length !== length + 1) {
            var input = {
                key: cat.length + 1,
                catname: <input type='text' id='value1' name='value1' className='form-control form-control-md fs-4' />,
                icons: <div className='d-flex justify-content-center'>
                    <button className=' btn btn-primary mx-2 fs-4 fs-sm-5' onClick={submit}>submit</button>
                    <button className='btn btn-primary mx-2  fs-4' onClick={removeRow}>x</button>
                </div>
            }
            setCategory([...cat, input]);

        }
    }
    return [cat,loading1, addCategory,setCategory,setLoading1]
}

export default useCategory;