class Bullet extends Actor {
    constructor(camera_location, camera_angle) {
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

        const bullet_entity = new Entity(
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

        const trigger_boxes = [
            new TriggerBox([0, 0, 0], [1, 1, 1]) // Bullet entity with trigger box
        ];

        super(
            bullet_entity, // Entity
            trigger_boxes, // Trigger boxes
            true,
            velocities
        );
    }
}