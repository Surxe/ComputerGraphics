class Moon extends Actor{
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
        const scale = 100;
        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= scale;
        }
        // Cube indices
        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            2, 3, 7, 2, 7, 6,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];
        const colors = [
            // Light grey
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
            0.8, 0.8, 0.8,
        ]
        const location = [300, 200, 300];
        const entity = new Entity(
            vertices,
            indices,
            colors,
            location
        )
        const trigger_boxes = [
            new TriggerBox([0, 0, 0], [1, 1, 1])
        ]
        super(entity, trigger_boxes);

        const moon_light = new DirectionalLight();
        this.attach_light(moon_light);
        gl_setup.add_directional_light(moon_light);
    }
}