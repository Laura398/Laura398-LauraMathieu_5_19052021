

/*Récupération de l'API*/
const id = JSON.parse(localStorage.getItem("article_id"));
const urlId = "http://localhost:3000/api/teddies/" + id;

async function getTeddy() {  /**** @param : récupération de l'id créée en page listeproduit var1*/
    const message = document.getElementById('product-info');
    try {
        const url = await getId();
        /*@return response : récupération des détail d'un produit et affichage*/
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (error) {/* ou @return response : erreur de connexion*/
        console.error("erreur de connexion à l'api : " + error);
        message.textContent = "Oops erreur de connexion :/";
        return;
    }
}

/*Afficher les cartes*/

fetch(url)
  .then( data => data.json()) /*Récupération de données brutes -> transformation au format json*/
  .then( jsonListTeddies => { /*Résultat du fetch inséeé dans jsonListTeddies*/
    
    try{
      for(let jsonTeddies of jsonListTeddies){
          let card = new Card(jsonTeddies);
          document.querySelector(".product-info").innerHTML += `<div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${card.imageUrl}" alt="Image du doudou" /></div>
          <div class="col-md-6">
              <div class="small mb-1">ID: ${card._id}</div>
              <h1 class="display-5 fw-bolder">${card.name}</h1>
              <div class="fs-5 mb-5">
                  <span class="text-decoration-line-through">${(parseInt(card.price, 10) / 100)  + ",00 €"}</span><br />
                  <span id="colors">Couleurs :</span>

                  <div id="colors">
                    <button type="button" class="btn btn-outline-light text-dark border-dark" >${card.colors[0]}</button>
                    <button type="button" class="btn btn-outline-light text-dark border-dark" >${card.colors[1]}</button>
                    <button type="button" class="btn btn-outline-light text-dark border-dark" >${card.colors[2]}</button>
                    <button type="button" class="btn btn-outline-light text-dark border-dark" >${card.colors[3]}</button>
                  </div>

              </div>
              <p class="lead">${card.description}</p>
              <div class="d-flex mb-5">
                  <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                  <button class="btn btn-outline-dark flex-shrink-0" type="button">
                      <i class="bi-cart-fill me-1"></i>
                      Ajouter au panier
                  </button>
              </div>
          </div>` /*Ajout du code pour les cartes*/
      }
    } catch (error) {
      return;
  }

});


function selectColor() { // creer un liens sur chaque element pour se rendre a la page du détail du produit et stocke l'id //
    /**** @param var9: tag name le nom d'un élément qui permettra de se rendre sur la page du détail du produit */
        const links = document.querySelectorAll('a.btn');
        for (let link of links) {
  
            link.addEventListener('click', function (e) {
                /**** C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page produit*/
                localStorage.setItem("article_id", JSON.stringify(e.target.id));
                /**** paramétrage de mon lien */
                link.setAttribute("href", "products.html");
            })
        }
    }