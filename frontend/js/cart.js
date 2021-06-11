if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {

    var removeButtons = document.getElementsByClassName("remove-btn")
    console.log(removeButtons)

    for(var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("quantity")
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("cart-btn")
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var name = shopItem.getElementsByClassName("shop-item-name")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSource = shopItem.getElementsByClassName("card-img-top")[0].src
    var itemValue = shopItem.getElementsByClassName("item-quantity-value")[0].value

    var e = document.getElementById("inlineFormCustomSelect")
    var chosenColor = e.options[e.selectedIndex].text

    localStorage.setItem("nom", name);
    localStorage.setItem("prix", price);
    localStorage.setItem("image", imageSource);
    localStorage.setItem("nombre", itemValue);
    localStorage.setItem("couleur", chosenColor);

    addItemToCart()
}

function updateCartTotal() {
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
}

console.log(localStorage)