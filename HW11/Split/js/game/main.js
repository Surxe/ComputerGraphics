// Initialize Web GL context, program, and lighting engine
const gl_setup = new GLSetup("glcanvas");
const [gl, program, canvas] = gl_setup.init()
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

// Change depending on your Frames per Second (FPS) as the game speed is tied to fps
const tick_rate_scale = .5;

const console_section = document.getElementById("console");

// Maze
const maze_tile_width_height = 4; // Size of each tile in the maze
const maze_width_height = 30;
const starting_indices = [1, 0];
const ending_indices = [maze_width_height - 1 - 1, 0];

function maze_index_to_location(index) {
    return index * maze_tile_width_height - (maze_width_height / 2) * maze_tile_width_height;
}

const maze = [ // 0=open space, 1=wall
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function get_random_empty_maze_location() {
    let x, y;
    do {
        x = Math.floor(Math.random() * maze_width_height);
        y = Math.floor(Math.random() * maze_width_height);
    } while (maze[x][y] !== 0); // Ensure it's an empty space
    return [y, x]; // invert x and y because i said so
}

// Camera
const camera_init_location = [maze_index_to_location(starting_indices[0]), 0, maze_index_to_location(starting_indices[1])];
const camera = new CameraObject(camera_init_location);
camera.angle = Math.PI; // Initial camera angle
const camera_actor = new Hero(camera, [new TriggerBox([0, 0, 0], [1, 1, 1])], true)

// Camera movement
var keys_down = {};
const valid_keys = ["w", "s", "a", "d", "z", "x", "c"];

// Handle key presses for camera movement
document.addEventListener("keydown", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = false;
    }
});

// Game engine
const game_engine = new GameEngine(camera_actor);

// Add walls to game engine based on their location in the maze
for (let i = 0; i < maze_width_height; i++) {
    for (let j = 0; j < maze_width_height; j++) {
        //console.log(maze[i][j]);
        if (maze[i][j] === 1) {
            const x = maze_index_to_location(j);
            const y = 0; // Ground level
            const z = maze_index_to_location(i);
            game_engine.add_actor(new Wall([x, y, z], maze_tile_width_height));
        }
    }
}

function create_object_in_maze(class_ref, location_indices="random") {
    if (location_indices === "random") {
        location_indices = get_random_empty_maze_location();
    }

    var y = 0;
    if (class_ref === Guard) {
        y = 6;
    }
    const location = [maze_index_to_location(location_indices[0]), y, maze_index_to_location(location_indices[1])];
    const obj = new class_ref(location);
    game_engine.add_actor(obj);
}

// Create enemies
for (let i = 0; i < 10; i++) {
    create_object_in_maze(Guard);
}
for (let i = 0; i < 5; i++ ) {
    create_object_in_maze(Torch);
}
create_object_in_maze(TargetDestination, ending_indices);

// List all game objects to be created
const object_creation_map = [
    // <class_ref>, <instance_count>
    [Ground, 1],
    [Moon, 1],
];

// Create objects based on the map
for (const [class_ref, count] of object_creation_map) {
    for (let i = 0; i < count; i++) {
        const instance = new class_ref(); // Add parameters here if needed
        game_engine.add_actor(instance);
    }
}

// Bullet shooting
document.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
        // At camera, facing same direction
        game_engine.add_actor(new HeroBullet(camera.vertices, [0, -camera.angle, 0]));
    }
});

test_enemy1 = new Enemy();
game_engine.add_actor(test_enemy1);

// TODO:
// 3. Simplify enemies velocity to be constant, but invert magnitude when they hit a wall.
// 4. Setup billboarding such that enemies always look at the camera

// Main loop
var current_tick = 0;
var should_continue = true;
function tick() {
    if (!should_continue) return; // Stop the loop if should_continue is false

    gl_setup.tick();
    game_engine.tick();

    // Update enemy's direction to face the camera
    test_enemy1.face_camera(camera_actor.entity.location);

    current_tick += 1;

    if (Math.floor(current_tick) % 500 === 0) {
        console.log("Shooting bullet!");
        //game_engine.add_actor(new EnemyBullet([camera.vertices[0], camera.vertices[1], camera.vertices[2]-10], [0, -camera.angle, 0]));
    }

    requestAnimationFrame(tick); // Start loop
}

// Start the main loop
tick();