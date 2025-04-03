const [gl, program, canvas] = GLSetup.init("glcanvas")


const camera = new Camera();
const game_engine = new GameEngine(camera);

const vertices = [
    // Top vertex
    0,  1,  0,  
    // Side vertices
    1,  0,  0,  
    0,  0,  1,  
    -1,  0,  0,  
    0,  0, -1,  
    // Bottom vertex
    0, -1,  0   
    ];
  
  
const indices = [
    0, 1, 2,  // Top front-right
    0, 2, 3,  // Top front-left
    0, 3, 4,  // Top back-left
    0, 4, 1,  // Top back-right
    5, 2, 1,  // Bottom front-right
    5, 3, 2,  // Bottom front-left
    5, 4, 3,  // Bottom back-left
    5, 1, 4   // Bottom back-right
    ];
  
const colors = [
    1, 0, 0,  // Red (Top front-right)
    0, 1, 0,  // Green (Top front-left)
    0, 0, 1,  // Blue (Top back-left)
    1, 1, 0,  // Yellow (Top back-right)
    1, 0, 1,  // Magenta (Bottom front-right)
    0, 1, 1,  // Cyan (Bottom front-left)
    1, 1, 1,  // White (Bottom back-left)
    0, 0, 0   // Black (Bottom back-right)
    ];
      
const e1 = new Entity(
    [...vertices], [...indices], [...colors],
    [0, 0, 0],
)
const e2 = new Entity(
    [...vertices], [...indices], [...colors],
    [3, 0, 0],
)

const tb1 = new TriggerBox([0, 0, 0], [1, 1, 0])
const tb2 = new TriggerBox([0, 0, 0], [1, 1, 0])

const a1 = new Actor(e1, [tb1], [.001, 0, 0], [0, 0, 0]) 
const a2 = new Actor(e2, [tb2], [0, 0, 0], [0, 0, 0])

game_engine.add_actor(a1)
game_engine.add_actor(a2)

function tick() {
    game_engine.tick();

    if (a1.check_trigger_collision(a2)) {
        console.log("Collision detected!");
    }

    requestAnimationFrame(tick); // Start loop
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();