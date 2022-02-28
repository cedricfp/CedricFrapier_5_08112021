//déclaration des constantes necessaire 
const cart = JSON.parse(localStorage.getItem("products"));
const cartHtml = document.getElementById("cart__items");
const sumPrice = document.getElementById("totalPrice");
const sumQty = document.getElementById("totalQuantity");

//Affichage des produit séléctionné dans le panier (dynamique)
fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
.then((itemsInCart) => {
    display(itemsInCart)
    
})

//fonction pour l'affichage du panier (local storage)
function display(){
    
    //Si vide affichage panier vide
    if (cart === null || cart === 0){
        cartHtml.innerHTML = '<p>Votre panier est vide</p>';
    }
    //si non affichage des produits 
    else{
        cartHtml.innerHTML = '';
    //affichage des produits qui sont dans le local storage
        fetch("http://localhost:3000/api/products/")
        .then((res) => res.json())
            .then((products) => 
            {   //Appel des fonctions définis 
                let final = buildCompleteList(products, cart)
                let totalPrice = 0;
                let totalQty =0;
                final.forEach(product => 
                {
                    cartHtml.innerHTML += render(product);
                    totalPrice += product.price * parseInt(product.qty);
                    totalQty += parseInt(product.qty);
                    listenForProductQtyChange(product);
                    listenForProductDelete(product);

                })

            
                sumPrice.innerHTML = `${totalPrice}`
                sumQty.innerHTML = `${totalQty}`
                
            })
            
    
    
    }
}
//fonction pour attribuer toutes les infos du produits qui étaient reduites dans le local storage
function buildCompleteList(products, cart)
{
    const final = [];
    cart.forEach(itemsInCart => 
    {
        let product = products.find(item => item._id === itemsInCart.id);
        final.push({...itemsInCart, ...product});
    })
    return final;
}
// fonction pour modifier la quantité d'item
function listenForProductQtyChange(item)
{
    // selection de larticle grace a son id et sa couleur
    document.getElementById(`qty-${item._id}-${item.color}`).addEventListener('change', (e) => {
        console.log("event", e)
        let qty = e.target.value;

        //le trouver dans le local storage ( const cart)
        let product = cart.find(product => {
            return product.id == item.id && product.color === item.color;
        })

        // transformation de la donnée en nombre
        product.qty = parseInt(qty);

        // transformation de la donnée en JS
        localStorage.setItem("products", JSON.stringify(cart));

        // re afficher display pour "raffraichir la qté"
        display();
    })
}
// fonction pour supprimer un article du panier
function listenForProductDelete(item)
{
    // selection de larticle grace a son id et sa couleur
    document.getElementById(`deleteItem-${item._id}-${item.color}`).addEventListener('click', (e) => {
        console.log(item._id)

        
        const index = cart.findIndex(product =>{
            return product.id === item.id && product.color === item.color;
        })

        //Si index est superieur ou égale a 0 alors le supprimer
        if (index >= 0) {
            cart.splice(index, 1)
            localStorage.setItem("products", JSON.stringify(cart));
        } 
        display();
         
    })
}

//fonction pour afficher les produit dans le html
function render(product){
    console.log(product);
    return`
    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>${product.price} € </p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>${product.qty}</p>
                    <input type="number" class="itemQuantity" id="qty-${product._id}-${product.color}" name="itemQuantity" min="1" max="100" value="${product.qty}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p id="deleteItem-${product._id}-${product.color}">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}

// Définition des constantes avec les regex pour le formulaire
/**
 *  @type  {HTMLInputElement}  firstName
 */
const nameRegExp = new RegExp("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$");
const addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
const mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

// Fonctions des différents champs. Si cela ne correspond pas au RegExp ou que le champ est vide, le message d'erreur s'affiche en perdant le focus.
const checkName = (input) => {
    if (!nameRegExp.test(input.value) || input.value === "") {
        input.nextElementSibling.innerText = 'Merci de renseigner des informations valides';
        input.style.border = "solid red 1px";
        input.isValid = false;
    }
    else{
    input.nextElementSibling.innerText = '';
    input.style.border = 'none';
    input.isValid = true;
}
return input.isValid;
}

const checkAdress = (input) => {
    console.log(input.value, !addressRegExp.test(input.value) )
    if (!addressRegExp.test(input.value) || input.value === "") {
        input.nextElementSibling.innerText = 'Merci de renseigner une adresse valide';
        input.style.border = "solid red 1px";
        input.isValid = false;
        console.log("phrase: "+ input.value);
    }
    else{
    input.nextElementSibling.innerText = '';
    input.style.border = 'none';
    input.isValid = true;
}
return input.isValid;
}

const checkMail = (input) => {
    if (!mailRegExp.test(input.value) || input.value === "") {
        input.nextElementSibling.innerText = 'Merci de renseigner une adresse mail valide';
        input.style.border = "solid red 1px";
        input.isValid = false;
    }
    else{
    input.nextElementSibling.innerText = '';
    input.style.border = 'none';
    input.isValid = true;
}
return input.isValid;
}
// fonction pour la mise en place des regles pour chaque ligne du formulaire
function validInputName(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach( input =>{
        console.log(input);
        switch (input.id){
            case "firstName":
            case "lastName":
            case "city" : 
                input.onchange = () => checkName(input);
                break;
            case "address":
                input.onchange = () => checkAdress(input);
                break;
            case "email":
                input.onchange = () => checkMail(input);
                break;
            default : break;
            
        }
    })
}
validInputName();

function sendOrder(event) {
    event.preventDefault();
    event.stopPropagation();

    let valid = 0;
    const inputs = document.querySelectorAll("input");
    inputs.forEach( input =>{
        if (input.isValid) valid++;
    });
    console.log(valid);
    console.log("moi " + inputs.length);
    if (valid !== 5) return; 
    //recupérer les infos du DOM + cart

    const products = [];
    cart.forEach(product => {
        products.push(product.id);
    });

    const order = {
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products : products
    }
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(res => res.json())
        .then(data => document.location.href = "confirmation.html?id=" + data.orderId);
}
document.getElementById("order").addEventListener("click", sendOrder);