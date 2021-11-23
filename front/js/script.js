//Requete de l'API avec statut compris entre 200 et 299 au format json

fetch("http://localhost:3000/api/products")
    .then(function(res){
        if (res.ok){
            
            return res.json();
            
        }
    })

// Transformation du langage json en langage javascript pour recuperation des produits

.then(function(kanapList){
    console.log(kanapList);
    //boucle for pour affichage dynamique de tout les canapés
    for(let kanapDisplay of kanapList) {
        document.getElementById("items").innerHTML +=
        `
        <a href=./product.html?id=${kanapDisplay._id}>
            <article>
            <img src=${kanapDisplay.imageUrl} alt="${kanapDisplay.altTxt}>
            <h3 class="productName">${kanapDisplay.name}</h3>
            <p class="productDescription">${kanapDisplay.description}.</p>
            </article>
        </a>
        `;
    }
})
.catch(function(err){
    alert("chargement impossible");
    console.log(err);
});