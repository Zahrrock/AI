function generateObstacles(){ // Generate all the obstacles we need. The number of generation is defined by ENV.MAP_OBSTACLE_NUMBER
    let all_obstacles_generated = 0; // On différencie all_obstacles_generated de ENV.Obstacles pour pouvoir faire tourner le script à vide (à vide = on ne génère pas réellement les obstacle). C'est donc cette variable que l'on utilise pour vérifier la condition du while
    let obstacle_generation_number = 0; // compte le nombre de tentative de génération. Si il est trop important, la génération s'arrête
    do{
        const obstacles_generated = generateFewObstacles(ENV.MAP_OBSTACLE_NUMBER - all_obstacles_generated); // Stoque le nombre d'obstacle généré en une éxécution de generateFewObstacles()
        all_obstacles_generated += obstacles_generated; // on met à jour le nombre total d'obstacle généré
        obstacle_generation_number++ ;
    }
    while(all_obstacles_generated !== ENV.MAP_OBSTACLE_NUMBER && obstacle_generation_number < 10); // on continue tant qu'on a pas le bon nombre d'obstacle générés, et tant que le script ne tourne pas excessivement en boucle
    if(obstacle_generation_number >= 10){
        console.error("nombre de tentatives de génération d'obstacles anormalement grand : risque de recursion trop fréquente");
    }
    if(ENV.Obstacles.length !== ENV.MAP_OBSTACLE_NUMBER + ENV.FRAME_OBSTACLE_NUMBER){ // Par contre, si le script tourne à vide grâce à all_obstacles_generated, on met un garde-fou pour se rappeler qu'aucun obstacle n'est réellement généré
        console.error("pas assez d'obstacles générés");
    }
}
function generateFewObstacles(obstacle_number_to_create){ // Essaie de générer tous les obstacles manquant, mais si une génération rate, elle sera re-tentée à la prochaine éxécution de cette fonction
    // console.log("Start of few obstacles generation");
    let obstacles_generated = 0;
    for (let i = 0; i < obstacle_number_to_create; i++) { // for the number of obstacles we need to create
        const tested_coordinates = {
            x: randomNumber(0, ENV.ROW_AND_COLUMN_NUMBER-1)*ENV.CELL_WIDTH_AND_HEIGHT,
            y: randomNumber(0, ENV.ROW_AND_COLUMN_NUMBER-1)*ENV.CELL_WIDTH_AND_HEIGHT,
        };
        if(isLocationUndefined(tested_coordinates.x, tested_coordinates.y, ENV.Locations)){ // condition vérifiée si l'emplacement n'a pas été défini (s'il n'y a pas encore d'obstacle dessus)
            generateOneObstacle(tested_coordinates.x, tested_coordinates.y);
            obstacles_generated++;
        }
        // si cette condition n'est pas vérifiée, alors la génération d'un obstacle a raté. Elle sera re-tentée lors de la prochaine éxécution de la fonction
    }
    return obstacles_generated; // On retourne le nombre d'obstacle qu'on a réussi à générer
}

function generateOneObstacle(x, y){ // On génère un obstacle et on l'inclue à l'environnement
    const obstacle = new Object(x, y, "img/obstacle.png", "obstacle" + String(ENV.Obstacles.length), "obstacle"); // génère un obstacle
    ENV.Obstacles.push(obstacle); // L'inclut à la liste d'obstacles
    setRealLocation(obstacle, x, y); // L'inclut à ENV.Locations
}
function generateMapFrame(){
    let frame_obstacles_number_generated = 0;
    const coordinates = {
        x:undefined,
        y:undefined
    }
    coordinates.x = -1*ENV.CELL_WIDTH_AND_HEIGHT;
    for (let i = -1; i < ENV.ROW_AND_COLUMN_NUMBER+1; i++) { // Génère la partie gauche de la limite de la map, constituée d'obstacles
        coordinates.y = i*ENV.CELL_WIDTH_AND_HEIGHT;
        generateOneObstacle(coordinates.x, coordinates.y);
        frame_obstacles_number_generated ++;
    }
    coordinates.x = ENV.ROW_AND_COLUMN_NUMBER*ENV.CELL_WIDTH_AND_HEIGHT;
    for (let i = -1; i < ENV.ROW_AND_COLUMN_NUMBER+1; i++) { // Génère la partie droite de la limite de la map, constituée d'obstacles
        coordinates.y = i*ENV.CELL_WIDTH_AND_HEIGHT;
        generateOneObstacle(coordinates.x, coordinates.y);
        frame_obstacles_number_generated ++;
    }
    coordinates.y = -1*ENV.CELL_WIDTH_AND_HEIGHT;
    for (let i = 0; i < ENV.ROW_AND_COLUMN_NUMBER; i++) { // Génère la partie haute de la limite de la map, constituée d'obstacles
        coordinates.x = i*ENV.CELL_WIDTH_AND_HEIGHT;
        generateOneObstacle(coordinates.x, coordinates.y);
        frame_obstacles_number_generated ++;
    }
    coordinates.y = ENV.ROW_AND_COLUMN_NUMBER*ENV.CELL_WIDTH_AND_HEIGHT;
    for (let i = 0; i < ENV.ROW_AND_COLUMN_NUMBER; i++) { // Génère la partie basse de la limite de la map, constituée d'obstacles
        coordinates.x = i*ENV.CELL_WIDTH_AND_HEIGHT;
        generateOneObstacle(coordinates.x, coordinates.y);
        frame_obstacles_number_generated ++;
    }
    ENV.FRAME_OBSTACLE_NUMBER = frame_obstacles_number_generated;
}