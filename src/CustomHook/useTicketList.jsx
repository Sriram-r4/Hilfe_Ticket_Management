import  { useState } from 'react';
import AxiosInterceptors from '../Common/axios-config';
import { useEffect } from 'react';

function useTicketList(id,navigate,sortId) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = '/get-alltickets';
    const reqdata = { user_id: id };

   useEffect(()=>{
    AxiosInterceptors(navigate).post(url, reqdata).then(res => {
        setLoading(false);
        setData(res.data);
    })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
   },[id,sortId])
    function setData1(d){
        setData(d);
    }
    return [loading, data,setData1];
}

export default useTicketList