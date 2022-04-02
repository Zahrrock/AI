function generateTarget(){ // Génère la cible
    const target_coordinates = generateFreeRandomCoordinates(); // On génère des coordonnées aléatoires pour la cible
    ENV.target = new Object(target_coordinates.x, target_coordinates.y, "img/target.png", "target", "target");
    setRealLocation(ENV.target, ENV.target.x(), ENV.target.y());
}