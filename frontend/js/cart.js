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
    
    localStorage.setItem(name, JSON.stringify(teddyAddedInCart));

    addItemToCart()
}



console.log(localStorage)