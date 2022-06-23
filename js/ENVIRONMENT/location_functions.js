function updateRealLocation(object, formerX, formerY, newX, newY){ // Met à jour la position d'un élément (uniquement utilisé par le joueur pour le moment)
    deleteRealLocation(object, formerX, formerY); // efface l'ancienne localisation d'un élément
    setRealLocation(object, newX, newY); // enregistre la nouvelle localisation d'un élément
}
function deleteRealLocation(object, x, y){ // Efface la localisation d'un élément
    const real_key = transformCoordinatesIntoKey(x, y);
    const element_on_location = ENV.Locations.get(real_key);
    // On peut pas différencier les objets des array mieux que ça ?
    if(Array.isArray(element_on_location)){ // condition vérifiée si l'élément est un tableau (si il y a plusieurs objets sur l'emplacement)
        const array_of_objects_on_location = element_on_location; // maintenant qu'on sait que c'est un objet, on change le nom pour que ce soit plus explicite
        // Ensuite on cherche à savoir quel element de l'array correspond à l'objet à effacer, pour ne ré-enregistrer que les autres àcet emplacement
        if(array_of_objects_on_location[0] === object){ 
            ENV.Locations.set(real_key, array_of_objects_on_location[1]);
        }
        else if(array_of_objects_on_location[1] === object){
            ENV.Locations.set(real_key, array_of_objects_on_location[0]);
        }
        else{
            console.error("L'objet dont on veut effacer la localisation est introuvable à cet emplacement");
        }
    }
    else if(!Array.isArray(element_on_location)){ // cette condition est vérifiée si l'élément n'est pas un array (normalement ça doit être un objet)
        ENV.Locations.set(real_key, undefined);
        console.error("Attention : emplacement indéfini pour la clé : ", real_key);
    }
    else{
        console.error("L'objet à la localisation : ", real_key, " ne rentre dans aucune condition");
    }
}
function setRealLocation(object, x, y){ // Enregistre la localisation d'un élément
    const real_key = transformCoordinatesIntoKey(x, y);
    if(ENV.Locations.get(real_key) === undefined){ // condition vérifiée si rien n'est enregistré à cet emplacement
        ENV.Locations.set(real_key, object);
    }
    else if(ENV.Locations.get(real_key) !== undefined){ // condition est vérifiée si quelque chose est déjà enregistré à cet emplacement
        const preexisting_object = ENV.Locations.get(real_key); // on récupère ce qui était déjà à cet emplacement
        ENV.Locations.set(real_key, [object, preexisting_object]); // on le met dans un tableau avec le nouvel objet. Attention : un problème se produira si un autre objet que player peut se déplacer, et qu'il se retrouvent au même emplacement
    }
}

function transformCoordinatesIntoKey(x, y){ // Génère une clé utilisable par les Map() de l'environnement et de l'AI dans lesquels sont référencés les objets. Fonction utilisée par AI{} et ENV{}
    let coordinateX = String(x);
    let coordinateY = String(y);
    const key = "x:" + coordinateX + " y:" + coordinateY;
    return key;
}
// function transformKeyIntoCoordinates(string = String){ // Génère une clé utilisable par les Map() de l'environnement et de l'AI dans lesquels sont référencés les objets. Fonction utilisée par AI{} et ENV{}
//     coordinates = {
//         x: undefined,
//         y: undefined
//     }
//     for(caracter of string){
//         if(!isNaN(caracter)){

//         }
//     }
//     let coordinateX = String(x);
//     let coordinateY = String(y);
//     const key = "x:" + coordinateX + " y:" + coordinateY;
//     return key;
// }
function createLocationMap(){
    const map = new Map();
    for (let i = 0; i < ENV.ROW_AND_COLUMN_NUMBER; i++) { // pour tous les x
        const x = i*ENV.CELL_WIDTH_AND_HEIGHT;
        for (let j = 0; j < ENV.ROW_AND_COLUMN_NUMBER; j++) { // pour tous les y de chaque x donné
            const y = j*ENV.CELL_WIDTH_AND_HEIGHT;
            const real_key = transformCoordinatesIntoKey(x, y);
            map.set(real_key, undefined);
        }
    }
    return map;
}