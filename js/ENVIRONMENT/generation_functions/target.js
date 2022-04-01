function generateTarget(){ // Génère la cible
    const target_coordinates = generateFreeRandomCoordinates(); // On génère des coordonnées aléatoires pour la cible
    REAL.target = new Object(target_coordinates.x, target_coordinates.y, "img/target.png", "target", "target");
    setRealLocation(REAL.target, REAL.target.x(), REAL.target.y());
}