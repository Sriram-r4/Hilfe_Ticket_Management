import { useEffect, useState } from "react";
import AxiosInterceptors from "../Common/axios-config";
import { useNavigate } from "react-router-dom";


function useUserTicket() {
    const [Tticket,setTticket]=useState("");
    const [Atticket,setAticket]=useState("");
    const [Cticket,setCticket]=useState("");
    const navigate=useNavigate();

    const id=localStorage.getItem("id");
    const data={  
        user_id:id
    }
    useEffect(()=>{
        AxiosInterceptors(navigate).post("/user-dash",data).then((res)=>{
        setTticket(res.data["total_tickets"]);
        setAticket(res.data["active_tickets"]);
        setCticket(res.data["closed_tickets"]);
       
        var tickets={
            total_tickets: res.data["total_tickets"],
            active_tickets: res.data["active_tickets"],
            closed_tickets: res.data["closed_tickets"]
        }
        localStorage.setItem("tickets",JSON.stringify(tickets));
        }).catch((res)=>{
            console.log(res)
        })
        
    },[])

  return [Tticket,Atticket,Cticket];
}

export default useUserTicket