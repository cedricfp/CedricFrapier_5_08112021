//Requete de l'API avec statut compris entre 200 et 299 au format json

fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((items) => {
    display(items);
})

// Affichage d'une alerte si les produits ne s'affiche pas 
.catch(function(err){
    alert ("chargement impossible");
    console.log(err);
});
// Création de la boucle pour affichage dynamique
function display(data){
    for (let product of data){
        document.getElementById("items").innerHTML += render(product)
    }
}

//Récupération de chaque produit de facon dynamique
function render(product){
    return `
    <a href=./product.html?id=${product._id}>
        <article>
        <img src=${product.imageUrl} alt="${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}.</p>
        </article>
    </a>
    `;
}
