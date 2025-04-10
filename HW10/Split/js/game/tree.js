class Tree extends Actor {
    constructor() {
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

        const tree_entity = new Entity(
            combined_vertices,
            combined_indices, 
            combined_colors,
            [x, y, z],
        )

        const trigger_boxes = [new TriggerBox([0, 0, 0], [1, 4, 1])];

        super(
            tree_entity, // Entity
            trigger_boxes // Trigger boxes
        ); 
    }
}