const gl_setup = new GLSetup("glcanvas");
const [gl, program, canvas] = gl_setup.init()

const tick_rate_scale = .5;

// Camera
const camera = new CameraObject();
const camera_actor = new CameraActor(camera, [new TriggerBox([0, 0, 0], [1, 1, 1])])

// Game engine
const game_engine = new GameEngine(camera_actor);

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

const object_creation_map = [
    [Ground, 1],
    [Rock, 10],
    [Tree, 5],
    [Guard, 3],
    [Torch, 5],
];

// Create objects based on the map
for (const [class_ref, count] of object_creation_map) {
    for (let i = 0; i < count; i++) {
        const instance = new class_ref(); // Add parameters here if needed
        game_engine.add_actor(instance);
    }
}

// Directional moon light
const moon_light = new DirectionalLight();
gl_setup.add_directional_light(moon_light);

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

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();