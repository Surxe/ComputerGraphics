const [gl, program, canvas] = GLSetup.init("glcanvas")

const tick_rate_scale = .5;
const camera = new Camera();
const game_engine = new GameEngine(camera);

function create_asteroid() {
    const x = Math.random()*200-100 // [-100, .. 100]
    const y = Math.random()*200-100 // [-100, .. 100]
    const z = Math.random()*200-100 // [-100, .. 100]

    // Create asteroids
    const vertices = [
        // Top vertex
        0,  .5,  0,  
        // Side vertices
        .5,  0,  0,  
        0,  0,  .5,  
        -.5,  0,  0,  
        0,  0, -.5,  
        // Bottom vertex
        0, -.5,  0   
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
        [x, y, z],
    )

    const tb1 = new TriggerBox([0, 0, 0], [1, 1, 1])

    // Random rotation speed 
    const rx = Math.random()*.1 * tick_rate_scale//[0, .. 0.1]
    const ry = Math.random()*.1 * tick_rate_scale//[0, .. 0.1]
    const rz = Math.random()*.1 * tick_rate_scale//[0, .. 0.1]
    const rotation_speed = [rx, ry, rz]
    const a1 = new Character(3, e1, [tb1], [.000, 0, 0], rotation_speed)

    game_engine.add_actor(a1);
}

// Create bullet
function create_bullet(camera_location, camera_angle) {
    // Create a bullet entity
    var bullet_vertices = [
        // Front face
        -0.5, -0.5,  .5, // 0
        0.5, -0.5,  .5, // 1
        0.5,  0.5,  .5, // 2
        -0.5,  0.5,  .5, // 3

        // Back face
        -0.5, -0.5, -.5, // 4
        0.5, -0.5, -.5, // 5
        0.5,  0.5, -.5, // 6
        -0.5,  0.5, -.5  // 7
    ]
    // rotate the bullet to match the camera angle
    bullet_vertices = Transform.rotate_positions(bullet_vertices, camera_angle);

    const b1 = new Entity(
        bullet_vertices,
        [
            // Front face
            0, 1, 2,
            0, 2, 3,

            // Back face
            4, 6, 5,
            4, 7, 6,

            // Top face
            3, 2, 6,
            3, 6, 7,

            // Bottom face
            0, 5, 1,
            0, 4, 5,

            // Right face
            1, 5, 6,
            1, 6, 2,

            // Left face
            0, 3, 7,
            0, 7, 4
        ],
        [
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
            .5, .5, .5,
        ],
        [...camera_location], // Bullet location
    )
    const bullet = new Projectile(
        b1, 
        [new TriggerBox([0, 0, 0], [1, 1, 1])], // Bullet entity with trigger box
        [-0.2 * tick_rate_scale, 0, 0], 
        [0, 0, 0]
    ) // Bullet entity with no trigger boxes

    return bullet;
}

// Space key pressed
document.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
        bullet = create_bullet(
            [camera.x, camera.y, camera.z],
            [0, -camera.angle, 0]
        );
        game_engine.add_actor(bullet);
    }
});

// Create many asteroids
const num_asteroids = 100;
for (let i = 0; i < num_asteroids; i++) {
    create_asteroid();
}

// Main loop
function tick() {
    game_engine.tick();

    requestAnimationFrame(tick); // Start loop
}

// Initialize WebGL
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
tick();