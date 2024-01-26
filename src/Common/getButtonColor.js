export default function getColor(value){
    const val=value.toLowerCase();
    if(val==="open"){
        return "btn-success";
    }
    else if(val==="in progress"){
        return "btn-primary";
    }
    else if(val==="closed"){
        return "btn-danger";
    }
    else if(val==="on hold"){
        return "btn-warning";
    }
    else{
        return "btn-primary";
    }
}