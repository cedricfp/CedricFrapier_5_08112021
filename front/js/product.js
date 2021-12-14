const id = getDataFromUrl ("id");

//Récupération du canapé correspondant à l'URL en json
fetch("http://localhost:3000/api/products" + id) 
.then((res) => res.json())
.then (() => display(product))

//Affichage du produit sur la page en fonction du code html
function display(product){
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    //boucle for pour allé chercher dans l'API toutes les couleurs disponible
    for (let color of product.colors) {
            document.getElementById("colors").innerHTML += `<option value=${color}>${color}</option>`
    }  
}  
//Récuperation de l'id de chaque produit individuellement
function getDataFromUrl(key){
    let params = new URLSearchParams(document.location.search);
    return params.get(key);
    
} 


//Importation de tous les elements de l'article au clic ()
function listenForCartAddition(product){
    //Ecouter le bouton "ajouter" au produit et selection de ce dernier au clic
    document.getElementById("addToCart").addEventListener("click", function (event) {
        event.preventDefault();
        // création des variables de qantité et de couleur
        let qty = document.getElementById("quantity").value;
        let color = document.getElementById("colors").value;
        //création des messages d'alerte pour l'utilisateur
        if (qty < 1){
            alert("veuillez séléctionner une quantité");
            return;
        }
        if (color.lenght < 2){
            alert("veuillez séléctionner une couleur");
            return;
        }
        let existInLocalStorage = !!localStorage.getItem("product");

        if (existInLocalStorage){
            let items = JSON.parse(localStorage.getItem("product"));

            let product = items.find(product =>{
                return product.id === id && product.color === color;
            })

            if (!!product)
            {
                product.qty = Number(product.qty) + Number(qty)
                localStorage.setItem("product", JSON.stringify(items));
            }
            else{
                let newItem = {
                    id: id,
                    color: color,
                    qty: qty
                };

                items.push(newItem)
                localStorage.setItem("product", JSON.stringify(items));
            }
                
        }

        else {
            let items = [];

            let newItem = {
                id: id,
                color: color,
                qty: qty
            };

            items.push(newItem)
            localStorage.setItem("product", JSON.stringify(items)); 
        }
    })
} 
 
    