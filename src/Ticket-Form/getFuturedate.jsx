
function getFuturedate(d,m,y) {
    const date = new Date(y, m,d + 10 , 0, 0, 0); 
   
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    
    return isoString;
}

export default getFuturedate