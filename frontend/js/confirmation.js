var message = JSON.parse(localStorage.getItem("message")); /*get local storage*/
JSON.parse(localStorage.getItem(message)); /*transform to be able to use in js*/

document.getElementsByClassName("success-message")[0].innerHTML = message

console.log(localStorage)
console.log(message)

window.onbeforeunload = function() {
    localStorage.clear();
    return '';
  };