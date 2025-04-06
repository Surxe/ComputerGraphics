class Camera extends GameObject {
    constructor() {
        const location = [0, 0, 0]; // Initial location of the camera
        super([5, 0, 0], location); // No local vertices for the camera
        this.angle = 0;

        this.position_speed = 0.2 * tick_rate_scale;
        this.rotation_speed = 0.02 * tick_rate_scale;

        this.position_velocities = [0, 0, 0];
        this.rotation_velocities = [0, 0, 0];
    }

    move(keys_down) {
        // Reset velocities each frame
        this.position_velocities = [0, 0, 0];
        this.rotation_velocities = [0, 0, 0];

        const angle = this.angle;

        if (keys_down["w"]) {
            this.position_velocities[0] += this.position_speed * Math.sin(angle);
            this.position_velocities[2] -= this.position_speed * Math.cos(angle);
        }

        if (keys_down["s"]) {
            this.position_velocities[0] -= this.position_speed * Math.sin(angle);
            this.position_velocities[2] += this.position_speed * Math.cos(angle);
        }

        if (keys_down["z"]) {
            this.position_velocities[1] += this.position_speed;
        }

        if (keys_down["x"]) {
            this.position_velocities[1] -= this.position_speed;
        }

        if (keys_down["a"]) {
            this.rotation_velocities[1] -= this.rotation_speed;
        }

        if (keys_down["d"]) {
            this.rotation_velocities[1] += this.rotation_speed;
        }

        //this.apply_velocities();
        super.move(this.position_velocities, null); // Move the camera based on its position velocities and rotation velocities
        this.angle += this.rotation_velocities[1];
        console.log(this.vertices)
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

    perspective(fov, aspect, near, far) {
        const f = 1.0 / Math.tan(fov / 2);
        return [
            f / aspect, 0,  0,  0,
            0,  f,  0,  0,
            0,  0,  (far + near) / (near - far), -1,
            0,  0,  (2 * far * near) / (near - far),  0
        ];
    }
}