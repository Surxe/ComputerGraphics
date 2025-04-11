class Moon extends Actor{
    constructor() {
        // Cube vertices
        const sphere_data = create_sphere(100, 10, 10, [.8, .8, .8]);
        const vertices = sphere_data.vertices;
        const indices = sphere_data.indices;
        const colors = sphere_data.colors;
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