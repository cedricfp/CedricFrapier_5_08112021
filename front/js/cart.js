//Récupération du panier
const cart = JSON.parse(localStorage.getItem("product"));

const cartHtml = document.getElementById("cart__items");

//Affichage des produit séléctionné dans le panier (dynamique)

function display(dataInCart){
    //Si vide affichage panier vide
    if (cart === nul || cart == 0){
        cartHtml.innerHTML = '<p>Votre panier est vide</p>';
    }
    //si non affichage des produits 
    else{
    for(let cart of dataInCart) {
        cartHtml.innerHTML += render(cart)
    }
    }
}

function render(cart){
    return `
    <article class="cart__item" data-id="${cart.id}" data-color="${cart.color}">
        <div class="cart__item__img">
            <img src="${cart.image}" alt="${cart.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${cart.name}</h2>
                <p>${cart.price} € </p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
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
