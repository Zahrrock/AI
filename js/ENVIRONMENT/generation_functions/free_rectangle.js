// A quoi servent réellement les free_rectangles ? Sont-ils vraiment indispensables ? A-t-on besoin d'indiquer par un objet qu'un emplacement est vide ? il pourrait juste être undefined. Mais undefined veut dire qu'on ne sait pas ce qu'il y a, alors que là on sait : il n'y a rien.
function generateFreeRectangles(){ // Génère tous les emplacements libres possibles
    // console.log("Start of free rectangles generation");
    const tested_coordinates = {};
    // Ces boucles vont tester tous les emplacments de la map et essayer d'un placer des rectangles libres
    for (let i = 0; i < REAL.ROW_AND_COLUMN_NUMBER; i++) { // pour tous les x de la map
        tested_coordinates.x = i*REAL.CELL_WIDTH_AND_HEIGHT;
        for (let j = 0; j < REAL.ROW_AND_COLUMN_NUMBER; j++) { // pour tous les y de la map
            tested_coordinates.y = j*REAL.CELL_WIDTH_AND_HEIGHT;
            if(isLocationUndefined(tested_coordinates.x, tested_coordinates.y, REAL.Locations)){ // condition vérifiée si l'emplacement n'a pas été défini (s'il n'y a pas encore d'obstacle dessus)
                generateOneFreeRectangle(tested_coordinates.x, tested_coordinates.y);
            }
        }
    }
}
function generateOneFreeRectangle(x, y){ // Génère un rectangle libre et l'inclut à l'environnement
    const free_rectangle = new Object(x, y, "img/free_rectangle.png", "free_rectangle" + String(REAL.Free_Rectangles.length), "free_rectangle"); // génère le rectangle libre
    REAL.Free_Rectangles.push(free_rectangle); // l'inclut à la liste REAL.Free_Rectangles
    setRealLocation(free_rectangle, x, y); // l'inclu à REAL.Locations
}