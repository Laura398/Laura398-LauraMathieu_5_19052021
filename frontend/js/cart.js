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
    displayCart()
}

function removeCartItem(event) { /*To remove the item when the button 'remove' is clicked*/
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
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
        document.getElementById("items-un-cart").innerHTML = `Votre panier est vide.`
    } else if (totalQuantity == 1) {
        document.getElementById("items-un-cart").innerHTML = `Votre panier contient 1 produit.`
    } else {
    document.querySelectorAll(".nav-cart").innerhtml = `2`
        document.getElementById("items-un-cart").innerHTML = `Votre panier contient ${totalQuantity} produits.`
    }

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

console.log(localStorage)

for (var i = 0; i < localStorage.length; i++) { /*get les items depuis le local storage en fonction des keys*/
    var test = JSON.parse((localStorage.getItem(localStorage.key(i))));
    JSON.parse(localStorage.getItem(test));
    console.log(test.nom, test.prix, test.nombre, test.couleur)
 }

