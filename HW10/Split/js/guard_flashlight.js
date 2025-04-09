class GuardFlashlight extends Actor {
    constructor() {
        // Cube vertices
        const vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5
        ];
        // Cube indices
        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            2, 3, 7, 2, 7, 6,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];
        // Cube colors (r, g, b)
        const colors = [
            // Purple
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,

            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
        ];
        const distance = 20;
        const x = Math.random() * distance - distance / 2;
        const y = 2;
        const z = Math.random() * distance - distance / 2;
        const location = [x, y, z];
        const entity = new Entity(
            vertices,
            indices,
            colors,
            location
        )
        const trigger_boxes = [
            new TriggerBox([0, -2+0.5, 0], [1, .5, 1]) // add .5 to y bc of camera y
        ]

        super(entity, trigger_boxes);
    }
}