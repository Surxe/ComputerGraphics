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
        const leaves_indices = [];
        const leaves_colors = [];

        const radius = 2;
        const lat_segments = 10;
        const long_segments = 10;

        // Create vertices
        for (let lat = 0; lat <= lat_segments; lat++) {
            const theta = (lat * Math.PI) / lat_segments;
            const sin_theta = Math.sin(theta);
            const cos_theta = Math.cos(theta);

            for (let lon = 0; lon <= long_segments; lon++) {
                const phi = (lon * 2 * Math.PI) / long_segments;
                const sin_phi = Math.sin(phi);
                const cos_phi = Math.cos(phi);

                const x = radius * sin_theta * cos_phi;
                const y = radius * cos_theta + 2; // Raise the sphere to height 2
                const z = radius * sin_theta * sin_phi;

                leaves_vertices.push(x, y, z);
                leaves_colors.push(0, 1, 0); // Green color
            }
        }

        // Create indices
        for (let lat = 0; lat < lat_segments; lat++) {
            for (let lon = 0; lon < long_segments; lon++) {
                const first = (lat * (long_segments + 1)) + lon;
                const second = first + long_segments + 1;

                leaves_indices.push(first, second, first + 1);
                leaves_indices.push(second, second + 1, first + 1);
            }
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