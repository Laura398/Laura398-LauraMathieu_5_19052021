if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {

    var removeButtons = document.getElementsByClassName("remove-btn")
    for(var i = 0; i < removeButtons.length; i++) { /*Listen to click on remove item button*/
        var button = removeButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("quantity")
    for(var i = 0; i < quantityInputs.length; i++) { /*Listening to input change for items in cart*/
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("cart-btn")
    for(var i = 0; i < addToCartButtons.length; i++) { /*Listening to add to cart button on products page*/
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }

    updateCartTotal() /*So the cart is always updated*/
}

function removeCartItem(event) { /*To remove the item when the button 'remove' is clicked*/
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()

    updateLocalStorage()
    updateCartTotal()
}

function quantityChanged(event) { /*change value in html when input value changes*/
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    
    updateCartTotal()
}

function updateCartTotal() { /*update cart total price*/
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("quantity")[0]
        
        var price = parseFloat(priceElement.innerText.replace("€", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total")[0].innerText = total + ",00€"
    
    numberOfItemsInCart()
}

function numberOfItemsInCart(){ /*updates the number of items in the cart*/
    var array = document.getElementsByName('quantity');
    var totalQuantity = 0;
    for(var i=0;i<array.length;i++){
        if(parseInt(array[i].value))
            totalQuantity += parseInt(array[i].value);
    }

    if(totalQuantity == 0) {
        document.getElementById("items-in-cart").innerHTML = `Votre panier est vide.`
    } else if (totalQuantity == 1) {
        document.getElementById("items-in-cart").innerHTML = `Votre panier contient 1 produit.`
    } else {
    document.querySelectorAll(".nav-cart").innerhtml = `2`
        document.getElementById("items-in-cart").innerHTML = `Votre panier contient ${totalQuantity} produits.`
    }

    updateStorageQuantity()

}

function addToCartClicked(event) { /*saving in local storage when article is added to cart in products page*/
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var name = shopItem.getElementsByClassName("shop-item-name")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSource = shopItem.getElementsByClassName("card-img-top")[0].src
    var itemValue = shopItem.getElementsByClassName("item-quantity-value")[0].value

    var e = document.getElementById("inlineFormCustomSelect")
    var chosenColor = e.options[e.selectedIndex].text

    var teddyAddedInCart = {
        "nom": name,
        "prix": price,
        "image": imageSource,
        "nombre": itemValue,
        "couleur": chosenColor,
    }

    var readyToAdd = name + " " + chosenColor
    
    if (localStorage.getItem(readyToAdd) == null) { /*If item is not yet in local storage*/
        localStorage.setItem(readyToAdd, JSON.stringify(teddyAddedInCart)); /*add to local storage*/
    } else { /*if item already in local storage*/
        var storedItems = JSON.parse(localStorage.getItem(readyToAdd)); /*get local storage*/
        JSON.parse(localStorage.getItem(storedItems)); /*transform to be able to use in js*/
        var addItemValue = +storedItems["nombre"] + +itemValue /*update number of items*/
        var updatedTeddy = { /*update array for local storage*/
            "nom": name,
            "prix": price,
            "image": imageSource,
            "nombre": addItemValue,
            "couleur": chosenColor,
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

    for (var i = 0; i < localStorage.length; i++) { /*get les items depuis le local storage en fonction des keys*/
        var cartItems = JSON.parse((localStorage.getItem(localStorage.key(i))));
        JSON.parse(localStorage.getItem(cartItems));

        const templateCartRow = document.getElementById("templateCartRow") /*Select template in HTML doc*/
        const cloneCartRow = document.importNode(templateCartRow.content, true) /*Clone template*/

        cloneCartRow.getElementById("cart-img").innerHTML += `<img class="img-fluid w-100 cart-image" id="cart-img" src="${cartItems.image}" alt="Sample">` /*Change image*/
        cloneCartRow.getElementById("cart-name").textContent = cartItems.nom /*Change name*/
        cloneCartRow.getElementById("cart-color").textContent = cartItems.couleur
        cloneCartRow.getElementById("cart-number").value = cartItems.nombre
        cloneCartRow.getElementById("cart-price").textContent = cartItems.prix /*change price*/

        document.getElementById("cart-rows").appendChild(cloneCartRow) /*Set clone to replace template (cards being templateCard's parent)*/

    }

}

function updateLocalStorage() { /*update local storage when item removed from cart*/
    var removeButtons = document.getElementsByClassName("remove-btn")
    
    for(var i = 0; i < removeButtons.length; i++) {
        
    var name = document.getElementsByClassName("cart-name")[i].innerText
    var price = document.getElementsByClassName("cart-price")[i].textContent
    var imageSource = document.getElementsByClassName("cart-image")[i].src
    var itemValue = document.getElementsByClassName("cart-number")[i].value
    var chosenColor = document.getElementsByClassName("cart-color")[i].textContent

    var teddiesInCart = {
        "nom": name,
        "prix": price,
        "image": imageSource,
        "nombre": itemValue,
        "couleur": chosenColor,
    }

    var readyToAdd = name + " " + chosenColor

    localStorage.clear();
    localStorage.setItem(readyToAdd, JSON.stringify(teddiesInCart)); /*add to local storage*/

    
}

}

function updateStorageQuantity() { /*update local storage when an item's quantity changes in cart*/
var quantityInputs = document.getElementsByClassName("quantity")
for(var i = 0; i < quantityInputs.length; i++) { /*Listening to input change for items in cart*/
    var name = document.getElementsByClassName("cart-name")[i].innerText
    var price = document.getElementsByClassName("cart-price")[i].textContent
    var imageSource = document.getElementsByClassName("cart-image")[i].src
    var itemValue = document.getElementsByClassName("cart-number")[i].value
    var chosenColor = document.getElementsByClassName("cart-color")[i].textContent

    var teddiesInCart = {
        "nom": name,
        "prix": price,
        "image": imageSource,
        "nombre": itemValue,
        "couleur": chosenColor,
    }

    var readyToAdd = name + " " + chosenColor

    localStorage.setItem(readyToAdd, JSON.stringify(teddiesInCart)); /*add to local storage*/

}}





displayCart()

console.log(localStorage)