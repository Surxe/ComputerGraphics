// Initialize WebGL
const gl = GLSetup.init_webgl("gl_canvas");
if (!gl) throw new Error("WebGL failed to initialize");

// Initialize camera
const camera = new Camera();

// Create a game_engine
const game_engine = new GameEngine(gl, camera);

// Create an Entity for the Actor
const actor_entity = new Entity(gl, [
    -0.5, -0.5, 0.0,
     0.5, -0.5, 0.0,
     0.0,  0.5, 0.0,
], [1.0, 0.0, 0.0], [0, 0, 0]);

// Create a trigger_box (cube)
const trigger_box = new TriggerBox(gl, [0, 0, 0], [1, 1, 1]);

// Create an Actor with the Entity and trigger_box
const actor = new Actor(gl, actor_entity, trigger_box);

// Add the Actor as an entity in the game engine
game_engine.add_actor(actor);

// Handle key presses for camera movement
document.addEventListener("keydown", (event) => {
    const speed = 0.1;
    if (event.key === "w") camera.move_forward(speed);
    if (event.key === "s") camera.move_backward(speed);
    if (event.key === "a") camera.rotate_left(0.05);
    if (event.key === "d") camera.rotate_right(0.05);
    if (event.key === "z") camera.move_up(speed);
    if (event.key === "x") camera.move_down(speed);
});

// Main render loop
function render() {
    game_engine.render();
    requestAnimationFrame(render);
}

render();