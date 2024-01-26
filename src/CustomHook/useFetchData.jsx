import { useEffect,useState } from 'react';
import AxiosInterceptors from '../Common/axios-config';

function useFetchData(navigate) {
    const [uname, setUname] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phno, setphno] = useState("");
    const [company, setCompany] = useState("");
    const [desg, setDesg] = useState("");
    const email = localStorage.getItem("email")
    const [loading,setLoading]=useState(true);
    const data = {
        email: email
    }
    useEffect(() => {
        AxiosInterceptors(navigate).post("/users/", data).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((res) => {
            alert(res.message);
            setLoading(false);
        })

    }, [loading])
    function setData(data){
        setUname(data.username);
        setFname(data.firstname);
        setLname(data.lastname);
        setphno(data.phoneno);
        setCompany(data.company);
        setDesg(data.designation);
        localStorage.setItem("uname", data.username);
        localStorage.setItem("fname", data.firstname);
        localStorage.setItem("lname", data.lastname);
        localStorage.setItem("phno", data.phoneno);
        localStorage.setItem("company", data.company);
        localStorage.setItem("desg", data.designation);
    }
    function FetchData(uname, fname, lname, email, ph, com, desg) {
        var data = {
            username: uname,
            firstname: fname,
            lastname: lname,
            email: email,
            phoneno: ph,
            company: com,
            designation: desg
        }
       
        AxiosInterceptors(navigate).put("/users/", data).then((res) => {
            alert(res.data.message);
            setData(data);
            setLoading(false);
        }).catch((err) => {
            if(err.response.status===400){
                alert("Can't update with a blank field,Please recheck");
                setLoading(true);
            }
        })

        
    }
    return [uname, fname, lname, email, phno, company, desg,loading, FetchData,setData];
}

export default useFetchData