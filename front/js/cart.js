//Récupération du panier
let itemsStorage = JSON.parse(localStorage.getItem("product"));


//Affichage des produit séléctionné dans le panier (dynamique)


for(let cartKanape of itemsStorage) {
    document.getElementById("cart__items").innerHTML +=
    `<article class="cart__item" data-id="${cartKanape.id}" data-color="${cartKanape.color}">
        <div class="cart__item__img">
            <img src="${cartKanape.image}" alt="${cartKanape.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${cartKanape.name}</h2>
                <p>${cartKanape.price} € </p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartKanape.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
    console.log(cartKanape);
}


document.querySelectorAll(".deleteItem").forEach(element => {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        cartKanape.splice(1); 
    });  
    
});
    
//let calculqty {
    //let totalqty = 0;
    //kanapInItemsStorage();
        //document.getElementById("totalQuantity"),
        //totalqty += parseInt(cartKanape.quantity),
        //console.log(calculqty);
    
//}

