function getBorderingLocations(){ // Retourne à l'AI tous les objets visibles (ceux qui sont juste à côté)
    const bordering_locations = [];
    for (let i = 0; i < 9; i++) { // Pour tous les emplacements autour du joueur et l'emplacement du joueur lui-même
        const location_to_check = {};
        switch (i) { // On définit les coordonnées de chaque emplacement à vérifier
            case 0: // Carré au centre
                location_to_check.x = AI.I.x
                location_to_check.y = AI.I.y
                break;
            case 1: // Carré au dessu
                location_to_check.x = AI.I.x
                location_to_check.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 2: // Carré au dessu à droite
                location_to_check.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 3: // Carré à droite
                location_to_check.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y
                break;
            case 4: // Carré au dessous à droite
                location_to_check.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 5: // Carré au dessous
                location_to_check.x = AI.I.x
                location_to_check.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 6: // Carré au dessous à gauche
                location_to_check.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 7: // Carré à gauche
                location_to_check.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y
                break;
            case 8: // Carré au dessu à gauche
                location_to_check.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_to_check.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            default:
                console.log("ERREUR au switch statement, i = ", i);
                break;
        }
        const real_key = transformCoordinatesIntoKey(location_to_check.x + ENV.player.position_record.x[0], location_to_check.y + ENV.player.position_record.y[0]); // Récupérer ce qu'il ya vraiment à cet emplacement
        const element_on_location = ENV.Locations.get(real_key);
        if(element_on_location === undefined){ // Condition de sécurité. Si element_on_location est indéfini dans ENV.Locations, il y a un problème quelque part
            console.error("element_on_location is undefined. location : ", real_key);
        }
        if(Array.isArray(element_on_location)){ // condition vérifiée si l'élément est un tableau (si il y a plusieurs objets sur l'emplacement)
            const array_of_objects_on_location = element_on_location; // maintenant qu'on sait que c'est un array, on change le nom de l'élément pour que ce soit plus compréhensible
            // Ensuite on cherche à retirer celui qui correspond au player
            const first_object = array_of_objects_on_location[0];
            const second_object = array_of_objects_on_location[1];
            if(array_of_objects_on_location.length > 2){
                console.error("array_of_objects_on_location.length > 2. situation non prévue par les conditions suivantes");
            }
            else if(first_object !== ENV.player && second_object !== ENV.player){ // Si aucun des élément de l'array ne correspond au player
                bordering_locations.push(array_of_objects_on_location); // On laisse les deux
            }
            else if(first_object !== ENV.player){ // Si le premier ne correspond pas au player
                bordering_locations.push(first_object); // ne laisser que le premier
            }
            else if(second_object !== ENV.player){ // Si le deuxième ne correspond pas au player
                bordering_locations.push(second_object); // ne laisser que le deuxième
            }
            else{
                console.error("problème");
            }
        }
        else if(!Array.isArray(element_on_location)){ // cette condition est vérifiée si l'élément n'est pas un array (normalement ça doit être un objet)
            bordering_locations.push(element_on_location);
        }
        else{
            console.error("L'objet à la localisation : ", real_key, " ne rentre dans aucune condition");
        }
    }
    if(bordering_locations.length !== 9){ // Condition de sécurité
        console.error("bordering_locations.length !== 9");
    }
    return bordering_locations;
}