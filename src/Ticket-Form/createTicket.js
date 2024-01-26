import AxiosInterceptors from "../Common/axios-config";


export default async function CreateTicket(t,c,s,p,c1,desc,id,time,uname,files,product,navigate){
   
    const data = {
        title: t,
        cc: c,
        type:product,
        subject: s,
        priority: p.toLowerCase(),
        category: c1,
        description: desc,
        user_id: parseInt(id),
        estimated_completion_time: time,
        assignee: uname,
        status: "Open",
        attach:files
    }

    await AxiosInterceptors(navigate).post("/create-ticket",data).then((res)=>{
        alert(res.data.message);
        navigate("/tlist");
       }).catch((err)=>console.log(err)); 
}