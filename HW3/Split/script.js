TILE_SIZE = 64; //only global for debugging purposes, used in main's board creation and global.pixel_to_tile() for debugging

class main {
    constructor() {
        this.consoleSection = document.getElementById("console");

        // Get location of canvas
        const canvas_x = ctx.canvas.getBoundingClientRect().left;
        const canvas_y = ctx.canvas.getBoundingClientRect().top;
        
        const board = new Board(canvas_x, canvas_y, ctx.canvas.width, ctx.canvas.height, TILE_SIZE);

        // Add player and enemies to board
        const player = new Player("Player", 0, 0, 64, "images/player.png", 100, 10, 50);
        board.add_entity(player);

        const enemies = [];
        for (let i = 0; i < 3; i++) {
            const enemy_name = `enemy${i+1}`;
            // Randomize health, armor, and attack power
            var hp = Math.floor(Math.random() * 100) + 50; // 50-150
            var armor = Math.floor(Math.random() * 10) + 5; // 5-15
            var attack_power = Math.floor(Math.random() * 10) + 5; // 5-15

            const enemy = new Enemy(enemy_name, 0, 0, 64, `images/${enemy_name}.png`, hp, armor, attack_power)
            board.add_entity(enemy);
            enemies.push(enemy);
        }

        // Add obstacles to board
        const obstacles = [];
        for (let i = 0; i < 5; i++) {
            const obstacle_name = `obstacle${i+1}`;
            const obstacle = new Obstacle(obstacle_name, 0, 0, 64);
            board.add_entity(obstacle);
            obstacles.push(obstacle);
        }        
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

        // Initialize tiles to empty
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
    add_entity(entity, attempts_remaining=5) {
        // Randomize entity location
        var x = Math.floor(Math.random() * this.width/this.tile_size) * this.tile_size;
        var y = Math.floor(Math.random() * this.height/this.tile_size) * this.tile_size;

        // Check if a tile is occupied
        var tile_x = pixel_to_tile(x);
        var tile_y = pixel_to_tile(y);
        var tile = this.tiles[tile_y][tile_x];

        // Tile already occupied, try again up to 5 times
        if (tile.entity) {
            if (attempts_remaining <= 0) {
                console.log(`Failed to add entity ${entity.name} after 5 attempts`);
                return;
            }
            this.add_entity(entity, attempts_remaining=attempts_remaining-1);
            return;
        }

        //Occupy, move, and render
        tile.entity = entity;
        entity.move(x, y);
        entity.render();

        console.log(`Entity ${entity.name} added at (${tile_x}, ${tile_y})`);
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
}

class Entity {
    constructor(name, x, y, width_height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width_height = width_height;
        
        console.log(`Entity ${name} created`);
    }

    move(x, y) {
        console.log(`Entity ${this.name} moved from (${pixel_to_tile(this.x)}, ${pixel_to_tile(this.y)}) to (${pixel_to_tile(x)}, ${pixel_to_tile(y)})`);
        this.x = x;
        this.y = y;
    }
}

class Obstacle extends Entity {
    constructor(name, x, y, width_height) {
        super(name, x, y, width_height);
        this.obstacle_type = "tree";
        // 50% chance of being a brick wall instead
        if (Math.random() < 0.5) {
            this.obstacle_type = "brick wall";
        }

        console.log(`Obstacle ${name} with type ${this.obstacle_type} created`);
    }

    render() {
        if (this.obstacle_type === "tree") {
            this.render_tree();
        } else if (this.obstacle_type === "brick wall") {
            this.render_brick_wall();
        }

        console.log(`Obstacle ${this.name} rendered at (${this.x}, ${this.y})`);
    }

    render_tree() {
        // Draw green triangle for tree top
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.moveTo(this.x, this.y + this.width_height/2); //bottom left
        ctx.lineTo(this.x + this.width_height, this.y + this.width_height/2); //bottom right
        ctx.lineTo(this.x + this.width_height/2, this.y) // top center
        ctx.fill();
        ctx.closePath();
        
        // Move to center bottom to draw brown tree trunk
        this.trunk_width = this.width_height/7;
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.moveTo(this.x + this.width_height/2 - this.trunk_width/2, this.y + this.width_height/2); //bottom left
        ctx.lineTo(this.x + this.width_height/2 + this.trunk_width/2, this.y + this.width_height/2); //bottom right
        ctx.lineTo(this.x + this.width_height/2 + this.trunk_width/2, this.y + this.width_height); //top right
        ctx.lineTo(this.x + this.width_height/2 - this.trunk_width/2, this.y + this.width_height); //top left
        ctx.fill();
        ctx.closePath();
    }

    render_brick_wall() {
        // Draw brick wall
        //reddish brown
        ctx.fillStyle = "#CD5C5C";
        ctx.fillRect(this.x, this.y, this.width_height, this.width_height);
    }
}

class Character extends Entity {
    constructor(name, x, y, width_height, img_source, max_health, armor, attack_power) {
        super(name, x, y, width_height);
        this.max_health = max_health;
        this.current_health = max_health;
        this.armor = armor;
        this.attack_power = attack_power;
        this.img = new Image();
        this.img.src = img_source;
        console.log("Character created");
    }

    render() {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y);
        }

        console.log(`Character ${this.name} rendered at (${this.x}, ${this.y})`);
    }
}

class Player extends Character {
    constructor(name, x, y, width_height, img_source, max_health, armor, attack_power) {
        super(name, x, y, width_height, img_source, max_health, armor, attack_power);
        console.log("Player created");
    }


}

class Enemy extends Character {
    constructor(name, x, y, width_height, img_source, max_health, armor, attack_power) {
        super(name, x, y, width_height, img_source, max_health, armor, attack_power);
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
    constructor(name, x, y, width_height, img_source, on_pickup_effect) {
        super(name, x, y, width_height, img_source);
        this.on_pickup_effect = on_pickup_effect;
        console.log("Item created");
    }
}