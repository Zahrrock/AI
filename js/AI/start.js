function startAI(){ // Déclenche le début du fonctionnement de l'AI. La fonction n'est éxécutée qu'après avoir générer le terrain
    createAIObject(); 
    look(); // Il faut que l'AI regarde tout de suite autour d'elle en arrivant
}
function updateAI(){
    
    window.requestAnimationFrame(updateAI);
}



function createAIObject(){ // Génère l'objet que l'AI pense être
    AI = { // L'AI ne doit pouvoir aller chercher des informations qu'ici, pour plus de réalisme et de crédibilité
        I : {
            x : 0, // Au début, l'AI se place à (0;0), ce qui créer un décalage entre l'origine de son repère à elle et de ENV{}. Les conséquences de ce décalage ne sont pas encore toutes réglées
            y : 0, 
        },
        Locations : new Map(),
        actual_discovering_rank : -1,
        Locations_to_discover : [],
        target: { // stores the target object.
            x : undefined,
            y : undefined
        },
        // target: { // stores the target object.
        //     x : randomNumber(-10, 10)*5, // 
        //     y : randomNumber(-10, 10)*5  //
        // },
        Target_search : {},
    }
    // console.log("target : ", AI.target);
    // generateTarget();
}

// function generateTarget(){ // Génère la cible
//     const real_coordinate_x = AI.target.x + ENV.player.position_record.x[0]; // Les coordonnées de target selon le repère réel
//     const real_coordinate_y = AI.target.y + ENV.player.position_record.y[0]; // 
//     ENV.target = new Object(real_coordinate_x, real_coordinate_y, "img/target.png", "target", "target");
//     setRealLocation(ENV.target, ENV.target.x(), ENV.target.y());
// }