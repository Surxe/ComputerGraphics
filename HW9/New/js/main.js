const [gl, program, canvas] = GLSetup.init("glcanvas")

const game_engine = new GameEngine(camera);

const entities = [
    new Entity(
        [ 0.0, 0.5, -2.0, -0.5, -0.5, -2.0, 0.5, -0.5, -2.0 ], // Orange Triangle
        [ 1.0, 0.5, 0.0, 1.0, 0.5, 0.0, 1.0, 0.5, 0.0 ]
    ),
    new Entity(
        [ 0.0, 0.5, -4.0, -0.5, -0.5, -4.0, 0.5, -0.5, -4.0 ], // Red Triangle
        [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
    )
];

for (const entity of entities) {
    game_engine.add_entity(entity);
}

function tick() {
    game_engine.render();
    requestAnimationFrame(tick);
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();