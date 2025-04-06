class Camera {
    constructor() {
        this.location = [5, 0, 0];
        this.angle = 0;
        this.position_speed = 0.2 * tick_rate_scale; //position speed
        const rotation_speed = 0.02 * tick_rate_scale;
        this.rotation_velocities = [0, rotation_speed, 0]; // Rotation velocities
    }

    move(keys_down) {
        const key_to_move = {
            "w": () => this.move_forward(),
            "s": () => this.move_backward(),
            "a": () => this.rotate_left(),
            "d": () => this.rotate_right(),
            "z": () => this.move_up(),
            "x": () => this.move_down(),
        }

        for (const key in keys_down) {
            if (keys_down[key]) {
                const move_function = key_to_move[key];
                if (move_function) {
                    move_function();
                }
            }
        }
    }

    move_forward() {
        this.location[0] += this.position_speed * Math.sin(this.angle);
        this.location[2] -= this.position_speed * Math.cos(this.angle);
    }

    move_backward() {
        this.location[0] -= this.position_speed * Math.sin(this.angle);
        this.location[2] += this.position_speed * Math.cos(this.angle);
    }

    move_up() {
        this.location[1] += this.position_speed;
    }

    move_down() {
        this.location[1] -= this.position_speed;
    }

    rotate_left() {
        this.angle -= this.rotation_velocities[1];
    }

    rotate_right() {
        this.angle += this.rotation_velocities[1];
    }

    get_view_matrix() {
        const cosA = Math.cos(this.angle), sinA = Math.sin(this.angle);
        return [
            cosA, 0, sinA, -this.location[0] * cosA - this.location[2] * sinA,
            0,    1, 0,    -this.location[1],
            -sinA, 0, cosA, -this.location[0] * -sinA - this.location[2] * cosA,
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