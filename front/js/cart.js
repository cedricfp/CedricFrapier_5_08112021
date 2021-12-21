//Récupération du panier
const cart = JSON.parse(localStorage.getItem("products"));
console.log(cart);
const cartHtml = document.getElementById("cart__items");
var totalPrice = 0;
var totalQty = 0;
const sumPrice = document.getElementById("totalPrice");
const sumQty = document.getElementById("totalQuantity");

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
            fetch("http://localhost:3000/api/products/" + localproduct.id)
            .then((res) => res.json())
            .then((product) => {
                cartHtml.innerHTML += render(product, localproduct.color, localproduct.qty);
                totalPrice += product.price * parseInt(localproduct.qty);
                totalQty += parseInt(localproduct.qty);
                
                sumPrice.innerHTML = `${totalPrice}`
                sumQty.innerHTML = `${totalQty}`
                
            })
            
        }
    
    }
}


function render(product, color, qty){
    return`
    <article class="cart__item" data-id="${product.id}" data-color="${color}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.price} € </p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>${qty}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}


