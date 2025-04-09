const gl_setup = new GLSetup("glcanvas");
const [gl, program, canvas] = gl_setup.init()

const tick_rate_scale = .5;
const camera = new CameraObject();
const camera_actor = new CameraActor(camera, [new TriggerBox([0, 0, 0], [1, 1, 1])])
const game_engine = new GameEngine(camera_actor);

// Create ground
const ground_radius = 100; // Cube w/ radius n will have area (2n)^2 not pi*r^2
const ground_entity = new Entity(
    [
        -ground_radius, -1, -ground_radius, 
        -ground_radius, -1, ground_radius, 
        ground_radius , -1, ground_radius, 
        ground_radius , -1, -ground_radius
    ], // Vertices
    [
        0, 1, 2, // Triangle 1
        0, 2, 3  // Triangle 2
    ],
    [
        .5, .35, .1,
        .5, .35, .1,
        .5, .35, .1,
        .5, .35, .1
    ]
    )
const ground_y_location = -ground_radius/2-1+.5 // //tbox is secretly a massive cube, shift its center down by half its height. Down 1 more so the camera isn't inside it. Shift up by half the camera height.
const ground_actor = new Ground(
    ground_entity, 
    [new TriggerBox([0, ground_y_location, 0], [2*ground_radius, 2*ground_radius, 2*ground_radius])]
)
game_engine.add_actor(ground_actor);

function create_rock() {
    const dist = 20;
    const x = Math.random()*dist*2-dist // [-dist, .. +dist]
    const y = -.5;
    const z = Math.random()*dist*2-dist

    // Create rocks
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
        //Gray
        .5, .5, .5,
        .7, .7, .7,
        .3, .3, .3,
        .5, .5, .5,
        .7, .7, .7,
        .3, .3, .3,
    ];
        
    const rock_entity = new Entity(
        [...vertices], 
        [...indices], 
        [...colors],
        [x, y, z],
    )

    const rock_actor = new Rock(rock_entity, [new TriggerBox([0, 0, 0], [1, 1, 1])])

    game_engine.add_actor(rock_actor);
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
    const speed = 0.1 * tick_rate_scale; // Bullet speed
    const velocities = [
        Math.sin(-camera_angle[1]) * speed,
        0,
        -Math.cos(-camera_angle[1]) * speed
    ];
    const bullet = new Projectile(
        b1, 
        [new TriggerBox([0, 0, 0], [1, 1, 1])], // Bullet entity with trigger box
        velocities, 
        [0, 0, 0]
    )

    return bullet;
}

function create_tree() {
    const dist = 20;
    const x = Math.random()*dist*2-dist;
    const y = 1;
    const z = Math.random()*dist*2-dist;

    const root_vertices = [
        // Bottom face (y = -2)
        -0.5, -2, -0.5, // 0
        0.5, -2, -0.5, // 1
        0.5, -2,  0.5, // 2
        -0.5, -2,  0.5, // 3

        // Top face (y = 2)
        -0.5, 2, -0.5,  // 4
        0.5, 2, -0.5,  // 5
        0.5, 2,  0.5,  // 6
        -0.5, 2,  0.5,  // 7
    ];
    const root_indices = [
        // Bottom face
        0, 1, 2,
        0, 2, 3,

        // Top face
        4, 6, 5,
        4, 7, 6,

        // Front face
        3, 2, 6,
        3, 6, 7,

        // Back face
        1, 0, 4,
        1, 4, 5,

        // Left face
        0, 3, 7,
        0, 7, 4,

        // Right face
        2, 1, 5,
        2, 5, 6,
    ];

    const root_colors = [
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
        .5, .4, .1,
    ];

    const leaves_vertices = [];
    // Create leaves vertices in a 3d circle
    const num_points = 10;
    const radius = 2;
    for (let i = 0; i < num_points; i++) {
        const angle = (i / num_points) * Math.PI * 2; // Angle in radians
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        leaves_vertices.push(x, 2, z); // Add the vertex to the array
    }
    // Add the top vertex of the leaves
    leaves_vertices.push(0, 2, 0); // Top vertex
    const leaves_indices = [];
    for (let i = 0; i < num_points; i++) {
        const next_index = (i + 1) % num_points; // Wrap around to the first vertex
        leaves_indices.push(0, i, next_index); // Create a triangle
    }
    leaves_indices.push(0, num_points, 1); // Create the last triangle

    const leaves_colors = [] // green
    for (let i = 0; i < num_points + 1; i++) {
        leaves_colors.push(0, 1, 0); // Green color
    }

    const combined_vertices = [
        ...root_vertices,
        ...leaves_vertices
    ];
    const combined_indices = [
        ...root_indices,
        ...leaves_indices.map(index => index + root_vertices.length/3) // Offset indices for leaves
    ];
    const combined_colors = [
        ...root_colors,
        ...leaves_colors
    ];

    console.log("leaves_vertices", combined_vertices)
    console.log("leaves_indices", combined_indices)
    console.log("leaves_colors", combined_colors)

    const tree_entity = new Entity(
        combined_vertices,//[...root_vertices, ...leaves_vertices], 
        combined_indices,//[...root_indices, ...leaves_indices], 
        combined_colors,//[...root_colors, ...leaves_colors],
        [x, y, z],
    )
    const tree_actor = new Tree(
        tree_entity, 
        [new TriggerBox([0, 0, 0], [1, 4, 1])]
    )
    game_engine.add_actor(tree_actor);
}

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

// Space key pressed
document.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
        bullet = create_bullet(
            camera.vertices,
            [0, -camera.angle, 0]
        );
        game_engine.add_actor(bullet);
    }
});

// Create many rocks
const num_rocks = 10;
for (let i = 0; i < num_rocks; i++) {
    create_rock();
}
const num_trees = 5;
for (let i = 0; i < num_trees; i++) {
    create_tree();
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