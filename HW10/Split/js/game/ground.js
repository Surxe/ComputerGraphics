class Ground extends Actor {
    constructor() {
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

        const trigger_boxes = [new TriggerBox([0, ground_y_location, 0], [2*ground_radius, 2*ground_radius, 2*ground_radius])]

        super(
            ground_entity, // Entity
            trigger_boxes // Trigger boxes
        );
    }
}