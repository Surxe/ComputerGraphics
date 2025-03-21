class Coin extends Actor {
    constructor(...args) {
        super(...args);
    }

    update_velocities() {
        // Rotate
        var rotation_unit_vector = [0, this.entity.rotation_speed, 0];
        this.update_rotation_velocity(rotation_unit_vector);
    }
}