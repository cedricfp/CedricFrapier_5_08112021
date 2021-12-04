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
    //Ecouter le bouton "ajouter" au produit et selection de ce dernier au clic
    document.getElementById("addToCart").addEventListener("click", function (event) {
    event.preventDefault();
    
    //Importation de tous les elements de l'article au clic ()
    let newItems = {
        id : idProduit,
        name : document.getElementById("title").innerHTML,
        price : document.getElementById("price").innerHTML,
        image : document.querySelector(".item__img img").getAttribute("src"),
        altTxt : document.querySelector(".item__img img").getAttribute("alt"),
        color : document.getElementById("colors").value,
        quantity : document.getElementById("quantity").value
     };   
     console.log(newItems);

    
    //déclaration de la variable dans laquelle on mettra les keys et les values du local storage
    //Utilisation de JSON.parse pour récupérer les données actuellement en json dans le local storage en données javascript
    let itemsStorage = JSON.parse(localStorage.getItem("product"));

    //Ajout des données dans le tableau avec push
    //convertion des données javascript en json avec json.stringify pour le local storage
    const addStorage = function () {
        itemsStorage.push(optionItems);
        localStorage.setItem("product", JSON.stringify(itemsStorage));
    };
    //Si il y a des objet dans le local storage
    if(itemsStorage){
    
        
    }

    //Si il n'y a pas de produit dans le local storage
    //Création d'un tableau comportant les données du produit seléctionné
    else{
        itemsStorage = [];
        addStorage ();
    }
    
    });
        
    
        
      
    