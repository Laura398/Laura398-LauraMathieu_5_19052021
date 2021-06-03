/*Récupération de l'API*/

showAll();

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

/*démarrage de la page d'index */

showAll();

async function getTeddies() { // recupere tous les elements // ou affiche l'erreur //
    /*******
     * messaged'erreur ou récupération des produits
    * description de ma fonction, elle permet de récupérer les infos sur le serveur
     */
     /**** @param var1: création de l'élément message*/
        const message = document.getElementById("message");
       /**** @param : URL représente un objet qui fournit des méthodes statiques utilisées pour créer des URL d'objet.*/
        const url = 'http://localhost:3000/api/teddies/';
        try {
            const response = await fetch(url);
            /*@return response : récupération des produits et affichage*/
            message.textContent = "Nos produits OriTeddy";
            return await response.json();
        } catch (error) {
            /* ou @return response : erreur de connexion*/
            message.textContent = "Erreur de connexion";
            return;
        }
    }


    async function showAll() { // affiche tous les elements // ou affiche l'erreur //
        const elements = await getTeddies();
    }







    fetch("http://localhost:3000/api/teddies")
    .then( data => data.json())
    .then( jsonListTeddies => {
      for(let jsonTeddies of jsonListTeddies){
        let card = new Card(jsonTeddies);
        document.querySelector(".cards").innerHTML += `<div class="col-12 col-lg-4">
                                                              <div class="card text-center bg-light m-4">
                                                                <figure><img class="card-img-top" src="${teddies.imageUrl}" alt="Card image cap">
                                                                  <figcaption class="card-body">
                                                                  <h2 class="card-title h5">${teddies.name}</h2>
                                                                  <p class="card-text">${teddies.price}</p>
                                                                  <a href="products.html" class="btn btn-primary">Voir plus</a>
                                                                  </figcaption>
                                                                </figure>
                                                              </div>
                                                            </div>`
      }
    });
    