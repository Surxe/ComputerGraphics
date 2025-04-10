// Initialize Web GL context, program, and lighting engine
const gl_setup = new GLSetup("glcanvas");
const [gl, program, canvas] = gl_setup.init()
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

// Change depending on your Frames per Second (FPS) as the game speed is tied to fps
const tick_rate_scale = .5;

// Camera
const camera = new CameraObject();
const camera_actor = new CameraActor(camera, [new TriggerBox([0, 0, 0], [1, 1, 1])])

// Camera movement
var keys_down = {};
const valid_keys = ["w", "s", "a", "d", "z", "x"];

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

// List all game objects to be created
const object_creation_map = [
    // <class_ref>, <instance_count>
    [Ground, 1],
    [Rock, 10],
    [Tree, 5], //Finish modeling the leaves TODO
    [Guard, 3],
    [Torch, 5],
    [Moon, 1],
    //[TargetDestination, 1] TODO
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
        game_engine.add_actor(new Bullet(camera.vertices, [0, -camera.angle, 0]));
    }
});

// Main loop
var first = true;
function tick() {
    gl_setup.tick();
    game_engine.tick();

    requestAnimationFrame(tick); // Start loop
}

// Start the main loop
tick();