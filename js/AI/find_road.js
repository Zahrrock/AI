function startRoadSearching(){
    // console.log("Find a Road");
    AI.Target_search.Search_rectangles = [];
    AI.Target_search.Road = [];
    AI.Target_search.searchActive = true;
    AI.recursion = 0;
    createCarreChemin(AI.I.x, AI.I.y, AI.I);
    UpdateSearch();
}

function UpdateSearch(){ // Faire avancer tous les chemins
    AI.recursion ++;
    if(AI.Target_search.searchActive && AI.recursion < 20){
        // console.log('UpdateSearch ************************************************************************');
        const length = AI.Target_search.Search_rectangles.length; // Utile car AI.Target_search.Search_rectangles.length va changer avant la fin de la boucle
        for (let i = 0; i < length; i++) { // Pour tout les carrés chemins
            const carre = AI.Target_search.Search_rectangles[i];
            if(carre.actif === true){ // Si le carré chemin est actif
                // console.log("AI.Target_search.Search_rectangles[", i, "] = ", carre);
                updateChemin(carre); // essayer de créer des carrés chemins à cotés
            }
        }
        // console.log("fin UpdateSearch*********************************************************************")
        // window.requestAnimationFrame(UpdateSearch);
        UpdateSearch();
    }
    else if(AI.recursion >= 20){
        console.error("TOO MUCH RECURSION : ", AI.recursion);
    }
    else{
        // Nothing
    }
}

function updateChemin(carre){
    // console.log('UpdateChemin()');
    CarresCheminACreer = trouverCarresCheminACreer(carre); // On récupère tous les emplacements sur lesquels ont pourrait créer un nouveau carré chemin
    // console.log(CarresCheminACreer.length);
    if(CarresCheminACreer.length > 0){ // Si on a trouvé un ou plusieurs emplacements libres 
        for (let i = 0; i < CarresCheminACreer.length; i++) { // Pour chaque emplacement libre 
            if(AI.Target_search.searchActive){
                const carreCheminACreer = CarresCheminACreer[i];
                createCarreChemin(carreCheminACreer.x, carreCheminACreer.y, carre); // Créer un carré chemin à  cet emplacement
            }
        }
    }
    else{ // Si on n'a pas trouvé d'emplacement libre 
        // console.log("Le carré chemin ", carre, " n'a pas trouvé d'emplacement libre où créer de nouveaux carrés chemins'");
    }
    carre.actif = false; // Ca sert plus à rien de laisser ce carré actif puisque soit on a créé tout ce qu'on pouvait à côté, soit on a rien trouvé à créer parce que ça a déjà été fait
}

function trouverCarresCheminACreer(carre){
    // console.log("trouverCarresCheminACreer()");
    const CarresCheminACreer = [];
    for (let i = 0; i < 4; i++) { // Pour tous les carrés qui entourent notre carré chemin
        // console.log("i = ", i);
        emplacementTest = {};
        switch (i) {
            case 0: // Carré au dessus
                emplacementTest.x = carre.x;
                emplacementTest.y = carre.y-ENV.CELL_WIDTH_AND_HEIGHT;
                break;
            case 1: // Carré à droite
                emplacementTest.x = carre.x+ENV.CELL_WIDTH_AND_HEIGHT;
                emplacementTest.y = carre.y;
                break;
            case 2: // Carré au dessous
                emplacementTest.x = carre.x;
                emplacementTest.y = carre.y+ENV.CELL_WIDTH_AND_HEIGHT;
                break;
            case 3: // Carré à gauche
                emplacementTest.x = carre.x-ENV.CELL_WIDTH_AND_HEIGHT;
                emplacementTest.y = carre.y;
                break;
            default:
                console.log("ERREUR au switch statement, i = ", i);
                break;
        }
        // console.log("Emplacement test : x = ", emplacementTest.x, " y = ", emplacementTest.y);
        if(isLocationFree(emplacementTest.x, emplacementTest.y, AI.Locations)){ // si aucun obstacle ne se trouve à cet emplacement 
            let nombre_carre_testes = 0;
            for (const carreCheminTeste of AI.Target_search.Search_rectangles) { // Pour tous les carrés chemin existants dans la liste AI.Target_search.Search_rectangles[]
                if(emplacementTest.x === carreCheminTeste.x && emplacementTest.y === carreCheminTeste.y){ // Si un des carré chemin a les mêmes coordonnées que l'emplacement qu'on teste
                    // console.log("Pour le carré ", carre, 'meme coordonnées pour entre ', carreCheminTeste, " et l'emplacement testé");
                    break; // Ca sert à rien de continuer à chercher, il existe déjà un carré chemin à cet emplacement un à cet emplacement
                }
                else{
                    nombre_carre_testes +=1; // Sinon recommence la boucle en comptant 1 de plus au nombre de carré qu'on a testé
                }
            }
            // console.log('nombre_carres_testes', nombre_carre_testes);
            if(nombre_carre_testes === AI.Target_search.Search_rectangles.length){ // Si on a pas trouvé en ayant testé les coordonnées avec tous les carrés chemin
                // console.log("Ajout d'un carré à la liste");
                CarresCheminACreer.push(emplacementTest); // Ca veut dire que l'emplacement testé est inexploré. On l'ajoute à la liste
            }
            // Sinon ça veut dire qu'on a trouvé un carré chemin à cet emplacement. On est alors pas rentré dans le if juste au dessus parce qu'on a trouvé un carré chemin à cet emplacement
        }
            
    }
    // console.log("Pour le carré ", carre, " La liste des carrés à créer est ", CarresCheminACreer);
    return CarresCheminACreer; // Une fois qu'on a fini de tester tous les emplacements autour du carré chemin, on retourne la liste contenant tout les emplacements libres où on peut créer des carrés chemin
}

function createCarreChemin(x, y, parent){ // x et y en %
    const player_coordinate_x = x + ENV.player.position_record.x[0]; // Les coordonnées du search_rectangle selon le repère du player
    const player_coordinate_y = y + ENV.player.position_record.y[0]; // 
    const carreChemin = new Object(player_coordinate_x, player_coordinate_y, "img/rectangle_chemin.png", "rectangle_chemin" + String(AI.Target_search.Search_rectangles.length), "rectangle_chemin"); // génère le carré chemin
    carreChemin.actif = true;
    carreChemin.parent = parent;
    carreChemin.x = x;
    carreChemin.y = y;
    AI.Target_search.Search_rectangles.push(carreChemin);
    verifierArrivee(carreChemin);
}
function verifierArrivee(carreChemin){
    // console.log("verifierArrivee()");
    if(ObjectsCoordinatesMatching(carreChemin, AI.target)){
        AI.Target_search.searchActive = false;
        AI.Target_search.Road.push(carreChemin);
        let carreCheminParent = carreChemin;
        // console.log(carreChemin.x, carreChemin.y);
        while (!ObjectsCoordinatesMatching(carreCheminParent, AI.I)) {// tant qu'on ne trouve pas le carré chemin originel
            carreCheminParent = AI.Target_search.Road[AI.Target_search.Road.length - 1].parent;
            AI.Target_search.Road.push(carreCheminParent);
        }
        AI.Target_search.Road.reverse();
        // console.log("Road : ", AI.Target_search.Road, " length : ", AI.Target_search.Road.length);
        deleteCarresInutiles();
    }
}
function deleteCarresInutiles(){
    // console.log('deleteCarresInutiles');
    for (let i = 0; i < AI.Target_search.Search_rectangles.length; i++) { // pour tous les carrés de CarresChemins[] (dont on veut supprimer une bonne partie)
        const carre = AI.Target_search.Search_rectangles[i];
        let nombre_carres_testes = 0;
        for (let j = 0; j < AI.Target_search.Road.length; j++) { // pour tous les carrés de Chemins[] (qu'on veut garder)
            const carreNonSupprimable = AI.Target_search.Road[j];
            if(carre === carreNonSupprimable){  // si le carré correspond à un carré qu'on veut garder
                // console.log("Carre non supprimable : ", carre, "parce que  : ", carreNonSupprimable);
                break; // on ne va pas plus loin
            }
            else{
                nombre_carres_testes +=1;
            }
        }
        if (nombre_carres_testes === AI.Target_search.Road.length) { // si le carré ne correspond à aucun carré qu'on veut garder
            ENV.div_game.removeChild(carre.image); // le supprimer du DOM
            // AI.Target_search.Search_rectangles.splice(i, 1) // le supprimer de la liste
        }
    }
}
function isSuperposition(r1, r2) {
    return !(
        r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top
    );
}