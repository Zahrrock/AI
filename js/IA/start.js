function startIA(){ // Déclenche le début du fonctionnement de l'IA. La fonction n'est éxécutée qu'après avoir générer le terrain
    createIAObject(); 
    look(); // Il faut que l'IA regarde tout de suite autour d'elle en arrivant
    window.addEventListener("keydown", onKeyDown);
}

function createIAObject(){ // Génère l'objet que l'IA pense être
    IA = { // L'IA ne doit pouvoir aller chercher des informations qu'ici, pour plus de réalisme et de crédibilité
        I : {
            x : 0, // Au début, l'IA se place à (0;0), ce qui créer un décalage entre l'origine de son repère à elle et de REAL{}. Les conséquences de ce décalage ne sont pas encore toutes réglées
            y : 0, 
        },
        Locations : new Map(),
    }
}
