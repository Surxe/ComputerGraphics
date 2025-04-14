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

        const radius = 2;
        const lat_segments = 10;
        const long_segments = 10;
        const rgb = [0, 1, 0]; // Green color for leaves

        const sphere_data = create_sphere(radius, lat_segments, long_segments, rgb);
        const leaves_vertices = sphere_data.vertices;
        const leaves_indices = sphere_data.indices;
        const leaves_colors = sphere_data.colors;

        // Combine the two sets of vertices, indices, and colors
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

        const trigger_boxes = [
            new TriggerBox([0, 0, 0], [1, 4, 1]),
            new TriggerBox([0, 1, 0], [3, 3, 3]),
        ];

        super(
            tree_entity, // Entity
            trigger_boxes // Trigger boxes
        ); 
    }
}