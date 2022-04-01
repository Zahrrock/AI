// Cette fonction ne devrait pas vraiment être dans le dossier affilié à l'IA, car il utilise des données de REAL{}. L'IA choisit bien de regarder ou pas, mais ce qui lui est renvoyé ne dépend pas d'elle, il faudrait changer de place ce fichier.
function look(){ // Ajoute à la mémoire de l'IA les nouveaux objets visibles
    for (let i = 0; i < 9; i++) { // Pour tous les emplacements autour du joueur et l'emplacement du joueur lui-même
        const location_to_check = {};
        switch (i) { // On définit les coordonnées de chaque emplacement à vérifier
            case 0: // Carré au centre
                location_to_check.x = IA.I.x
                location_to_check.y = IA.I.y
                break;
            case 1: // Carré au dessu à gauche
                location_to_check.x = IA.I.x-5
                location_to_check.y = IA.I.y-5
                break;
            case 2: // Carré au dessu
                location_to_check.x = IA.I.x
                location_to_check.y = IA.I.y-5
                break;
            case 3: // Carré au dessu à droite
                location_to_check.x = IA.I.x+5
                location_to_check.y = IA.I.y-5
                break;
            case 4: // Carré au dessous à gauche
                location_to_check.x = IA.I.x-5
                location_to_check.y = IA.I.y+5
                break;
            case 5: // Carré au dessous
                location_to_check.x = IA.I.x
                location_to_check.y = IA.I.y+5
                break;
            case 6: // Carré au dessous à droite
                location_to_check.x = IA.I.x+5
                location_to_check.y = IA.I.y+5
                break;
            case 7: // Carré à gauche
                location_to_check.x = IA.I.x-5
                location_to_check.y = IA.I.y
                break;
            case 8: // Carré à droite
                location_to_check.x = IA.I.x+5
                location_to_check.y = IA.I.y
                break;
            default:
                console.log("ERREUR au switch statement, i = ", i);
                break;
        }
        const player_key = transformCoordinatesIntoKey(location_to_check.x, location_to_check.y);
        if(IA.Locations.get(player_key) === undefined){ // Si l'IA ne sait pas ce qui se trouve à cet emplacement. Il faudra retirer cette condition quand les objets commenceront à bouger dans la map
            const real_key = transformCoordinatesIntoKey(location_to_check.x + REAL.player.position_record.x[0], location_to_check.y + REAL.player.position_record.y[0]); // Récupérer ce qu'il ya vraiment à cet emplacement
            const object_on_location = REAL.Locations.get(real_key);
            IA.Locations.set(player_key, object_on_location); // l'enregistrer dans la mémoire de l'IA
            if(object_on_location === undefined){ // si object_on_location est indéfini dans REAL.Locations, il y a un problème quelque part
                console.error("object_on_location === undefined");
            }
        }
    }
}
