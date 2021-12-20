//Récupération du panier
const cart = JSON.parse(localStorage.getItem("products"));
console.log(cart);
const cartHtml = document.getElementById("cart__items");

//Affichage des produit séléctionné dans le panier (dynamique)
fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
.then((itemsInCart) => {
    display(itemsInCart)
    
})

function display(){
    
    //Si vide affichage panier vide
    if (cart === null || cart === 0){
        cartHtml.innerHTML = '<p>Votre panier est vide</p>';
    }
    //si non affichage des produits 
    else{
    //affichage des produits qui sont dans le local storage
        for (let localproduct of cart){
            fetch("http://localhost:3000/api/products/" + localproduit.id)
            .then((res) => res.json())
            .then((localproduct) => {
                localproduct = 
            }
            cartHtml.innerHTML += render(localproduct)
        }
    
    }
}


function render(product){
    return`
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${product.image}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.price} € </p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>${product.quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}

//Affichage du total
function total(){
    //je récupère les quantités
    let itemQtty = document.querySelector(".totalQuantity");
    //variable pour la quantité total
    let pdtLength = itemQtty.length;
    let totalqtty = 0;
    let totalPrice = 0;

    //Boucle pour total qtty
    for (var i = 0; i < pdtLength; i++){
        totalqtty += itemQtty[i].valueAsNumber;
    };
    //Boucle pour total prix
    for (var i = 0; i < pdtLength; i++){
        totalPrice += (itemQtty[i].valueAsNumber * cart[i].price);
    };

    //Je transmet la valeur obtenu a mon html
    let qttydisplay = document.getElementById("totalQuantity");
    qttydisplay.innerHTML = totalqtty;

    //

}
