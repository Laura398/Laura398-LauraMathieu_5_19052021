showAll();

/*Récupération de l'API*/
const url = 'http://localhost:3000/api/teddies/';

fetch(url)
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

async function getTeddies() { /* Permet de récupérer les éléments sur le serveur, récupère tous les elements ou affiche l'erreur*/
        const url = 'http://localhost:3000/api/teddies/';
        const message = document.getElementById("message"); /* création de l'élément message*/
        
        try {
            const response = await fetch(url);
            message.textContent = "Choisissez votre Teddy";
            return await response.json(); /*return response : récupération des produits et affichage*/
        } catch (error) {
            message.textContent = "Erreur de connexion";
            return; /* ou return response : erreur de connexion*/
        }
    }


    async function showAll() { /* affiche tous les éléments ou affiche l'erreur */
        const elements = await getTeddies();
    }



    /*Afficher les cartes*/
    
    fetch(url)
    .then( data => data.json()) /*Récupération de données brutes -> transformation au format json*/
    .then( jsonListTeddies => { /*Résultat du fetch inséeé dans jsonListTeddies*/
      for(let jsonTeddies of jsonListTeddies){
          let card = new Card(jsonTeddies);
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
      }
      
    });
    
