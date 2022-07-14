// function onKeyDown(e) {
//     const moove_direction = { // stoque la direction du futur mouvement du player sous forme de vecteurs unitaires x et y
//         x: 0,
//         y: 0,
//     }
//     switch (e.keyCode) { // change la valeur des vecteurs unitaires x et y selon la touche directionnelle pressée
//         case KEY_CODE_LEFT: // si la flèche de gauche est pressée
//             moove_direction.x = -1;
//             break;
//         case KEY_CODE_RIGHT: // si la flèche de droite est pressée
//             moove_direction.x = 1;
//             break;
//         case KEY_CODE_TOP_ARROW: // si la flèche du heut est pressée
//             moove_direction.y = -1;
//             break;
//         case KEY_CODE_BOTTOM_ARROW: // si la flèche du bas est pressée
//             moove_direction.y = 1;
//             break;
//         case KEY_CODE_SPACE: // si la touche espace est pressée
//             // Test
//             break;
//     }
//     if(!(moove_direction.x === 0 && moove_direction.y === 0)){ // Lance moove() uniquement si une touche directionnelle a été pressée, et a changé les valeurs de moove_direction{}
//         moove(moove_direction);
//     }
// }

function UpdateMapDiscovering(){
    // console.log("Début processus UpdateMapDiscovering()------------------------------------------");
    findNewLocationToDiscover();
    // console.log("(start of the travel)");
    UpdateTravel();
    // window.requestAnimationFrame(UpdateMapDiscovering);
}

function findNewLocationToDiscover(){
    // console.log("findNewLocationToDiscover()");
    if(AI.Locations_to_discover.length > 0){
        AI.target.x = AI.Locations_to_discover[0][0];
        AI.target.y = AI.Locations_to_discover[0][1];
        // console.log("target : ", AI.Locations_to_discover[0][0], " ", AI.Locations_to_discover[0][1]);
        startRoadSearching();
    }
    else{
        console.log("Plus rien à découvrir");
    }
}
function UpdateTravel(){ // On commence le trajet vers l'emplacement souhaité
    // console.log("Continue travel");
    const moove_direction = determineDirectionOfNextMoove(); // Calculer dans quelle direction effectuer le prochain mouvement
    // console.log("moove_direction : ", moove_direction);
    moove(moove_direction); // Se déplacer dans cette direction
    // console.log("AI.Target_search.Road.length : ", AI.Target_search.Road.length);
    if(AI.Target_search.Road.length > 0){ // Si on est pas arrivé au bout du trajet
        // console.log("request -------------------------------");
        window.setTimeout(UpdateTravel, 250);
        // window.requestAnimationFrame(UpdateTravel); // Recommencer la boucle
    }
    else{ // Sinon, si on est arrivé au bout du trajet
        AI.Locations_to_discover.splice(0,1); // L'emplacement ciblé a été découvert, on le retire de la liste
        // console.log("Fin processus UpdateMapDiscovering()------------------------------------------");
        window.setTimeout(UpdateMapDiscovering, 500);
    }
}
function determineDirectionOfNextMoove(){
    // console.log("determineDirectionOfNextMoove()");
    // console.log("road : ", AI.Target_search.Road);
    const next_location = AI.Target_search.Road[0];
    // console.log("next location : ", next_location);
    const moove_direction = { // stoque la direction du futur mouvement du player sous forme de vecteurs unitaires x et y
        x: 0,
        y: 0,
    }
    if(next_location !== undefined){
        if(Math.abs(moove_direction.x) > 1 || Math.abs(moove_direction.y) > 1){ // Condition de sécurité
            console.error("Erreur, next location plus est trop loin. AI coodinates : ", AI.I.x, " ", AI.I.y, " et next_location coodinates : ", next_location.x, " ", next_location.y);
        }
        else{
            moove_direction.x = (next_location.x - AI.I.x) / 5;
            moove_direction.y = (next_location.y - AI.I.y) / 5;
        }
    }
    else{
        console.error("next_location est undefined");
    }
    return moove_direction;
}
function moove(moove_direction){ // Déplace le player
    // console.log("moove()");
    const new_coordinateX = AI.I.x + moove_direction.x * ENV.CELL_WIDTH_AND_HEIGHT;
    const new_coordinateY = AI.I.y + moove_direction.y * ENV.CELL_WIDTH_AND_HEIGHT;
    // console.log("new_coordinateX : ", new_coordinateX);
    // console.log("new_coordinateY : ", new_coordinateY);
    if(isLocationFree(new_coordinateX, new_coordinateY, AI.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de l'AI
        updateAIPlayerPosition(new_coordinateX, new_coordinateY);
        updateRealPlayerPosition();
        look();
        const etape_du_trajet_atteinte = AI.Target_search.Road[0]; // on vient d'avancer dans le trajet, il faut supprimer les emplacements atteints
        ENV.div_game.removeChild(etape_du_trajet_atteinte.image); // supprimer l'image du DOM
        AI.Target_search.Road.splice(0, 1); // supprimer l'objet de la liste
    }
    else{
        // console.error("Vous ne pouvez pas aller ici, il y a un obstacle");
    }
    // Ici on pourrait mettre une autre isLocationFree() qui se base sur les données de ENV{}. Et si ENV est pas d'accord 
    // avec l'AI, c'est comme si elle se prenait un mur. Ca fait un niveau de sécurité de plus aussi
}
function updateAIPlayerPosition(x, y){
    AI.I.x = x;
    AI.I.y = y;
}
function updateRealPlayerPosition(){
    const player_original_coodinates = {
        x : ENV.player.position_record.x[0],
        y : ENV.player.position_record.y[0]
    }
    setImgPosition(ENV.player.image, player_original_coodinates.x + AI.I.x, player_original_coodinates.y + AI.I.y);
    ENV.player.position_record.x.push(ENV.player.x());
    ENV.player.position_record.y.push(ENV.player.y());
    const length = ENV.player.position_record.x.length;
    updateRealLocation(ENV.player, ENV.player.position_record.x[length-2], ENV.player.position_record.y[length-2], ENV.player.x(), ENV.player.y());
}
function isLocationFree(x, y, map){ // vérifie si un emplacement est libre (si le joueur peut aller dessus)
    // console.log("isLocationFree()");
    let element = undefined;
    if(map[x] !== undefined && map[x][y] !== undefined){
        element = map[x][y];
    }
    // console.log("element : ", element, " x : ", x, " y : ", y, " array : ", map);
    if(element === undefined || element === null){ // Condition de sécurité
        // console.error("element est undefined ou null dans la map : ", map, " : element = ", element);
        return false;
    }
    else if(!Array.isArray(element)){ // cette condition est vérifiée si element n'est pas un Array
        const element_type = element.image.className;
        if(element_type === "obstacle"){
            return false;
        }
        else if(element_type === "obstacle" || element_type === "free_rectangle"){
            return true;
        }
        else{
            console.error("Classe de l'élément : ", element, " non connu. Impossible de vérifier si l'emplacement est libre")
            return false;
        }
    }
    else if(Array.isArray(element)){ // condition vérifiée si element est un array, alors 2 éléments ou + ont pu se superposer, ce qui veut dire que ce ne sont pas des obstacles. Le joueur peut aller à cet emplacement
        return true;
    }
    else{ // cette condition n'est jamais sensée se vérifier, mais on n'est jamais trop prudent
        console.error("Gros problème. element = ", element);
        return false;
    }
}