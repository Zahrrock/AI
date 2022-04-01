function generateRandomMoove(){
    const moove_direction = { // stoque la direction du futur mouvement du player sous forme de vecteurs unitaires x et y
        x: 0,
        y: 0,
    }
    moove_direction.x = Math.round(Math.random() * (2) -1);
    if(moove_direction.x === 0){
        moove_direction.y = Math.round(Math.random() * (2) -1);
    }
    IAVerifyMoove(moove_direction);
}

function IAVerifyMoove(moove_direction){
    const new_coordinateX = IA.I.x + moove_direction.x * REAL.player.width_and_height;
    const new_coordinateY = IA.I.y + moove_direction.y * REAL.player.width_and_height;
    if(isLocationFree(new_coordinateX, new_coordinateY, IA.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de l'IA
        if(REALVerifyMoove(moove_direction)){ // Il faudrait stoquer quelque part que l'IA veut aller ici, et lors du processus permanent de INTERFACE, on vérifie si on autorise
            updateIAPlayerPosition(new_coordinateX, new_coordinateY);
            look();
            updateRealPlayerPosition(); // Et là dans le processus permanent de INTERFACE, il détecterait que IA a changé ses coordonnées, et (en revérifiant pour éviter les hacks) il changerait la vrai position de l'IA
        }
        else{
            console.log("mince...");
        }
    }
}

function REALVerifyMoove(moove_direction){
    const new_coordinateX = REAL.player.x() + moove_direction.x * REAL.player.width_and_height;
    const new_coordinateY = REAL.player.y() + moove_direction.y * REAL.player.width_and_height;
    if(isLocationFree(new_coordinateX, new_coordinateY, REAL.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de REAL
        return true;
    }
}