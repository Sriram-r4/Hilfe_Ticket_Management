import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosInterceptors from '../../Common/axios-config';



function useProduct(navigate, data) {

    const [prod, setProduct] = useState([]);
    const [length, setLength] = useState(prod.length);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        AxiosInterceptors(navigate).post("/view-products", data).then((res) => {
            setProduct(res.data);
            setLength(res.data.length);
            setLoading(false);
        });
        
    }, [loading]);

    function removeRow() {
        setProduct(prod);
    }
    const submit = () => {
        const value = document.getElementById('value');
        const file = document.getElementById("file");
        const val = value.value;
        const f = file.value;
        var count = 2;
        if (val === "") {
            alert("please enter product");
            count--;
        }
        if (f === "") {
            alert("please attach file");
            count--;
        }
        if (count === 2) {
            console.log(val, f);
            var d = {
                prodname: val,
                icon: f,
                user_id: data["user_id"]
            }
            setLoading(true);
            setLength(prod.length);
            AxiosInterceptors(navigate).post("/add-product",d).then(()=>{
                setLoading(false);
                
            }).catch((err)=>{
                setLoading(false);
                console.log(err)
            })
        }
    }

    function addProduct() {
        if (prod.length !== length+1) {
            var input = {
                key: prod.length + 1,
                prodname: <input type='text' name="value" id='value' className='form-control form-control-md fs-4' required />,
                icon: <input type='file' name='file' id='file' placeholder='choose file' required className='form-control-sm w-100'/>,
                icons: <div className="d-flex justify-content-center">
                    <button className=' btn btn-primary  fs-4' onClick={submit}>submit</button>
                    <button className='btn btn-primary mx-2 fs-4' onClick={removeRow}>x</button>
                </div>
            }
            setProduct([...prod, input]);
        }
    }
    return [prod,loading, addProduct,setProduct,setLoading]
}

export default useProduct;