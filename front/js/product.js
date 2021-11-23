//Récupération de l'URL de chaque produit individuellement

let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");

//Récupération du canapé correspondant à l'URL en json
fetch("http://localhost:3000/api/products/" + idProduit)
    .then(function (res){
       if (res.ok){
           return res.json();
       }
    })
    
    //Insertion dans le code HTML de chaque canapé par rapport a son url
    .then(function (kanapItem){
        console.log(kanapItem);
        document.querySelector(".item__img").innerHTML = `<img src="${kanapItem.imageUrl}" alt="${kanapItem.altTxt}"></img>`
        document.getElementById("title").innerHTML = kanapItem.name;
        document.getElementById("price").innerHTML = kanapItem.price;
        document.getElementById("description").innerHTML = kanapItem.description;
        //boucle for pour allé chercher dans l'API toutes les couleurs disponible
        for (let color of kanapItem.colors) {
            document.getElementById("colors").innerHTML += `<option value=${color}>${color}</option>`
        }
    })
    
    const addToCart = document.getElementById("addToCart");
    addToCart.addEventListener('click', function(event){
        event.preventDefault();
    })



