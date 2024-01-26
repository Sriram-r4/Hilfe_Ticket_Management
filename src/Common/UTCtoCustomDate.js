export default function convertUTCtoCustomFormat(utcDate) {
    const dateObj = new Date(utcDate);
    const currentDate = new Date();
    const pastDate = new Date(utcDate);
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - pastDate;
  
    // Calculate the time difference in hours and days
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (hoursAgo < 1) {
      return 'Just now';
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else if (hoursAgo < 48) {
      return `Yesterday ${hours}:${minutes}`;
    } else {
      return `${daysAgo} days ago`;
    }
  

  }