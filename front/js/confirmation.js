const id = getDataFromUrl ("id");

function getDataFromUrl(key){
    let params = new URLSearchParams(document.location.search);
    return params.get(key);
    
} 

document.getElementById("orderId").innerHTML = id;