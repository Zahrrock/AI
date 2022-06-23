function look(){
    const bordering_locations = getBorderingLocations();
    for (let i = 0; i < bordering_locations.length; i++) {
        const new_element = bordering_locations[i];
        const location_checked = {};
        switch (i) { // On définit les coordonnées de chaque emplacement à vérifier selon le référentiel de l'IA
            case 0: // Carré au centre
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y
                break;
            case 1: // Carré au dessu
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 2: // Carré au dessu à droite
                location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 3: // Carré à droite
                location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y
                break;
            case 4: // Carré au dessous à droite
                location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 5: // Carré au dessous
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 6: // Carré au dessous à gauche
                location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            case 7: // Carré à gauche
                location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y
                break;
            case 8: // Carré au dessu à gauche
                location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            default:
                console.log("ERREUR au switch statement, i = ", i);
                break;
        }
        const player_key = transformCoordinatesIntoKey(location_checked.x, location_checked.y);
        const former_element = AI.Locations.get(player_key);
        if(new_element !== former_element){ // condition vérifiée si l'élément qu'on voit ne correspond pas à celui qu'on connaissait avant 
            if(former_element !== undefined){ // condition de sécurité. Je ne voit pas comment new_element peut être différent de former_element si former element !== undefined.
                console.error("former_element n'était pas undefined. former_element : ", former_element, " || new_element : ", new_element); // Ca veut dire qu'un truc (autre que le joueur) a bougé sur la map
            }
            AI.Locations.set(player_key, new_element); // l'enregistrer dans la mémoire de l'AI
            // if(AI.Locations_to_discover[AI.actual_discovering_rank + 1] === undefined){ // condition vérifiée si la liste qui doit acceuillir les prochain emplacements à découvrir n'est pas définie
            //     AI.Locations_to_discover[AI.actual_discovering_rank + 1] = [];
            // }
            if(Array.isArray(new_element)){ // condition vérifiée si new_element est un Array (si il n'y a pas d'obstacle dessus)
                AI.Locations_to_discover.push(player_key); // on l'ajoute à la liste d'emplacement à aller voir
            }
            else if(new_element.image.className !== "obstacle"){ // condition vérifiée si l'élément n'est pas un obstacle
                AI.Locations_to_discover.push(player_key);
            }
            else{
                // console.log('obstacle trouvé');
            }
        }
    }
    // console.log(AI.Locations);
    console.log(AI.Locations_to_discover);
    // AI.target.x = AI.Locations_to_discover[0].x;
    // AI.target.y = AI.Locations_to_discover[0].y;
    // startSearch();
}