/*Récupération de l'API (Promise)*/

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
        /**** @param var1: création de l'élément content qui affichera mes produits*/
        const card = document.getElementById('card-content');
    
        try {
    
            for (let element of elements) {
              /**** @param var1: création de l'élément article qui affichera un de me produits*/
                const article = document.createElement('article');
    
                /**** @param var2: tag name le nom d'un élément ("card-body")*/
                const figure = document.createElement('figure');
    
                /**** @param var3: tag name le nom d'un élément("card-body") */
                const img = document.createElement('img');
                
                /**** @param var4: tag name le nom d'un élément qui affiche ra le nom du produit("card-title") */
                const figcaption = document.createElement('figcaption');
    
                /**** @param var5: tag name le nom d'un élément qui affichera l'image du produit("card-image-top") */
                const h2 = document.createElement('h2');
    
                /**** @param var6: tag name le nom d'un élément qui affichera le prix du produit("card-text") */
                const text = document.createElement('p');
    
                /**** @param var7: tag name le nom d'un élément qui affichera le descriptif du produit("card-text") */
                const link = document.createElement('a');
    
                h2.textContent = element.name;
    
                /**** @param s: permet de convertir en nombre (euros).*/
                price.textContent = (parseInt(element.price, 10) / 100) + ",00 €";
    
                describe.textContent = element.description;
                /**** nomination de mes éléments dans mon code html.*/
                article.classList.add("card", "text-center", "bg-light", "m-4");
                figure.classList.add("");
                img.classList.add("card-img-top");
                figcaption.classList.add("card-body");
                h2.classList.add("card-title", "h5");
                text.classList.add("card-text");
                link.classList.add("btn", "btn-primary");
    
                link.setAttribute("href", "products.html");
                img.setAttribute("id", element._id);
                img.setAttribute("src", element.imageUrl);
    
                card.appendChild(article);
                article.appendChild(figure);
                figure.appendChild(img)
                figure.appendChild(figcaption);
                figcaption.appendChild(h2);
                figcaption.appendChild(text);
                figcaption.appendChild(link);
            }
        } catch (error) {
            return;
        }
        selectElement();
    }
    
    function selectElement() { // creer un liens sur chaque element pour se rendre a la page du détail du produit et stocke l'id //
    /**** @param var9: tag name le nom d'un élément qui permettra de se rendre sur la page du détail du produit */
        const links = document.querySelectorAll('a.product');
        for (let link of links) {
    
            link.addEventListener('click', function (e) {
                /**** C'est une DOMString contenant le nom de la clé que l'on souhaite créer et qui nous sera appelée sur la page produit*/
                localStorage.setItem("article_id", JSON.stringify(e.target.id));
                /**** paramétrage de mon lien */
                link.setAttribute("href", "produit.html");
            })
        }
    }