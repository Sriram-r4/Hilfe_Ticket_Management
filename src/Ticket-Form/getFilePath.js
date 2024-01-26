import AxiosInterceptors from "../Common/axios-config";

export default function getfilePath(selectedFile,navigate){
    const formData = new FormData();
    if(selectedFile!==null){
    formData.append('file', selectedFile[0]);
 
  const config={
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    var files=[];
    AxiosInterceptors(navigate).post("/upload-file", formData, config).then((res)=>{
     const attach=res.data["file_path"];
     files.push(attach)
    }).catch((err)=>console.log(err));
    return files;
  }
  return null;
}