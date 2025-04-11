class TargetDestination extends Actor {
    constructor() {
        //2d square
        const vertices = [
            -0.5, 0, -0.5,
            0.5, 0, -0.5,
            0.5, 0, 0.5,
            -0.5, 0, 0.5,
        ];
        const scalar = 2;
        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= scalar;
        }
        const indices = [
            0, 1, 2,
            0, 2, 3,
        ];
        const colors = [
            //red
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
        ];
        const location = [0, -.95, -10];
        const entity = new Entity(vertices, indices, colors, location);
        const trigger_boxes = [new TriggerBox([0, 0, 0], [2, 1, 2])];
        super(entity, trigger_boxes);
    }
}