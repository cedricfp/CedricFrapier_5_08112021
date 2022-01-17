//Récupération du panier
const cart = JSON.parse(localStorage.getItem("products"));
const cartHtml = document.getElementById("cart__items");
let totalPrice = 0;
let totalQty = 0;
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
        fetch("http://localhost:3000/api/products/")
        .then((res) => res.json())
            .then((products) => 
            {
                let final = buildCompleteList(products, cart)
                final.forEach(product => 
                {
                    cartHtml.innerHTML += render(product);
                    totalPrice += product.price * parseInt(product.qty);
                    totalQty += parseInt(product.qty);  

                })

                final.forEach(product => 
                {
                    listenForProductQtyChange(product);
                })
            
                sumPrice.innerHTML = `${totalPrice}`
                sumQty.innerHTML = `${totalQty}`
                
            })
            
    
    
    }
}

function buildCompleteList(products, cart)
{
    let final = [];
    cart.forEach(itemsInCart => 
    {
        let product = products.find(item => item._id === itemsInCart.id)
        itemsInCart._id = product._id
        itemsInCart.name = product.name
        itemsInCart.imageUrl = product.imageUrl
        itemsInCart.price = product.price
        itemsInCart.description = product.description
        itemsInCart.altTxt = product.altTxt

        final.push(itemsInCart)
    })

    return final;
}

function listenForProductQtyChange(item)
{
    document.getElementById(`qty-${item._id}-${item.color}`).addEventListener('input', (e) => {
        let qty = e.target.value;

        let product = cart.find(product => {
            return product.id == item.id && product.color === item.color;
        })

        product.qty = parseInt(qty);

        localStorage.setItem("products", JSON.stringify(cart));

        location.reload();
    })
}

function listenForProductDelete(item)
{
    document.querySelector(".deleteItem").addEventListener('click', (e) => {
        
    })
}


function render(product){
    return`
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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
                    <p>${product.qty}</p>
                    <input type="number" class="itemQuantity" id="qty-${product._id}-${product.color}" name="itemQuantity" min="1" max="100" value="${product.qty}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}


