export default function getValuefromHTML(val){
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML=val;
    return tempDiv.textContent;
}