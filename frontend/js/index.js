

/*Récupération de l'API*/
const url = 'http://localhost:3000/api/teddies/';

/*Afficher les cartes*/



fetch(url)
  .then( data => data.json()) /*Récupération de données brutes -> transformation au format json*/
  .then( jsonListTeddies => { /*Résultat du fetch inséeé dans jsonListTeddies*/
    try{
      for(let jsonTeddies of jsonListTeddies){
          let card = new Card(jsonTeddies);
          let select = card.select;
          select = false;
          document.querySelector(".cards").innerHTML += `<div class="col-12 col-lg-4">
                                                          <div class="card text-center bg-light m-4">
                                                            <figure><img class="card-img-top" src="${card.imageUrl}" alt="Card image cap">
                                                              <figcaption class="card-body">
                                                              <h2 class="card-title h5">${card.name}</h2>
                                                              <p class="card-text">${(parseInt(card.price, 10) / 100)  + ",00 €"}</p>
                                                              <a href="products.html" class="btn btn-primary">Voir plus</a>
                                                              </figcaption>
                                                            </figure>
                                                          </div>
                                                        </div>` /*Ajout du code pour les cartes*/
          select = true;
      }
      
    } catch (error) {
      return;
  }

});

function selectTeddy() { // creer un liens sur chaque element pour se rendre a la page du détail du produit et stocke l'id //
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
    

