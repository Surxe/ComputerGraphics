const [gl, program, canvas] = GLSetup.init("glcanvas")


const camera = new Camera();
const game_engine = new GameEngine(camera);

const e1 = new Entity(
    [ 0.0, 0.5, -2.0, 
     -0.5, -0.5, -2.0, 
      0.5, -0.5, -2.0 ], // Orange Triangle

    [ 1.0, 0.5, 0.0, 1.0, 0.5, 0.0, 1.0, 0.5, 0.0 ],
    [0, 0, 0]
)
const e2 = new Entity(
    [ 0.0, 0.5, -2.0, 
     -0.5, -0.5, -2.0, 
      0.5, -0.5, -2.0 ], // Red Triangle
    [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ],
    [0.1, 0, 0]
)

const tb1 = new TriggerBox([0, 0, 0], [1, 1, 0])
const tb2 = new TriggerBox([0, 0, 0], [1, 1, 0])

const a1 = new Actor(e1, tb1)
const a2 = new Actor(e2, tb2)

game_engine.add_actor(a1)
game_engine.add_actor(a2)

function tick() {
    game_engine.render();
    requestAnimationFrame(tick);
    if (a1.check_trigger_collision(a2)) {
        console.log("Collision detected!");
    }
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();