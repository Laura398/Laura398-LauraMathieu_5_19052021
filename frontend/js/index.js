/*Function to display the cards on screen*/

(async function() {
  const teddies = await getTeddies() /*Getting data from fetch - Will wait until function getTeddies is defined*/
  for (teddy of teddies) { /*Takes data from all teddies in API*/
    displayTeddies(teddy) /*Displays data on screen*/
  }
})()

/*Fetching API*/

function getTeddies() {
  return fetch("https://ocs-orinoco.herokuapp.com/api/teddies") /*Fetching API*/
    .then(function(httpBodyResponse) { /*Transforming data in json*/
      return httpBodyResponse.json()
    })
    .then(function(teddies) { /*Returning data*/
      return teddies
    })
    .catch(function(error) { /*Error message if API dysfunctionning*/
      alert(error)
    })
}

/*Display card parameters*/

function displayTeddies(teddy) {
  const templateCard = document.getElementById("templateCard") /*Select template in HTML doc*/
  const cloneCard = document.importNode(templateCard.content, true) /*Clone template*/

  cloneCard.getElementById("index-img").innerHTML += `<img class="card-img-top" id="card-img-top" src="${teddy.imageUrl}" alt="Card image cap">` /*Change image*/
  cloneCard.getElementById("card-title").textContent = teddy.name /*Change name*/
  cloneCard.getElementById("card-price").textContent = (parseInt(teddy.price, 10) / 100)  + ",00 €" /*change price*/
  
  cloneCard.getElementById("product-link").href += "?_id=" + teddy._id

  document.getElementById("cards").appendChild(cloneCard) /*Set clone to replace template (cards being templateCard's parent)*/
}