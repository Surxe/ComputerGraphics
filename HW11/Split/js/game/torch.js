class Torch extends Actor {
    constructor(location) {
        const vertices = [
            -0.05, -.45,  0.05,
             0.05, -.45,  0.05,
             0.05,  .45,  0.05,
            -0.05,  .45,  0.05,
            -0.05, -.45, -0.05,
             0.05, -.45, -0.05,
             0.05,  .45, -0.05,
            -0.05,  .45, -0.05
        ]

        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            2, 3, 7, 2, 7, 6,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ]

        const colors = [
            // Yellow
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
        ]

        const entity = new Entity(
            vertices,
            indices,
            colors,
            [location[0], location[1]-.5, location[2]], // Torch location
        )

        const trigger_boxes = [
            new TriggerBox([0, 0, 0], [.05*2, .45*2, .05*2])
        ]
        
        super(entity, trigger_boxes);

        const point_light = new PointLight([location[0], location[1] + 1, location[2]]); // Position the light just above the actor
        this.attach_light(point_light);
        gl_setup.add_point_light(point_light);
    }
}