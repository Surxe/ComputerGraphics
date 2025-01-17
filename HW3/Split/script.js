TILE_SIZE = 64; //only global for debugging purposes, used in main's board creation and global.pixel_to_tile() for debugging

class main {
    constructor() {
        this.consoleSection = document.getElementById("console");

        // Get location of canvas
        const canvas_x = ctx.canvas.getBoundingClientRect().left;
        const canvas_y = ctx.canvas.getBoundingClientRect().top;
        
        const board = new Board(canvas_x, canvas_y, ctx.canvas.width, ctx.canvas.height, TILE_SIZE);

        const player = new Player("Player", 0, 0, "images/player.png", 100, 10, 10);
        board.add_entity(player);
        player.render();

        const enemies = [];
        for (let i = 0; i < 3; i++) {
            const enemy_name = `enemy${i+1}`;
            const enemy = new Enemy(enemy_name, 100, 100*i, `images/${enemy_name}.png`, 100, 10, 10)
            board.add_entity(enemy);
            enemy.render();
            enemies.push(enemy);
        }
        
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

// Translate pixel location to tile location, for debugging, though this could debatebly go in a utility class
function pixel_to_tile(pixel) {
    return Math.floor(pixel / TILE_SIZE);
}

class Board {
    constructor(x, y, width, height, tile_size) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tile_size = tile_size;
        this.tiles = [[]];

        // Create tiles that each hold no entity
        for (let i = 0; i < this.height / this.tile_size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.width / this.tile_size; j++) {
                this.tiles[i][j] = new Tile(this.x + j * this.tile_size, this.y + i * this.tile_size, this.tile_size);
            }
        }

        console.log(`Board created with ${this.tiles.length} rows and ${this.tiles[0].length} columns`);
    }

    // Add an entity to the board
    // [0, 64, 128, ... , 512] //increments is width/height, 0 is min, max is 1 increment less than tile size
    add_entity(entity) {
        // Randomize entity location
        var x = Math.floor(Math.random() * this.width/this.tile_size) * this.tile_size;
        var y = Math.floor(Math.random() * this.height/this.tile_size) * this.tile_size;

        // Check if a tile is occupied
        var tile_x = pixel_to_tile(x);
        var tile_y = pixel_to_tile(y);
        var tile = this.tiles[tile_y][tile_x];

        // Tile already occupied, try again
        if (tile.entity) {
            this.add_entity(entity);
            return;
        }

        tile.entity = entity; //occupy the tile with this entity
        entity.move(x, y); //move the entity to this location

        console.log(`Entity ${entity.name} added at (${tile_x}, ${tile_y})`);
    }

    render_tiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].render();
            }
        }
    }

}

class Tile {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.border_width = 1;
        this.entity; //tiles start blank

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

        console.log("Tile created");
    }

    render() {
        if (this.entity) {
            this.entity.render();
        }
    }
}

class Entity {
    constructor(name, x, y, img_source) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img_source;
        console.log(`Entity name created`);
    }

    render() {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y);
        }
    }

    move(x, y) {
        console.log(`Entity ${this.name} moved from (${pixel_to_tile(this.x)}, ${pixel_to_tile(this.y)}) to (${pixel_to_tile(x)}, ${pixel_to_tile(y)})`);
        this.x = x;
        this.y = y;
    }
}

class Character extends Entity {
    constructor(name, x, y, img_source, max_health, armor, attack_power) {
        super(name, x, y, img_source);
        this.max_health = max_health;
        this.current_health = max_health;
        this.armor = armor;
        this.attack_power = attack_power;
        console.log("Character created");
    }
}

class Player extends Character {
    constructor(name, x, y, img_source, max_health, armor, attack_power) {
        super(name, x, y, img_source, max_health, armor, attack_power);
        console.log("Player created");
    }


}

class Enemy extends Character {
    constructor(name, x, y, img_source, max_health, armor, attack_power) {
        super(name, x, y, img_source, max_health, armor, attack_power);
        console.log("Enemy created");
    }
}

class Effect {
    constructor(attribute, value) {
        this.attribute = attribute;
        this.value = value;
        console.log("Effect created");
    }
}

class Item extends Entity {
    constructor(name, x, y, img_source, on_pickup_effect) {
        super(name, x, y, img_source);
        this.on_pickup_effect = on_pickup_effect;
        console.log("Item created");
    }
}