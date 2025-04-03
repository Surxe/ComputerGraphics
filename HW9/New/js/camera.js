class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 5;
        this.angle = 0;
        this.speed = 0.1;
        this.rotation_speed = 0.05;
    }

    move_forward() {
        this.x += this.speed * Math.sin(this.angle);
        this.z -= this.speed * Math.cos(this.angle);
    }

    move_backward() {
        this.x -= this.speed * Math.sin(this.angle);
        this.z += this.speed * Math.cos(this.angle);
    }

    move_up() {
        this.y += this.speed;
    }

    move_down() {
        this.y -= this.speed;
    }

    rotate_left() {
        this.angle += this.rotation_speed;
    }

    rotate_right() {
        this.angle -= this.rotation_speed;
    }

    get_view_matrix() {
        const cosA = Math.cos(this.angle), sinA = Math.sin(this.angle);
        return [
            cosA, 0, sinA, -this.x * cosA - this.z * sinA,
            0,    1, 0,    -this.y,
            -sinA, 0, cosA, -this.x * -sinA - this.z * cosA,
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

const camera = new Camera();