class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        this.consoleSection.innerHTML += "<br>main class is created<br>";
    }
    
    classFunction() {
        
    }

    handleClick() {
        this.consoleSection.innerHTML += "<br>Button is clicked<br>";
    }
}

function onClick() {
    myMain.handleClick();
}

class Entity() {
    constructor() {

    }
}

class Character() {
    constructor() {

    }
}

class Player() {
    constructor() {

    }
}

class Enemy() {
    constructor() {

    }
}

class Item() {
    constructor() {

    }
}