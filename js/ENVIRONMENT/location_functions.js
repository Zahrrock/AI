function updateRealLocation(object, formerX, formerY, newX, newY){ // Met à jour la position d'un élément (uniquement utilisé par le joueur pour le moment)
    deleteRealLocation(object, formerX, formerY); // efface l'ancienne localisation d'un élément
    setRealLocation(object, newX, newY); // enregistre la nouvelle localisation d'un élément
}
function deleteRealLocation(object, x, y){ // Efface la localisation d'un élément
    const element_on_location = ENV.Locations[x][y];
    // On peut pas différencier les objets des array mieux que ça ?
    if(Array.isArray(element_on_location)){ // condition vérifiée si l'élément est un tableau (si il y a plusieurs objets sur l'emplacement)
        const array_of_objects_on_location = element_on_location; // maintenant qu'on sait que c'est un objet, on change le nom pour que ce soit plus explicite
        // Ensuite on cherche à savoir quel element de l'array correspond à l'objet à effacer, pour ne ré-enregistrer que l'autre à cet emplacement
        if(array_of_objects_on_location[0] === object){ 
            ENV.Locations[x][y] = array_of_objects_on_location[1];
        }
        else if(array_of_objects_on_location[1] === object){
            ENV.Locations[x][y] = array_of_objects_on_location[0];
        }
        else{
            console.error("L'objet dont on veut effacer la localisation est introuvable à cet emplacement");
        }
    }
    else if(!Array.isArray(element_on_location)){ // cette condition est vérifiée si l'élément n'est pas un array (normalement ça doit être un objet)
        ENV.Locations[x][y] = undefined;
        console.error("Attention : emplacement indéfini pour les coordonnées : ", x, " ", y);
    }
    else{
        console.error("L'objet à la localisation : ", x, " ", y, " ne rentre dans aucune condition");
    }
}
function setRealLocation(object, x, y){ // Enregistre la localisation d'un élément
    if(ENV.Locations[x] === undefined){ // Condition vérifiée si aucun objet avec cette coordonnée x n'a été enregistré auparavant 
        ENV.Locations[x] = []; // On créer la liste de cette coordonnée x
    }
    if(ENV.Locations[x][y] === undefined){  // condition vérifiée si rien n'est enregistré à cet emplacement
        ENV.Locations[x][y] = object; // On définit cet emplacement avec l'objet
    }
    else if(ENV.Locations[x][y] !== undefined){ // condition est vérifiée si quelque chose est déjà enregistré à cet emplacement
        const preexisting_object = ENV.Locations[x][y]; // on récupère ce qui était déjà à cet emplacement
        ENV.Locations[x][y] = [object, preexisting_object]; // on le met dans un tableau avec le nouvel objet. Attention : un problème se produira si un autre objet que player peut se déplacer, et qu'il se retrouvent au même emplacement
    }
    else{
        console.error("Problème");
    }
}

function getRealLocation(x, y){
    if(ENV.Locations[x] !== undefined && ENV.Locations[x][y] !== undefined){
        return ENV.Locations[x][y];
    }
    else{
        return undefined;
    }
}
