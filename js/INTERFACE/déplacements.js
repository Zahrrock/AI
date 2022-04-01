function onKeyDown(e) {
    const moove_direction = { // stoque la direction du futur mouvement du player sous forme de vecteurs unitaires x et y
        x: 0,
        y: 0,
    }
    switch (e.keyCode) { // change la valeur des vecteurs unitaires x et y selon la touche directionnelle pressée
        case KEY_CODE_LEFT: // Carré au dessu à gauche
            moove_direction.x = -1;
            break;
        case KEY_CODE_RIGHT: // Carré au dessu à gauche
            moove_direction.x = 1;
            break;
        case KEY_CODE_TOP_ARROW: // Carré au dessu à gauche
            moove_direction.y = -1;
            break;
        case KEY_CODE_BOTTOM_ARROW: // Carré au dessu à gauche
            moove_direction.y = 1;
            break;
    }
    if(!(moove_direction.x === 0 && moove_direction.y === 0)){ // Lance moove() uniquement si une touche directionnelle a été pressée, et a changé les valeurs de moove_direction{}
        moove(moove_direction);
    }
}

function moove(moove_direction){ // Déplace le player
    const new_coordinateX = IA.I.x + moove_direction.x * REAL.player.width_and_height;
    const new_coordinateY = IA.I.y + moove_direction.y * REAL.player.width_and_height;
    // console.log("new_coordinateX : ", new_coordinateX);
    // console.log("new_coordinateY : ", new_coordinateY);
    if(isLocationFree(new_coordinateX, new_coordinateY, IA.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de l'IA
        updateIAPlayerPosition(new_coordinateX, new_coordinateY);
        updateRealPlayerPosition();
        look();
    }
    else{
        // console.error("Vous ne pouvez pas aller ici, il y a un obstacle");
    }
    // Ici on pourrait mettre une autre isLocationFree() qui se base sur les données de REAL{}. Et si REAL est pas d'accord 
    // avec l'IA, c'est comme si elle se prenait un mur. Ca fait un niveau de sécurité de plus aussi
}
function updateIAPlayerPosition(x, y){
    IA.I.x = x;
    IA.I.y = y;
}
function updateRealPlayerPosition(){
    const player_original_coodinates = {
        x : REAL.player.position_record.x[0],
        y : REAL.player.position_record.y[0]
    }
    setImgPosition(REAL.player.image, player_original_coodinates.x + IA.I.x, player_original_coodinates.y + IA.I.y);
    REAL.player.position_record.x.push(REAL.player.x());
    REAL.player.position_record.y.push(REAL.player.y());
    const length = REAL.player.position_record.x.length;
    updateRealLocation(REAL.player, REAL.player.position_record.x[length-2], REAL.player.position_record.y[length-2], REAL.player.x(), REAL.player.y());
}
function isLocationFree(x, y, map){ // vérifie si un emplacement est libre (si le joueur peut aller dessus)
    const key = transformCoordinatesIntoKey(x, y);
    const element = map.get(key);
    if(element === undefined || element === null){ // Condition de sécurité
        console.error("element est undefined ou null : element = ", element);
        return false;
    }
    else if(!Array.isArray(element)){ // cette condition est vérifiée si element n'est pas un Array
        const element_type = element.image.className;
        if(element_type === "obstacle"){
            return false;
        }
        else if(element_type === "obstacle" || element_type === "target" || element_type === "free_rectangle"){
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