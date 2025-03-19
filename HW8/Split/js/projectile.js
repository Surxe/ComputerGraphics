class Projectile extends Actor {
    constructor(...args) {
        super(...args);
    }

    // Update movement/rotations based on pressed keys
    //keys_pressed is a map with keys [W, A, S, D] and values [true, false]
    update_velocities(p1) {
        // Projectile will not rotate

        // Position
        var unit_vector = this.calc_unit_vector(1);
        this.update_position_velocity(unit_vector);
    }
}