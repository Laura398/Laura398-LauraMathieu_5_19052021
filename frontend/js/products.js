/*Function display product information on screen*/

(async function() {
    const teddyId = await getTeddyId()
    const teddyData = await getTeddyData(teddyId)
    displayTeddy(teddyData)
    displayColors(teddyData)
    
  })()

  /*get data for 1 teddy by ID*/
  
  function getTeddyId() {
    return new URL(location.href).searchParams.get("_id")
  }
  
  function getTeddyData(teddyId) {
    return fetch(`https://localhost:3000/api/teddies/${teddyId}`)
      .then(async function(httpBodyResponse) {
        return httpBodyResponse.json()
      })
      .then(function(teddy) {
        return teddy
      })
      .catch(function(error) { /*Error message if API dysfunctionning*/
        alert(error)
      })
  }

  /*Display data about that teddy on screen*/
  
  function displayTeddy(teddyData) {
    document.getElementById("product-img").innerHTML = `<img class="card-img-top" id="card-img-top" src="${teddyData.imageUrl}" alt="Card image cap">`
    document.getElementById("product-id").textContent = teddyData._id
    document.getElementById("product-name").textContent = teddyData.name
    document.getElementById("product-price").textContent = (parseInt(teddyData.price, 10) / 100)  + ",00 €"
    document.getElementById("product-description").textContent = teddyData.description
  };

  function displayColors(teddyData) { /*Display Colors*/
    let select = document.getElementById("inlineFormCustomSelect"); 
    let options = teddyData.colors; 
    for(let i = 0; i < options.length; i++) {
      let opt = options[i];
      let col = "chosen-color";
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt[i];
      el.className = col;
      select.appendChild(el);
    }
  }

  
  
