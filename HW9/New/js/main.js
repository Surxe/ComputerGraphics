const [gl, program, canvas] = GLSetup.init("glcanvas")


const camera = new Camera();
const game_engine = new GameEngine(camera);

e1 = new Entity(
    [ 0.0, 0.5, -2.0, -0.5, -0.5, -2.0, 0.5, -0.5, -2.0 ], // Orange Triangle
    [ 1.0, 0.5, 0.0, 1.0, 0.5, 0.0, 1.0, 0.5, 0.0 ],
    [0, 0, 0]
)
e2 = new Entity(
    [ 0.0, 0.5, -4.0, -0.5, -0.5, -4.0, 0.5, -0.5, -4.0 ], // Red Triangle
    [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ],
    [0, 0, 0]
)

a1 = new Actor(e1, '')
a2 = new Actor(e2, '')

game_engine.add_actor(a1)
game_engine.add_actor(a2)

function tick() {
    game_engine.render();
    requestAnimationFrame(tick);
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();