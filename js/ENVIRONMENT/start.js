function startENVIRONMENT(){ // Génère tous les objets de l'environnement
    createENVIRONMENTObject();
    generateMapFrame(); // Génère le cadre de la map, composé d'obstacles
    generateObstacles(); // génère les obstacles
    generateFreeRectangles(); // génère les emplacements libres
    generatePlayer(); // génère le joueur
    generateTarget(); // génère la cible
}

function createENVIRONMENTObject(){
    REAL = { // Variables qui servent à créer l'environnement. L'IA n'a pas le droit d'y accéder
        Locations : createLocationMap(),
        Obstacles : [],
        Free_Rectangles : [],
        player: undefined,
        target: undefined,
        // On pourrait appeler OBSTACLE_NUMBER RANDOM_OBSTACLE_NUMBER, pour bien les différencier des FRAME_OBSTACLE_NUMBER. De même pour les fonctions qui vont avec
        OBSTACLE_NUMBER : 40, // defines the number of obstacle we need to generate.
        FRAME_OBSTACLE_NUMBER : undefined,
        ROW_AND_COLUMN_NUMBER : 20, 
        CELL_WIDTH_AND_HEIGHT : undefined,
        div_game: document.querySelector("#game"),
    }
    REAL.CELL_WIDTH_AND_HEIGHT = 100/REAL.ROW_AND_COLUMN_NUMBER;
}

