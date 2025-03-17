game_engine = new GameEngine();

// Initial game_objects' states
// shape is square with triangle ontop
//    **
//   ****
//  ******
// ********
// ********
// ********
// ********
var positions = [
    // square base
    [-.5, -.5, 0], //bottom left
    [.5, -.5, 0], //bottom right
    [.5, .5, 0], //top right
    [-.5, .5, 0], //top left
    // triangle ontop
    [-.5, .5, 0],
    [.5, .5, 0],
    [0, 1, 0],
]
var rgb = [
    // blue square base
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    // purple triangle ontop
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
]
var rotations = [0, 0, 0]
var should_fill = true;
var position_velocity = [0, 0, 0];
var rotation_velocity = [0, 0, 0];
var indices = [
    // square base
    0, 1, 2, 
    0, 2, 3,
    // triangle ontop
    4, 5, 6,
]
var hero_entity = new Entity('TRIANGLES', rgb, positions, rotations, [.15, .15, .15], [0, 0, 0], position_velocity, rotation_velocity, indices);
var hero_trigger_boxes = [];
var hero = new Hero(hero_entity, hero_trigger_boxes);

// octagon villain
positions = [];
for (var i = 0; i < 8; i++) {
    var x = Math.cos(i * Math.PI / 4);
    var y = Math.sin(i * Math.PI / 4);
    positions.push([x, y, 0]);
}
var villain_entity = new Entity('TRIANGLE_FAN', [0, 1, 0], positions, rotations, [.10, .10, .10], [-.5, 0, 0], position_velocity, rotation_velocity, null);
var villain_trigger_boxes = [];
var villain = new Villain(villain_entity, villain_trigger_boxes);

// red wall
positions = [
    [-1, -1, 0], //bottom left
    [1, -1, 0], //bottom right
    [1, 0, 0], //top right
    [-1, 0, 0], //top left
]
var wall_entity = new Entity('TRIANGLE_FAN', [1, 0, 0], positions, rotations, [.15, .15, .15], [.3, 0, 0], position_velocity, rotation_velocity, null);
var wall_trigger_boxes = [];
var wall = new Obstacle(wall_entity, wall_trigger_boxes);


game_engine.add_entity(villain_entity);
game_engine.add_entity(hero_entity);
game_engine.add_entity(wall_entity);

game_engine.render();

// WASD movement
let keys_pressed = {
    W: false,  // Move Up (Y+)
    S: false,  // Move Down (Y-)
    A: false,  // Move Left (X-)
    D: false   // Move Right (X+)
};

// Handle keydown event
document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase(); // Normalize case to handle uppercase/lowercase keys

    if (key === 'w' && !keys_pressed.W) {
        keys_pressed.W = true;
    } else if (key === 's' && !keys_pressed.S) {
        keys_pressed.S = true;
    } else if (key === 'a' && !keys_pressed.A) {
        keys_pressed.A = true;
    } else if (key === 'd' && !keys_pressed.D) {
        keys_pressed.D = true;
    }
});

// Handle keyup event
document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase(); // Normalize case to handle uppercase/lowercase keys

    if (key == 'w') { // W
        keys_pressed.W = false;
    } else if (key == 's') { // S
        keys_pressed.S = false;
    } else if (key == 'a') { // A
        keys_pressed.A = false;
    } else if (key == 'd') { // D
        keys_pressed.D = false;
    }
});

function tick() {
    game_engine.update_velocities(hero_entity, keys_pressed);
    hero.move();
    game_engine.render();
}

// Wait till page loads to start ticking
document.addEventListener('DOMContentLoaded', function () {
    const ticks_per_second = 60;
    const interval_id = setInterval(tick, 1000/ticks_per_second);
});
