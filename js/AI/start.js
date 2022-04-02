function startAI(){ // Déclenche le début du fonctionnement de l'AI. La fonction n'est éxécutée qu'après avoir générer le terrain
    createAIObject(); 
    look(); // Il faut que l'AI regarde tout de suite autour d'elle en arrivant
    window.addEventListener("keydown", onKeyDown);
}

function createAIObject(){ // Génère l'objet que l'AI pense être
    AI = { // L'AI ne doit pouvoir aller chercher des informations qu'ici, pour plus de réalisme et de crédibilité
        I : {
            x : 0, // Au début, l'AI se place à (0;0), ce qui créer un décalage entre l'origine de son repère à elle et de ENV{}. Les conséquences de ce décalage ne sont pas encore toutes réglées
            y : 0, 
        },
        Locations : new Map(),
    }
}
