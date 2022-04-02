function generatePlayer(){ // Génère le joueur
    const player_coordinates = generateFreeRandomCoordinates(); // génère des coordonnées aléatoires
    ENV.player = new Object(player_coordinates.x, player_coordinates.y, "img/player.png", "player", "player");
    ENV.player.position_record = { // Et ça c'est une nouvelle fonctionnalité en développement qui permettrait de stocker toutes les positions successives du joueur
        x: [player_coordinates.x], // On stoque les première coordonnées
        y: [player_coordinates.y]  //
    }
    ENV.player.width_and_height = transformCssCoordinateIntoJsCoordinate(document.getElementById('player').style.width); // Ici ont ne transforme pas vraiment des coordonnées, mais on utilise la même fonction pour extraire la taille réelle de l'image
    setRealLocation(ENV.player, ENV.player.x(), ENV.player.y());
}