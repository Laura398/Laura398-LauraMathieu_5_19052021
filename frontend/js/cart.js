if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {

    let removeButtons = document.getElementsByClassName("remove-btn")
    for(let i = 0; i < removeButtons.length; i++) { /*Listen to click on remove item button*/
        let button = removeButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName("quantity")
    for(let i = 0; i < quantityInputs.length; i++) { /*Listening to input change for items in cart*/
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName("cart-btn")
    for(let i = 0; i < addToCartButtons.length; i++) { /*Listening to add to cart button on products page*/
        let addButton = addToCartButtons[i]
        addButton.addEventListener("click", addToCartClicked)
    }

    updateCartTotal() /*So the cart is always updated*/
}

function removeCartItem(event) { /*To remove the item when the button 'remove' is clicked*/
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()

    updateLocalStorage()
    updateCartTotal()
}

function quantityChanged(event) { /*change value in html when input value changes*/
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    
    updateCartTotal()
}

function updateCartTotal() { /*update cart total price*/
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("quantity")[0]
        
        let price = parseFloat(priceElement.innerText.replace("€", ""))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total")[0].innerText = total + ",00€"
    
    numberOfItemsInCart()
}

function numberOfItemsInCart(){ /*updates the number of items in the cart*/
    let array = document.getElementsByName('quantity');
    let totalQuantity = 0;
    for(let i=0;i<array.length;i++){
        if(parseInt(array[i].value))
            totalQuantity += parseInt(array[i].value);
    }

    if(totalQuantity == 0) {
        document.getElementById("items-in-cart").innerHTML = `Votre panier est vide.`
        localStorage.clear();
    } else if (totalQuantity == 1) {
        document.getElementById("items-in-cart").innerHTML = `Votre panier contient 1 produit.`
    } else {
    document.querySelectorAll(".nav-cart").innerhtml = `2`
        document.getElementById("items-in-cart").innerHTML = `Votre panier contient ${totalQuantity} produits.`
    }

    updateStorageQuantity()

}

function addToCartClicked(event) { /*saving in local storage when article is added to cart in products page*/
    let button = event.target
    let shopItem = button.parentElement.parentElement.parentElement
    let name = shopItem.getElementsByClassName("shop-item-name")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSource = shopItem.getElementsByClassName("card-img-top")[0].src
    let itemValue = shopItem.getElementsByClassName("item-quantity-value")[0].value
    let itemId = shopItem.getElementsByClassName("product-id")[0].innerText

    let e = document.getElementById("inlineFormCustomSelect")
    let chosenColor = e.options[e.selectedIndex].text

    let teddyAddedInCart = {
        nom: name,
        prix: price,
        image: imageSource,
        nombre: itemValue,
        couleur: chosenColor,
        id: itemId,
    }

    let readyToAdd = name + " " + chosenColor
    
    if (localStorage.getItem(readyToAdd) == null) { /*If item is not yet in local storage*/
        localStorage.setItem(readyToAdd, JSON.stringify(teddyAddedInCart)); /*add to local storage*/
    } else { /*if item already in local storage*/
        let storedItems = JSON.parse(localStorage.getItem(readyToAdd)); /*get local storage*/
        JSON.parse(localStorage.getItem(storedItems)); /*transform to be able to use in js*/
        let addItemValue = +storedItems["nombre"] + +itemValue /*update number of items*/
        let updatedTeddy = { /*update array for local storage*/
            nom: name,
            prix: price,
            image: imageSource,
            nombre: addItemValue,
            couleur: chosenColor,
            id: itemId,
        }
        localStorage.setItem(readyToAdd, JSON.stringify(updatedTeddy)); /*update local storage*/
    }

    if(itemValue == 1) {
        alert("L'article a été ajouté au panier.")
    } else {
        alert("Les articles ont été ajoutés au panier.")
    }
}



function displayCart() {

    for (let i = 0; i < localStorage.length; i++) { /*get les items depuis le local storage en fonction des keys*/
        let cartItems = JSON.parse((localStorage.getItem(localStorage.key(i))));
        JSON.parse(localStorage.getItem(cartItems));

        const templateCartRow = document.getElementById("templateCartRow") /*Select template in HTML doc*/
        const cloneCartRow = document.importNode(templateCartRow.content, true) /*Clone template*/

        cloneCartRow.getElementById("cart-img").innerHTML += `<img class="img-fluid w-100 cart-image" id="cart-img" src="${cartItems.image}" alt="Sample">` /*Change image*/
        cloneCartRow.getElementById("cart-name").textContent = cartItems.nom /*Change name*/
        cloneCartRow.getElementById("cart-color").textContent = cartItems.couleur /*Change color*/
        cloneCartRow.getElementById("cart-number").value = cartItems.nombre /*Change value*/
        cloneCartRow.getElementById("cart-price").textContent = cartItems.prix /*change price*/
        cloneCartRow.getElementById("cart-id").textContent = cartItems.id /*Change id*/

        document.getElementById("cart-rows").appendChild(cloneCartRow) /*Set clone to replace template (cards being templateCard's parent)*/
    }

}

function updateLocalStorage() { /*update local storage when item removed from cart*/
    let removeButtons = document.getElementsByClassName("remove-btn")
    
    for(let i = 0; i < removeButtons.length; i++) {
        
    let name = document.getElementsByClassName("cart-name")[i].innerText
    let price = document.getElementsByClassName("cart-price")[i].textContent
    let imageSource = document.getElementsByClassName("cart-image")[i].src
    let itemValue = document.getElementsByClassName("cart-number")[i].value
    let chosenColor = document.getElementsByClassName("cart-color")[i].textContent
    let itemId = document.getElementsByClassName("cart-id")[i].textContent

    let teddiesInCart = {
        nom: name,
        prix: price,
        image: imageSource,
        nombre: itemValue,
        couleur: chosenColor,
        id: itemId,
    }

    let readyToAdd = name + " " + chosenColor

    localStorage.clear();
    localStorage.setItem(readyToAdd, JSON.stringify(teddiesInCart)); /*add to local storage*/

    
}

}

function updateStorageQuantity() { /*update local storage when an item's quantity changes in cart*/
let quantityInputs = document.getElementsByClassName("quantity")
for(let i = 0; i < quantityInputs.length; i++) { /*Listening to input change for items in cart*/
    let name = document.getElementsByClassName("cart-name")[i].innerText
    let price = document.getElementsByClassName("cart-price")[i].textContent
    let imageSource = document.getElementsByClassName("cart-image")[i].src
    let itemValue = document.getElementsByClassName("cart-number")[i].value
    let chosenColor = document.getElementsByClassName("cart-color")[i].textContent
    let itemId = document.getElementsByClassName("cart-id")[i].textContent

    let teddiesInCart = {
        nom: name,
        prix: price,
        image: imageSource,
        nombre: itemValue,
        couleur: chosenColor,
        id: itemId,
    }

    let readyToAdd = name + " " + chosenColor

    localStorage.setItem(readyToAdd, JSON.stringify(teddiesInCart)); /*add to local storage*/

}}


displayCart()



let cartItemContainer = document.getElementsByClassName("cart-items")[0]
let cartRows = cartItemContainer.getElementsByClassName("cart-row")

let firstName = document.getElementById("validationDefault01").textContent
let lastName = document.getElementById("validationDefault02").textContent
let email = document.getElementById("validationDefaultMail").textContent
let address = document.getElementById("validationDefault03").textContent
let city = document.getElementById("validationDefault04").textContent
let zipCode = document.getElementById("validationDefault05").textContent


let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };

function confirmClicked() { /*saving in local storage when article is added to cart in products page*/

    if (document.getElementById("items-in-cart").innerHTML == `Votre panier est vide.`) { /*If item is not yet in local storage*/
        alert("Votre panier est vide !")
    } else { /*if item already in local storage*/
        completeOrder()
    }    
    
}

function myFunc(e){
    e.preventDefault();
    confirmClicked()
}


function completeOrder() {

    let total = document.getElementsByClassName("cart-total")[0].innerText

    let finalOrder = {};
    finalOrder.contact = contact;
    finalOrder.products = [];
    let joinedArrays = [];
    let valueArray = {};


    for (let i = 0; i < localStorage.length; i++) { /*get items from local storage depending on keys*/
            let cartRow = cartRows[i]
            let value = cartRow.getElementsByClassName("cart-number")[0].value

            let cartItems = JSON.parse((localStorage.getItem(localStorage.key(i))));
            JSON.parse(localStorage.getItem(cartItems));

            let integerValue = parseInt(value, 10); /*transforms value into a number*/
            valueArray = Array(integerValue).fill(cartItems.id) /*duplicate id depending on value*/
            joinedArrays.push(valueArray) /*1 array with an array for each id*/
        
    }

    finalOrder.products = [].concat.apply([], joinedArrays); /*merge all arrays inside joindedArrays*/

    /*POST*/

    teddiesUrl = "http://localhost:3000/api/teddies/order";

    let xhr = new XMLHttpRequest();

    xhr.open("POST", teddiesUrl, true);

    xhr.onload = function () {
    
        if (this.status == 201) {
        let order = JSON.parse(this.responseText);
        let successMsg = `<p class="text-center h5">Bonjour ${order.contact.firstName} ${order.contact.lastName},<br />
                            Votre commande numéro ${order.orderId} a bien été validée, pour un montant total de ${total}.<br />
                            Elle vous sera livrée dès que possible à l'adresse suivante :<br />
                            ${order.contact.address}<br />
                            ${zipCode} ${order.contact.city}<br />
                            Vous recevrez sous peu un mail de onfirmation à l'adresse ${order.contact.email}.<br />
                            Nous vous remercions pour votre confiance.</p>`
        
        localStorage.setItem("message", JSON.stringify(successMsg));
        } else {
        }
    };

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(finalOrder));

    location.replace("../frontend/confirmation.html")
}

console.log(localStorage)