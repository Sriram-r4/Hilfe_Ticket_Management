export default function getFilenameFromUrl(url) {
    const parts = url.split('\\');
    const lastPart = parts[parts.length - 1];
  
    if (lastPart.trim() !== '') {
      return lastPart;
    }
  
    const secondToLastPart = parts[parts.length - 2];
  
    return secondToLastPart;
  }