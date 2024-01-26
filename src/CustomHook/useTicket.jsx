import { useEffect, useState } from "react";
import AxiosInterceptors from "../Common/axios-config";
import { useNavigate } from "react-router-dom";


function useTicket() {
    const [oticket,setOticket]=useState("");
    const [dtticket,setDtticket]=useState("");
    const [ohticket,setOhticket]=useState("");
    const [odticket,setOdticket]=useState("");
    const [uaticket,setUaticket]=useState("");
    const [loading,setLoading]=useState(true);
    const id=localStorage.getItem("id");
    const navigate=useNavigate();
    const data={  
        user_id:id
    }
    useEffect(()=>{
        AxiosInterceptors(navigate).post("/admin-dash",data).then((res)=>{
        setOticket(res.data["open_tickets"]);
        setDtticket(res.data["due_today_tickets"]);
        setOhticket(res.data["on_hold_tickets"]);
        setOdticket(res.data["overdue_tickets"]);
        setUaticket(res.data["unassigned_tickets"]);
        var tickets={
            open_tickets: res.data["open_tickets"],
            due_today_tickets: res.data["due_today_tickets"],
            on_hold_tickets:res.data["on_hold_tickets"],
            overdue_tickets: res.data["overdue_tickets"],
            unassigned_tickets: res.data["unassigned_tickets"]
        }
        localStorage.setItem("tickets",JSON.stringify(tickets));
        setLoading(false);
        }).catch((res)=>{
            console.log(res);
            setLoading(false);
        })
        
    },[loading])

  return [oticket,dtticket,ohticket,odticket,uaticket,loading]
}

export default useTicket