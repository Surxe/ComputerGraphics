class main {
    constructor() {
        this.consoleSection = document.getElementById("console");

        // Get location of canvas
        const canvas_x = ctx.canvas.getBoundingClientRect().left;
        const canvas_y = ctx.canvas.getBoundingClientRect().top;
        
        const board = new Board(canvas_x, canvas_y, ctx.canvas.width, ctx.canvas.height, 64);

        const player = new Player(5, 5, "images/player.png", 100, 10, 10);
        player.render();
    }
    
    classFunction() {
        
    }

    handleClick() {
        this.consoleSection.innerHTML += "<br>Button is clicked<br>";
        console.log("Button is clicked");
        
    }
}

function onClick() {
    myMain.handleClick();
}

class Board {
    constructor(x, y, width, height, tile_size) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tile_size = tile_size;
        this.tiles = [[]];

        // Create tiles
        for (let i = 0; i < this.height / this.tile_size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.width / this.tile_size; j++) {
                this.tiles[i][j] = new Tile(this.x + j * this.tile_size, this.y + i * this.tile_size, this.tile_size);
            }
        }
    }

}

class Tile {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.border_width = 1;

        // Create bounding border html element
        this.border = document.createElement("div");
        this.border.style.position = "absolute";
        this.border.style.left = this.x + "px";
        this.border.style.top = this.y + "px";
        this.border.style.width = size + "px";
        this.border.style.height = size + "px";
        this.border.style.boxShadow = `inset 0 0 0 ${this.border_width}px black`;

        // Append border to canvas
        ctx.canvas.parentElement.appendChild(this.border);
    }
}

class Entity {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img;
    }

    render() {
        const img = new Image();
        img.src = this.img;
        img.onload = () => {
            ctx.drawImage(img, this.x, this.y);
        }
    }
}

class Character extends Entity {
    constructor(x, y, img, max_health, armor, attack_power) {
        super(x, y, img);
        this.max_health = max_health;
        this.current_health = max_health;
        this.armor = armor;
        this.attack_power = attack_power;
    }
}

class Player extends Character {
    constructor(x, y, img, max_health, armor, attack_power) {
        super(x, y, img, max_health, armor, attack_power);
    }

    render() {
        super.render();
    }
}

class Enemy extends Character {
    constructor(x, y, img, max_health, armor, attack_power) {
        super(x, y, img, max_health, armor, attack_power);
    }
}

class Effect {
    constructor(attribute, value) {
        this.attribute = attribute;
        this.value = value;
    }
}

class Item extends Entity {
    constructor(x, y, img, on_pickup_effect) {
        super(x, y, img);
        this.on_pickup_effect = on_pickup_effect;
    }
}