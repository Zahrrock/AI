function generateRandomMoove(){
    const moove_direction = { // stoque la direction du futur mouvement du player sous forme de vecteurs unitaires x et y
        x: 0,
        y: 0,
    }
    moove_direction.x = Math.round(Math.random() * (2) -1);
    if(moove_direction.x === 0){
        moove_direction.y = Math.round(Math.random() * (2) -1);
    }
    AIVerifyMoove(moove_direction);
}

function AIVerifyMoove(moove_direction){ // l'IA vérifie avec ses propres données si elle peut aller à cet emplacement
    const player_size = AI.I.size;
    const new_coordinateX = AI.I.x + moove_direction.x * player_size;
    const new_coordinateY = AI.I.y + moove_direction.y * player_size;
    if(isLocationFree(new_coordinateX, new_coordinateY, AI.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de l'AI
        if(ENVVerifyMoove(moove_direction)){ // Il faudrait stoquer quelque part que l'AI veut aller ici, et lors du processus permanent de INTERFACE, on vérifie si on autorise
            updateAIPlayerPosition(new_coordinateX, new_coordinateY);
            look();
            updateRealPlayerPosition(); // Et là dans le processus permanent de INTERFACE, il détecterait que AI a changé ses coordonnées, et (en revérifAInt pour éviter les hacks) il changerait la vrai position de l'AI
        }
        else{
            console.log("mince...");
        }
    }
}

function ENVVerifyMoove(moove_direction){ // Vérifie avec les données de ENV si le player peut aller à cet emplacement
    const player_size = ENV.CELL_WIDTH_AND_HEIGHT;
    const new_coordinateX = ENV.player.x() + moove_direction.x * player_size;
    const new_coordinateY = ENV.player.y() + moove_direction.y * player_size;
    if(isLocationFree(new_coordinateX, new_coordinateY, ENV.Locations)){ // Vérifie si on peut aller sur l'emplacement selon les données de ENV
        return true;
    }
}