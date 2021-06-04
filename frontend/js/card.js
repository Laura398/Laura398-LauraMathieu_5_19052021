/*Représentation du format de la carte*/

class Card{
    constructor(jsonTeddies){ /*Récupérationdes fiches produit au format json*/
        jsonTeddies && Object.assign(this, jsonTeddies);
    }

}