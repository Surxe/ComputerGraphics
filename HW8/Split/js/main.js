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
    // red triangle ontop
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
]
var rotations = [0, 0, 0]
var scalars = [.15, .15, .15]
var translations = [0, 0, 0]
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
var outline_gl_draw_mode = 'LINE_LOOP';
var fill_gl_draw_mode = 'TRIANGLES';
var hero = new Hero(positions, rgb, rotations, scalars, translations, should_fill, position_velocity, rotation_velocity, indices, outline_gl_draw_mode, fill_gl_draw_mode);
game_engine.add_game_object(hero);

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

// Update movement based on pressed keys
function update_hero_velocity() {
    var position_magnitude = .015;
    var rotation_magnitude = 4;
    var direction = 1;

    // (A/D) -> Rotate left/right
    if (keys_pressed.A) {
        direction = 1;
    } else if (keys_pressed.D) {
        direction = -1
    }
    else {
        rotation_magnitude = 0;
    }
    var rotation_velocity = rotation_magnitude * direction; //degrees
    var rotation_velocity_arr = [0, 0, rotation_velocity];
    hero.rotation_velocity = rotation_velocity_arr;

    // (W/S) -> Move forward/backward
    if (keys_pressed.W) {
        direction = 1
    } else if (keys_pressed.S) {
        direction = -1
    }
    else {
        position_magnitude = 0;
    }
    var position_velocity = position_magnitude * direction;
    // Given position_velocity and rotation_velocity:
    // if facing left, change x dimension by position_velocity pixels
    // if facing right, change x dimension by position_velocity pixels
    // if facing up, change y dimension by position_velocity pixels
    // if facing down, change y dimension by position_velocity pixels
    // and all directions in between
    // ex: position_velocity = 1, rotation_velocity = 180 degrees (facing down) -> [0, -1, 0] (move down)
    var current_rotation = hero.rotations[2] + rotation_velocity; //pre-emptively add rotation velocity as it will be added in the next move()
    var rotation_rads = current_rotation * Math.PI / 180;
    var dx = position_velocity * Math.sin(rotation_rads);
    var dy = position_velocity * Math.cos(rotation_rads);
    var position_velocity_arr = [-dx, dy, 0];
    console.log(position_velocity_arr);
    hero.position_velocity = position_velocity_arr
}

function tick() {
    update_hero_velocity();
    hero.move();
    game_engine.render();
}

// Wait till page loads to start ticking
document.addEventListener('DOMContentLoaded', function () {
    const ticks_per_second = 60;
    const interval_id = setInterval(tick, 1000/ticks_per_second);
});
