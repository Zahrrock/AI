function Object(x, y, src, id, className){ // Génère un objet contenant une image et des méthodes renvoyant les coordonnées x et y
    this.image = generateImg(x, y, src, id, className);
    this.x = function(){
        const image = document.getElementById(id)
        const image_style_left = image.style.left;
        const x = transformCssCoordinateIntoJsCoordinate(image_style_left);
        return x;
    };
    this.y = function(){
        const image = document.getElementById(id)
        const image_style_top = image.style.top;
        const y = transformCssCoordinateIntoJsCoordinate(image_style_top);
        return y;
    };
}
function generateImg(x, y, src, id, className){ // Génère une image 
    const image = document.createElement("img");
    image.src = src;
    image.id = id;
    image.className = className;
    image.style.width = String(ENV.CELL_WIDTH_AND_HEIGHT)+"%";
    setImgPosition(image, x, y);
    ENV.div_game.appendChild(image);
    return image;
}
function setImgPosition(image, x, y){ // Modifie la position d'une image
    image.style.left = x + '%';
    image.style.top = y + '%';
}
function transformCssCoordinateIntoJsCoordinate(coordinate){ // Transforme la coordonnées css (string avec une unité) en coordonnée utilisable par le programme (un nombre)
    const css_coordinate = coordinate; // par exemple, css_coordinate = "-55%"
    let js_coordinate = "";
    for (let i = 0; i < css_coordinate.length-1; i++) { // permet de garder tout, sauf l'unité
        const type = css_coordinate[i];
        js_coordinate = js_coordinate.concat(type);
    }
    js_coordinate = Number(js_coordinate); // on reconverti la coordonnée en nombre
    return js_coordinate;
}

function generateFreeRandomCoordinates(){ // Renvoie des coordonnées aléatoire non occupées par un obstacle
    const random_number = randomNumber(0, ENV.Free_Rectangles.length-1);
    const random_free_rectangle = ENV.Free_Rectangles[random_number]; // on récupère les coordonnées d'un rectangle libres (car par définition, ces coordonnées ne sont pas occupées par un obstacle)
    const random_coordinates = {
        x : random_free_rectangle.x(),
        y : random_free_rectangle.y()
    }
    return random_coordinates;
}
function randomNumber(min = 0, max = 1) { // Génère un nombre aléatoire en un minimum et un maximum donnés
    return Math.round(Math.random() * (max - min) + min);
}

function ObjectsCoordinatesMatching(first_obj, second_obj){ // Compare les coordonnées de deux objets
    if(typeof(first_obj.x) === "function" && typeof(second_obj.x) === "function"){ // les deux objets ont des fonctions pour coordonées uniquement si ils appartiennent à ENV{}
        if (first_obj.x() === second_obj.x() && first_obj.y() === second_obj.y()) {
            return true;
        }
        else{
            return false;
        }
    }
    else if(typeof(first_obj.x) === "function" && typeof(second_obj.x) === "number"){
        if (first_obj.x() === second_obj.x && first_obj.y() === second_obj.y) {
            return true;
        }
        else{
            return false;
        }
    }
    else if(typeof(first_obj.x) === "number" && typeof(second_obj.x) === "function"){
        if (first_obj.x === second_obj.x() && first_obj.y === second_obj.y()) {
            return true;
        }
        else{
            return false;
        }
    }
    else if(typeof(first_obj.x) === "number" && typeof(second_obj.x) === "number"){
        if (first_obj.x === second_obj.x && first_obj.y === second_obj.y) {
            return true;
        }
        else{
            return false;
        }
    }
}

function isLocationUndefined(x, y, map){ // vérifie si un emplacement est libre (si le joueur peut aller dessus)
    const element = map[x][y];
    if(element === undefined || element === null){ // si l'emplacement n'a pas été défini (si il n'y a encore aucun obstacle)
        return true;
    }
    else{ // sinon
        return false;
    }
}