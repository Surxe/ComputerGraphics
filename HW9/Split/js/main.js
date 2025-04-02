// Initialize WebGL
const gl = GLSetup.init_webgl("gl_canvas");
if (!gl) throw new Error("WebGL failed to initialize");

// Initialize camera
const camera = new Camera();

// Create a game_engine
const game_engine = new GameEngine(gl, camera);

// Create an Entity for the Actor
const actor_entity1 = new Entity(gl, [
    -0.5, -0.5, 0.0, //bottom left
     0.5, -0.5, 0.0, //bottom right
     0.5,  0.5, 0.0, //top right

     0.5,  0.5, 0.0, //top right
     -0.5, -0.5, 0.0, //bottom left
     -0.5, 0.5, 0.0, //top left
], [1.0, 0.0, 0.0], [0, 0, 0]);

var actor_entity2_vertices = actor_entity1.vertices.slice(0); // Copy vertices from actor_entity1
// Move the second entity to the right
for (let i = 0; i < actor_entity2_vertices.length; i += 3) {
    actor_entity2_vertices[i] += 1.0; // Move x coordinate to the right
}

const actor_entity2 = new Entity(gl, actor_entity2_vertices, [0.0, 1.0, 0.0], [1, 1, 1]);

// Create a trigger_box (cube)
const trigger_box1 = new TriggerBox([0, 0, 0], [1, 1, 1]);
const trigger_box2 = new TriggerBox([0, 0, 0], [1, 1, 1]);

// Create an Actor with the Entity and trigger_box
const actor1 = new Actor(gl, actor_entity1, trigger_box1);
const actor2 = new Actor(gl, actor_entity2, trigger_box2);

// Add the Actor as an entity in the game engine
game_engine.add_actor(actor1);
game_engine.add_actor(actor2);

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