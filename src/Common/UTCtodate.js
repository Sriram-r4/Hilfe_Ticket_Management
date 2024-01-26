export default function UTCtodate(utcDate){
    const dateObj = new Date(utcDate);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are zero-based
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');

  
    const customFormat = `${day}-${month}-${year} ${hours}:${minutes}`;
    return customFormat;
}