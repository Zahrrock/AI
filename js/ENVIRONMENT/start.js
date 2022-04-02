function startENV(){ // Génère tous les objets de l'environnement
    setENVObject();
    generateMapFrame(); // Génère le cadre de la map, composé d'obstacles
    generateObstacles(); // génère les obstacles
    generateFreeRectangles(); // génère les emplacements libres
    generatePlayer(); // génère le joueur
    generateTarget(); // génère la cible
}

function setENVObject(){ // Sets the ENV object. It will store all the datas that are needed for the program. In theory AI is able to access it, but musn't to so to be autonomous
    ENV = { // Variables qui servent à créer l'environnement. L'AI n'a pas le droit d'y accéder
        Locations : createLocationMap(), // a Map() object that is used to store the content of every location 
        Obstacles : [], // stores all the obstacles of the map (the obstacles in the map, and those that compose the map frame)
        Free_Rectangles : [], // stores all the free rectangles of the map on which the player can go
        player: undefined, // stores the player object. It is defined in generation_functions/player.js
        target: undefined, // stores the target object. It is defined in generation_functions/target.js
        MAP_OBSTACLE_NUMBER : 40, // defines the number of obstacle we need to generate.
        FRAME_OBSTACLE_NUMBER : undefined, // stores the number of obstacles that compose the frame of the map. It is defined few lines later
        ROW_AND_COLUMN_NUMBER : 20,  // stores the number of row and column the map has. Note that there are as much columns as rows, so the map is a square
        CELL_WIDTH_AND_HEIGHT : undefined, // stores the width and the height of the rows and columns. Note that their width is equal to their height. So the cells that compose the map are squares
        div_game: document.querySelector("#game"), // stores the div in which every object of the map in pushed
    }
    ENV.CELL_WIDTH_AND_HEIGHT = 100/ENV.ROW_AND_COLUMN_NUMBER; // set the width and height of the cells that compose the map according to the columns and rows number
}

