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
var velocity = [0, 0, 0];
var indices = [
    // square base
    0, 1, 2, 
    0, 2, 3,
    // triangle ontop
    4, 5, 6,
]
var outline_gl_draw_mode = 'LINE_LOOP';
var fill_gl_draw_mode = 'TRIANGLES';
var hero = new Hero(positions, rgb, rotations, scalars, translations, should_fill, velocity, indices, outline_gl_draw_mode, fill_gl_draw_mode);
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

    update_hero_velocity();
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

    update_hero_velocity();
});

// Update movement based on pressed keys
function update_hero_velocity() {
    let x_movement = 0;
    let y_movement = 0;
    var magnitude = .05;

    // Check vertical movement (W/S)
    if (keys_pressed.W) {
        y_movement += magnitude;  // Move up
    } else if (keys_pressed.S) {
        y_movement -= magnitude;  // Move down
    }

    // Check horizontal movement (A/D)
    if (keys_pressed.A) {
        x_movement -= magnitude;  // Move left
    } else if (keys_pressed.D) {
        x_movement += magnitude;  // Move right
    }

    hero.velocity = [x_movement, y_movement, 0];
}

function tick() {
    hero.move();
    game_engine.render();
}

// Wait till page loads to start ticking
document.addEventListener('DOMContentLoaded', function () {
    const ticks_per_second = 60;
    const interval_id = setInterval(tick, 1000/ticks_per_second);
});
