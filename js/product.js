//variables Globales
var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
const cart = []

//Fonction qui permet de réccuperer l'id du produit
function displayId() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    fetch(`https://oc-p5-api.herokuapp.com/api/teddies/${id}`)
    .then (response => response.json())
    .then (singleNounours => {
        if(!singleNounours) {
            displayNone('Aucun Produit Correspondant')
            return
        }
        displayName(singleNounours)
    })
}

//fonction qui permet de créer le résumé du produit 
function displayName(singleNounours) {
    addSection(singleNounours.imageUrl, singleNounours.name, singleNounours.price, singleNounours.description)
    for (let colors of singleNounours.colors) {
        const eltOption = document.createElement('option')
        eltOption.textContent=colors
        eltOption.value=colors
        document.getElementById('colors').appendChild(eltOption)
    }
    //ajoute selecteur de quantiée
    createSelectorQuantity()
    btnAddCart()
}

//Ajout balise img avec lien url de l'image
function addPicture(parent, url) {
    let eltImg = document.createElement('img');
    eltImg.src = url;
    parent.appendChild(eltImg);
}

//Ajout de la balise H4 avec le nom du nounours
function addName(parent, txt) {
    let newPara = document.createElement('h3');
    newPara.id = "title_product"
    let contenu = document.createTextNode(txt);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//Ajout balise <p> avec du texte affichant le prix
function addPrice(parent, price) {
    let newParaPrice = document.createElement('p');
    let contenu = document.createTextNode(`Au prix de ${price/100} €`);
    parent.appendChild(newParaPrice);
    newParaPrice.appendChild(contenu);
}
//Ajout balise <p> avec texte descrptif du nounours
function addDescription(parent, description) {
    let newDescription = document.createElement('p');
    let contenu = document.createTextNode(description);
    parent.appendChild(newDescription);
    newDescription.appendChild(contenu);
}
//Ajout balise <form> dans html
function addForm(parent) {
    let form = document.createElement('form');
    let para = document.createElement('p');
    let contenu = document.createTextNode('Couleurs disponibles : ');
    let select = document.createElement('select');
    select.name = 'colors'
    select.id = 'colors'
    parent.appendChild(form);
    form.appendChild(para);
    form.appendChild(select);
    para.appendChild(contenu);
}
//Création balise html saisi quantité nounours
function createSelectorQuantity() {
    let div = document.getElementById('details')
    let label = document.createElement('label');
    label.for="quantity"
    let contenu = document.createTextNode('Quantité : ')
    let input = document.createElement('input')
    input.type= 'Number'
    input.id="quantity"
    input.name="nounours"
    input.min="0"
    input.max="100"
    div.appendChild(label);
    label.appendChild(contenu);
    label.appendChild(input)
}

//Fonction qui permet d'ajouter produit dans le panier
function addToCart() {

    //Variables
    let color = document.getElementById('colors').value
    let quantity = Number(document.getElementById('quantity').value)
    const product = {
        color : color,
        quantity : quantity,
        id : id,
    }
    let isPresent = false

    //boucle si couleur présente ajouter quantité, sinon ajouter produit
    for (const [index, item] of cart.entries()) {
        if (product.id === item.id && product.color === item.color) {
            cart[index].quantity += product.quantity
            console.log('la quantitée a été rajouté au panier')
            isPresent = true
        }
    }
        if (isPresent == false) {
            cart.push(product)
            console.log('La peluche a été ajouté au panier')
        }
    saveCart(cart)
}

//Fonction qui permet de sauvegarder cart dans le localstorage
function saveCart(cart) {
    localStorage.setItem(id, JSON.stringify(cart))
}

//Bouton, ajout au panier
function btnAddCart() {
    let div = document.getElementById('details')
    let contenu = document.createTextNode('Ajouter au panier')
    let btnAddCart = document.createElement('button');
    btnAddCart.type='submit'
    btnAddCart.addEventListener('click', addToCart)
    div.appendChild(btnAddCart);
    btnAddCart.appendChild(contenu);
}

//Fonction qui créé une <section> et regroupe les autres fonction créées auparavant
function addSection(url, txt, price, description) {
    let div = document.getElementById('content');
    let newSection = document.createElement('section');
    newSection.className = "product_detail";
    newSection.id = "details"
    div.appendChild(newSection);
    addPicture(newSection, url);
    addName(newSection, txt);
    addPrice(newSection, price);
    addDescription(newSection, description);
    addForm(newSection)
}