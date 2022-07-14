function look(){
    // console.log("look()");
    const bordering_locations = getBorderingLocations();
    for (let i = 0; i < bordering_locations.length; i++) {
        const new_element = bordering_locations[i];
        const location_checked = {};
        switch (i) { // On définit les coordonnées de chaque emplacement à vérifier selon le référentiel de l'IA
            case 0: // Carré au centre
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y
                break;
            case 1: // Carré au dessus
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
                break;
            // case 2: // Carré au dessu à droite
            //     location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
            //     location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
            //     break;
            case 2: // Carré à droite
                location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y
                break;
            // case 4: // Carré au dessous à droite
            //     location_checked.x = AI.I.x+ENV.CELL_WIDTH_AND_HEIGHT
            //     location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
            //     break;
            case 3: // Carré au dessous
                location_checked.x = AI.I.x
                location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
                break;
            // case 6: // Carré au dessous à gauche
            //     location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
            //     location_checked.y = AI.I.y+ENV.CELL_WIDTH_AND_HEIGHT
            //     break;
            case 4: // Carré à gauche
                location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
                location_checked.y = AI.I.y
                break;
            // case 8: // Carré au dessu à gauche
            //     location_checked.x = AI.I.x-ENV.CELL_WIDTH_AND_HEIGHT
            //     location_checked.y = AI.I.y-ENV.CELL_WIDTH_AND_HEIGHT
            //     break;
            default:
                console.log("ERREUR au switch statement, i = ", i);
                break;
        }
        let former_element = getAILocation(location_checked.x, location_checked.y);
        if(new_element !== former_element){ // condition vérifiée si l'élément qu'on voit ne correspond pas à celui qu'on connaissait avant 
            if(former_element !== undefined){ // condition de sécurité. Je ne voit pas comment new_element peut être différent de former_element si former element est déjà défini.
                console.error("former_element n'était pas undefined. former_element : ", former_element, " || new_element : ", new_element); // Ca veut dire qu'un truc (autre que le joueur) a bougé sur la map
            }
            setAILocation(new_element, location_checked.x, location_checked.y); // l'enregistrer dans la mémoire de l'AI
            if(Array.isArray(new_element)){ // condition vérifiée si new_element est un Array (si il n'y a pas d'obstacle dessus) . if(Array.isArray(new_element) || new_element.image.className !== "obstacle") ne suffirait-il pas ?
                AI.Locations_to_discover.push([location_checked.x, location_checked.y]); // on l'ajoute à la liste d'emplacement à aller voir

            }
            else if(new_element.image.className !== "obstacle"){ // condition vérifiée si l'élément n'est pas un obstacle
                AI.Locations_to_discover.push([location_checked.x, location_checked.y]);

            }
            else{
                // console.log('obstacle trouvé');
            }
        }
    }
    // console.log(AI.Locations);
    // console.log("Locations to discover : ", AI.Locations_to_discover);
    // AI.target.x = AI.Locations_to_discover[0].x;
    // AI.target.y = AI.Locations_to_discover[0].y;
    // startSearch();
}

function getAILocation(x, y){
    if(AI.Locations[x] !== undefined && AI.Locations[x][y] !== undefined){
        return AI.Locations[x][y];
    }
    else{
        return undefined;
    }
}
function setAILocation(object, x, y){
    if(AI.Locations[x] === undefined){
        AI.Locations[x] = []
    }
    // Il faudra prévoir le cas où un objet autre que le joueur peut bouger. Dans ce cas là AI.Locations[x][y] est défini mais il a changé car quelque chose a bougé
    AI.Locations[x][y] = object;
}