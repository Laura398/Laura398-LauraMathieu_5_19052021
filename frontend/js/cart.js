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
}
}


displayCart()

function myFunc(e){
    e.preventDefault();
    validateForm()
}

function validateForm() {
    var fName = document.forms["form"]["firstName"].value;
    var lName = document.forms["form"]["lastName"].value;
    var mail = document.forms["form"]["email"].value;
    var tel = document.forms["form"]["phone"].value;
    var house = document.forms["form"]["address"].value;
    var town = document.forms["form"]["city"].value;
    var code = document.forms["form"]["zip"].value;

    testMail = mail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    testPhone = tel.match(/0[1-9][0-9]{8}/)
    testZip = code.match(/[0-9]{5}/)

    if (document.getElementById("items-in-cart").innerHTML == `Votre panier est vide.`) {
      alert("Votre panier est vide !")
    } else if (fName == "") {
      alert("Le prénom doit être correctement renseigné.");
      return false;
    } else if (lName == "") {
      alert("Le nom doit être correctement renseigné.");
      return false;
    } else if (!testMail) {
        alert("L'adresse mail doit être correctement renseignée.");
        return false;
    }  else if (!testPhone) {
        alert("Le numéro de téléphone doit être correctement renseigné.");
        return false;
    }  else if (house == "") {
        alert("L'adresse postale doit être correctement renseignée.");
        return false;
    } else if (town == "") {
        alert("La ville doit être correctement renseignée.");
        return false;
    } else if (!testZip) {
        alert("Le code postal doit être correctement renseigné.");
        return false;
    } else if (document.getElementById("invalidCheck2").checked) {
        completeOrder()
    } else {
        alert("Vous devez accepter les conditions d'utilisation.")
    }
}

function completeOrder() {

    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")

    let firstName = document.getElementById("validationDefault01").value
    let lastName = document.getElementById("validationDefault02").value
    let email = document.getElementById("validationDefaultMail").value
    let address = document.getElementById("validationDefault03").value
    let city = document.getElementById("validationDefault04").value
    let zipCode = document.getElementById("validationDefault05").value

    document.getElementsByClassName("demo1").innerHTML = firstName
    document.getElementsByClassName("demo2").innerHTML = lastName
    document.getElementsByClassName("demo3").innerHTML = email
    document.getElementsByClassName("demo4").innerHTML = address
    document.getElementsByClassName("demo5").innerHTML = city
    document.getElementsByClassName("demo6").innerHTML = zipCode

    let zip = document.getElementsByClassName("demo6").innerHTML

    let contact = {
        firstName: document.getElementsByClassName("demo1").innerHTML,
        lastName: document.getElementsByClassName("demo2").innerHTML,
        address: document.getElementsByClassName("demo4").innerHTML,
        city: document.getElementsByClassName("demo5").innerHTML,
        email: document.getElementsByClassName("demo3").innerHTML
    };

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

    teddiesUrl = "https://localhost:3000/api/teddies/order";

    let xhr = new XMLHttpRequest();

    xhr.open("POST", teddiesUrl, true);

    xhr.onload = function () {

        if (this.status == 201) {
        let order = JSON.parse(this.responseText);
        let successMsg = `<p class="text-center h5">Bonjour ${order.contact.firstName} ${order.contact.lastName},<br />
                            Votre commande numéro ${order.orderId} a bien été validée, pour un montant total de ${total}.<br />
                            Elle vous sera livrée dès que possible à l'adresse suivante :<br />
                            ${order.contact.address}<br />
                            ${zip} ${order.contact.city}<br />
                            Vous recevrez sous peu un mail de confirmation à l'adresse ${order.contact.email}.<br />
                            Nous vous remercions pour votre confiance.</p>`
        
        localStorage.setItem("message", JSON.stringify(successMsg));

            if(localStorage.getItem("message") === null) {
                alert("ERROR")
            } else {
                location.replace("../frontend/confirmation.html")
            }

        } else {
        }
    };

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(finalOrder));

    console.log(localStorage)

}

console.log(localStorage)
