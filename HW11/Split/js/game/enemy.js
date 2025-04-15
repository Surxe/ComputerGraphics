class Enemy extends Character {
    constructor() {
        // 2d square
        const vertices = [
            0, -0.5, -0.5,
            0, 0.5, -0.5,
            0, 0.5, 0.5,
            0, -0.5, 0.5,
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
            1, 0, 0,
            1, 0, 0,
            0, 0, 1,
            0, 0, 1,
        ]
        const location = [0, 5, 0];

        const textured_entity = new Entity(vertices, indices, colors, location);
        const trigger_boxes = [new TriggerBox([0, 0, 0], [2, 2, 2])];

        super(1, textured_entity, trigger_boxes);
    }

    face_camera(camera_location) {
        // Calculate the yaw angle based on the camera location
        const dx = camera_location[0] - this.entity.location[0];
        const dz = camera_location[2] - this.entity.location[2];
        const yaw = Math.atan2(dx, dz);
        
        // Update vertices based on the yaw angle
        this.entity.vertices = Transform.rotate_positions(this.entity.local_vertices, [0, yaw, 0]);
        this.entity.globalize_vertices();
    }
}