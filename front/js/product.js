let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");

fetch("http://localhost:3000/api/products" + idProduit)
    .then((res) => res.json())
    .then((data) => (itemsData = data));

    console.log(itemsData);
    



//