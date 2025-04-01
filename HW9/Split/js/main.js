const gl = GLSetup.init_webgl("gl_canvas");
if (!gl) throw new Error("WebGL failed to initialize");

// Initialize camera
const camera = new Camera();

// Create game engine and pass the camera
const gameEngine = new GameEngine(gl, camera);

// Create entities (two triangles)
const triangle1 = new Entity(gl, [
    -0.5, -0.5,
     0.5, -0.5,
     0.0,  0.5
], [1.0, 0.0, 0.0], [-1, 0, 0]);

const triangle2 = new Entity(gl, [
    -0.5,  0.5,
     0.5,  0.5,
     0.0, -0.5
], [0.0, 1.0, 0.0], [1, 0, 0]);

// Add entities to the game engine
gameEngine.add_entity(triangle1);
gameEngine.add_entity(triangle2);

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
    gameEngine.render(); // Let the game engine handle rendering
    requestAnimationFrame(render);
}

render();