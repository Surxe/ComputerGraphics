class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;
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

    get_transform_matrix() {
        const cos_r = Math.cos(-this.rotation);
        const sin_r = Math.sin(-this.rotation);

        return new Float32Array([
            cos_r,  -sin_r,  0, 0,
            sin_r,   cos_r,  0, 0,
              0,       0,    1, 0,
            -this.x, -this.y, 0, 1
        ]);
    }
}