class CameraObject extends GameObject {
    constructor(location=[0, 0, 0]) {
        super([0, 0, 0], location); // No local vertices for the camera
        this.angle = 0;
    }

    move(position_velocities, rotation_velocities) {
        super.move(position_velocities, null); // translate
        this.angle += rotation_velocities[1]; // rotate (not using the super class for rotation atm)
    }

    get_view_matrix() {
        const cosA = Math.cos(this.angle), sinA = Math.sin(this.angle);
        const [x, y, z] = this.vertices;

        return [
            cosA, 0, sinA, -x * cosA - z * sinA,
            0,    1, 0,    -y,
            -sinA, 0, cosA, -x * -sinA - z * cosA,
            0,    0, 0,    1
        ];
    }

    perspective(fov=(Math.PI / 4), aspect=(canvas.width / canvas.height), near=0.1, far=500) {
        const f = 1.0 / Math.tan(fov / 2);
        return [
            f / aspect, 0,  0,  0,
            0,  f,  0,  0,
            0,  0,  (far + near) / (near - far), -1,
            0,  0,  (2 * far * near) / (near - far),  0
        ];
    }
}