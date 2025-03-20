class Villain extends Character {
    constructor(...args) {
        super(...args);
    }

    update_velocities() {
        // Move forward
        var position_direction = 1;
        var unit_vector = this.calc_unit_vector(position_direction);
        this.update_position_velocity(unit_vector);

        // Rotate left
        // 5% chance of setting to 'rotate 1 degrees in a random direction'
        var random_number = Math.random();
        if (random_number < .05) {
            var rotation_direction = Math.random() < .5 ? 1 : -1;
            var rotation_unit_vector = [0, 0, rotation_direction];
            this.update_rotation_velocity(rotation_unit_vector);
        }
    }
}