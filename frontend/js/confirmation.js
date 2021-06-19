if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", filling)
} else {
    filling()
}

function filling() {

var message = JSON.parse(localStorage.getItem("message")); /*get local storage*/
JSON.parse(localStorage.getItem(message)); /*transform to be able to use in js*/

let toFill = document.getElementsByClassName("success-message")[0]

toFill.innerHTML = message

}

console.log(localStorage)


