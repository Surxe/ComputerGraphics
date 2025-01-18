TILE_SIZE = 64; //only global for debugging purposes, used in main's board creation and global.pixel_to_tile() for debugging

class main {
    constructor() {
        this.consoleSection = document.getElementById("console");

        // Get location of canvas
        const canvas_x = ctx.canvas.getBoundingClientRect().left;
        const canvas_y = ctx.canvas.getBoundingClientRect().top;

        this.tile_size = TILE_SIZE;
        
        this.board = new Board(canvas_x, canvas_y, ctx.canvas.width, ctx.canvas.height, this.tile_size);

        // Add player and enemies to board
        this.player = new Player("player", 0, 0, this.tile_size, "images/player.png", 100, 10, 50);
        this.board.add_entity(this.player);

        this.enemies = [];
        for (let i = 0; i < 3; i++) {
            var enemy_name = `enemy${i+1}`;
            // Randomize health, armor, and attack power
            var hp = Math.floor(Math.random() * 100) + 50; // 50-150
            var armor = Math.floor(Math.random() * 5); // 1-5
            var attack_power = Math.floor(Math.random() * 5) + 10; // 11-15

            var enemy = new Enemy(enemy_name, 0, 0, this.tile_size, `images/${enemy_name}.png`, hp, armor, attack_power)
            this.board.add_entity(enemy);
            this.enemies.push(enemy);
        }

        // Add obstacles to board
        this.obstacles = [];
        for (let i = 0; i < 5; i++) {
            var obstacle_name = `obstacle${i+1}`;
            var obstacle = new Obstacle(obstacle_name, 0, 0, this.tile_size);
            this.board.add_entity(obstacle);
            this.obstacles.push(obstacle);
        }  

        // Map the direction to x and y increments
        this.shifts = {
            "Up": [0, -this.tile_size],
            "Down": [0, this.tile_size],
            "Left": [-this.tile_size, 0],
            "Right": [this.tile_size, 0]
        }
    }

    // Determine the direction the player should move before ticking gamestate
    move_player(direction_string) {
        var tick_results = this.tick(this.shifts[direction_string][0], this.shifts[direction_string][1]);
        this.consoleSection.innerHTML = tick_results;
    }

    log_board_state() {
        console.log(this.board.get_board_state());
    }

    // Tick the game state and move the player in the determined direction
    tick(player_x_shift, player_y_shift) {
        // Determine players would-be new location
        var new_x = this.player.x + player_x_shift;
        var new_y = this.player.y + player_y_shift;

        // Move character
        this.attempt_move(this.player, new_x, new_y);
        if (this.player.current_health <= 0) {
            return "Game Over!";
        }

        // Move enemies
        var num_dead_enemies = 0;
        for (let i = 0; i < this.enemies.length; i++) {
            // Randomize enemy movement (up, down, left, right)
            var rand = Math.floor(Math.random() * 4);
            var enemy = this.enemies[i]
            if (enemy.current_health <= 0) {
                num_dead_enemies++;
                continue;
            }

            var new_x = enemy.x + this.shifts[Object.keys(this.shifts)[rand]][0];
            var new_y = enemy.y + this.shifts[Object.keys(this.shifts)[rand]][1];

            this.attempt_move(enemy, new_x, new_y);
        }

        this.log_board_state();

        if (num_dead_enemies === this.enemies.length) {
            return "You Win!";
        }

        return "";
    }

    attempt_move(character, new_x, new_y) {
        // Check if the new location is within the canvas
        if (new_x < 0 || new_x >= ctx.canvas.width || new_y < 0 || new_y >= ctx.canvas.height) {
            console.log("Character cannot move out of bounds");
            return;
        }

        var current_tile_x = pixel_to_tile(character.x);
        var current_tile_y = pixel_to_tile(character.y);
        var new_tile_x = pixel_to_tile(new_x);
        var new_tile_y = pixel_to_tile(new_y);

        // Check if the new location is occupied
        var existing_entity = this.board.tiles[pixel_to_tile(new_y)][pixel_to_tile(new_x)].entity;
        if (existing_entity instanceof Obstacle) {
            console.log("Obstacle occupied at new location: ", existing_entity);
            return
        }

        // if player moves onto an enemy or vice versa, damage them
        else if (((existing_entity instanceof Player) && (character instanceof Enemy)) || ((existing_entity instanceof Enemy) && (character instanceof Player))) {
            console.log(`${character.name} is damaging ${existing_entity.name} at: (${new_x}, ${new_y})`);
            var char_remains = existing_entity.damaged_by(character);
            if (char_remains) { //is still alive
                console.log(`${existing_entity.name} has ${existing_entity.current_health} health remaining`);
            }
            else { //has died
                this.board.tiles[pixel_to_tile(new_y)][pixel_to_tile(new_x)].entity = null;
            }
        }
        else if (existing_entity instanceof Item) {
            console.log("Item occupied at new location: ", existing_entity);
        }
        // Ensure all possible entities are handled
        else if (existing_entity) {
            console.log("Entity occupied at new location of unhandled instance: ", existing_entity);
            return
        }

        // Not occupied
        // Move character to new location
        console.log("Moving character to new unoccupied location");
        this.board.move_entity(current_tile_x, current_tile_y, new_tile_x, new_tile_y);
    }
}



function move_up() {
    myMain.move_player("Up");
}
function move_left() {
    myMain.move_player("Left");
}
function move_right() {
    myMain.move_player("Right");
}
function move_down() {
    myMain.move_player("Down");
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
        // Since its an initial location, move() function is not called
        tile.entity = entity;
        entity.move(x, y);
        entity.render();

        console.log(`Entity ${entity.name} added at (${tile_x}, ${tile_y})`);
    }

    move_entity(current_tile_x, current_tile_y, new_tile_x, new_tile_y) {
        // Move entity from current tile to new tile
        var current_tile = this.tiles[current_tile_y][current_tile_x];
        var new_tile = this.tiles[new_tile_y][new_tile_x];

        // Check if new tile is occupied
        if (new_tile.entity) {
            console.log("New tile is still occupied");
            return;
        }

        // Move entity
        new_tile.entity = current_tile.entity;
        current_tile.entity = null;
        new_tile.entity.move(new_tile_x*TILE_SIZE, new_tile_y*TILE_SIZE);
        new_tile.entity.render();
    }

    // Return a string representation of the board's tiles state
    get_board_state() {
        var ret = "";
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const entity = this.tiles[i][j].entity;
                if (entity) {
                    ret += entity.name[0];
                } else {
                    ret += " ";
                }
            }
            ret += "\n";
        }

        return ret;
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
        this.erase();
        
        console.log(`Entity ${this.name} moved from [${this.x}, ${this.y}](${pixel_to_tile(this.x)}, ${pixel_to_tile(this.y)}) to [${x}, ${y}](${pixel_to_tile(x)}, ${pixel_to_tile(y)})`);
        this.x = x;
        this.y = y;
    }

    erase() {
        ctx.clearRect(this.x, this.y, this.width_height, this.width_height);
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
        this.img_src = img_source;
        this.img.src = this.img_src;
        console.log("Character created");
    }

    damaged_by(attacking_character) {
        // Calculate damage
        var damage = (attacking_character.attack_power - this.armor) * Math.random() * 5+1;
        if (damage < 0) {
            damage = 1;
        }

        // Apply damage
        this.current_health -= damage;
        console.log(`${this.name} took ${damage} damage from ${attacking_character.name}`);
        if (this.current_health <= 0) {
            console.log(`${this.name} has died`);
            this.erase();
            return false; //dead
        }
        return true; //alive
    }

    render() {
        this.img.src = this.img_src;
        // Draw new image
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.width_height, this.width_height);
            this.render_health_bar();
        }

        console.log(`Character ${this.name} rendered at (${this.x}, ${this.y})`);
    }

    render_health_bar() {
        // Draw health bar
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y+1, this.width_height, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y+1, this.width_height * (this.current_health / this.max_health), 5);
        ctx.closePath();
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