import axios from 'axios';
import { BACKEND_URL } from './env';

function AxiosInterceptors(navigate) {
  const id=localStorage.getItem("id");
  const email=localStorage.getItem("email");

  const Ainstance = axios.create({
    baseURL: BACKEND_URL
  });

  Ainstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(email==="" ||id==="" || email===null ||id===null){
        if(error.response.status !== 400){
        navigate("/signin");
        }
      }
      if (error.code === "ERR_NETWORK") {
        navigate("/construct");
      } 
      
      return Promise.reject(error);
    }
  );
  return Ainstance;
}


export default AxiosInterceptors;
