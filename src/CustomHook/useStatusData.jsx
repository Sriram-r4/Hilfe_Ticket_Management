import Capitalize from "../Common/CapitalConverter";
import convertUTCtoCustomFormat from "../Common/UTCtoCustomDate";
import UTCtodate from "../Common/UTCtodate";
import {data} from "../TicketStatus/component/dataDict";
import { data1 } from "../TicketStatus/component/dataDict1";
import { data2 } from "../TicketStatus/component/dataDict2";
import { data4 } from "../TicketStatus/component/dataDict4.js";
import { useState } from 'react'

function useStatusData() {
  const [title,setTitle]=useState("");
  const [subject,setSubject]=useState("");
  const [details,setDetails]=useState(data);
  const [desc,setDesc]=useState("");
  const [status,setStatus]=useState("");
  const [assign,setAssign]=useState(data1);
  const [date,setDate]=useState(data2);
  const[comment,setComment]=useState([]);
  const [attach,setAttach]=useState([]);
  const[history,setHistory]=useState(data4);
 
  function setData(info,hist,comments){
   setTitle(Capitalize(info.title));
   setSubject(Capitalize(info.subject))
   setDesc(Capitalize(info.description))
   setStatus(Capitalize(info.status))
   var detail=data;
   detail[0].value=info.type;
   detail[1].value=Capitalize(info.priority);
   detail[2].value=info.category;
   detail[3].value=info.labels;
   detail[4].value=info.resolution;
   setDetails(detail);
   var assignee=data1;
   assignee[0].value=Capitalize(info.assignee);
   assignee[1].value=UTCtodate(info["estimated_completion_time"]);
   setAssign(assignee);
   var Ddate=data2;
   Ddate[0].value=convertUTCtoCustomFormat(info["created"]);
   Ddate[1].value=convertUTCtoCustomFormat(info["updated"]);  
   setDate(Ddate);
   setAttach(info["attach"])
   setHistory(hist);
   setComment(comments);
  }

  return [title,subject,details,desc,status,assign,date,attach,comment,history,setData];
}

export default useStatusData