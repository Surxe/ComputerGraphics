// Initialize WebGL
const gl = GLSetup.init_webgl("gl_canvas");
if (!gl) throw new Error("WebGL failed to initialize");

// Initialize camera
const camera = new Camera();

// Create a game_engine
const game_engine = new GameEngine(gl, camera);

const vertices = [
    -0.5, -0.5, 0.0, //bottom left
     0.5, -0.5, 0.0, //bottom right
     0.5,  0.5, 0.0, //top right

     0.5,  0.5, 0.0, //top right
     -0.5, -0.5, 0.0, //bottom left
     -0.5, 0.5, 0.0, //top left
]

// Create Entities for the Actor
const actor_entity1 = new Entity(gl, vertices.slice(0), [1.0, 0.0, 0.0], [0, 0, 0]);
const actor_entity2 = new Entity(gl, vertices.slice(0), [0.0, 1.0, 0.0], [1, 1, 0]);

// Create a trigger_box (cube)
const trigger_box1 = new TriggerBox([0, 0, 0], [1, 1, 1]);
const trigger_box2 = new TriggerBox([0, 0, 0], [1, 1, 1]);

// Create an Actor with the Entity and trigger_box
const actor1 = new Actor(gl, actor_entity1, trigger_box1);
const actor2 = new Actor(gl, actor_entity2, trigger_box2);

// Add the Actor as an entity in the game engine
game_engine.add_actor(actor1);
game_engine.add_actor(actor2);

var keys_down = {};
const valid_keys = ["w", "s", "a", "d", "z", "x"];

// Handle key presses for camera movement
document.addEventListener("keydown", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = true;
    }
});
// Handle key releases for camera movement
document.addEventListener("keyup", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = false;
    }
});

// Main render loop
function tick() {
    camera.move(keys_down);
    game_engine.render();
    if (actor1.check_trigger_collision(actor2)) {
        console.log("Collision detected!");
    }
    requestAnimationFrame(tick);
}

tick();