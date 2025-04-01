class Camera {
    constructor(fov = 60, aspect_ratio = 1.0, near = 0.1, far = 100.0) {
        this.x = 0;
        this.y = 0;
        this.z = 2;
        this.rotation = 0;

        this.fov = fov;
        this.aspect_ratio = aspect_ratio;
        this.near = near;
        this.far = far;
    }

    move_forward(amount) {
        this.z -= amount * Math.cos(this.rotation);
        this.x -= amount * Math.sin(this.rotation);
    }

    move_backward(amount) {
        this.move_forward(-amount);
    }

    move_up(amount) {
        this.y += amount;
    }

    move_down(amount) {
        this.y -= amount;
    }

    rotate_left(amount) {
        this.rotation += amount;
    }

    rotate_right(amount) {
        this.rotation -= amount;
    }

    get_view_matrix() {
        const cos_r = Math.cos(-this.rotation);
        const sin_r = Math.sin(-this.rotation);

        return new Float32Array([
            cos_r,  -sin_r,  0,  0,
            sin_r,   cos_r,  0,  0,
              0,       0,    1,  0,
            -this.x, -this.y, -this.z, 1
        ]);
    }

    get_projection_matrix() {
        const fov_rad = (this.fov * Math.PI) / 180;
        const f = 1.0 / Math.tan(fov_rad / 2);
        const range_inv = 1.0 / (this.near - this.far);

        return new Float32Array([
            f / this.aspect_ratio, 0,  0,  0,
            0,  f,  0,  0,
            0,  0,  (this.far + this.near) * range_inv, -1,
            0,  0,  (2 * this.far * this.near) * range_inv, 0
        ]);
    }
}