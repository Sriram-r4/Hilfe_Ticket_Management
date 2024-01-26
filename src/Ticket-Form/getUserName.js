import AxiosInterceptors from "../Common/axios-config";

export const getUsername=async(email,navigate) =>{
    var username="someone";
    try{
    const res=await AxiosInterceptors(navigate).post("/users/", { "email": email });
    const user=res.data;
    username=user.username;
    }
    catch(err){
        return "someone"
    }
    return username;
}