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

// Ground
game_engine.add_actor(new Ground());

// Rocks
const num_rocks = 10;
for (let i = 0; i < num_rocks; i++) {
    game_engine.add_actor(new Rock());
}

// Trees
const num_trees = 5;
for (let i = 0; i < num_trees; i++) {
    game_engine.add_actor(new Tree());
}

// Guard flashlights
const num_flashlights = 3;
for (let i = 0; i < num_flashlights; i++) {
    game_engine.add_actor(new GuardFlashlight());
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
    if (first) {
        const spot_light = new SpotLight([0, 3, 0], [0, -1, 0], [.5, 1, .5], 30);
        gl_setup.add_spot_light(spot_light);
        gl_setup.update_spot_light(0, [0, 10, 0])
        first = false;
    }
    
    game_engine.tick();

    requestAnimationFrame(tick); // Start loop
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();