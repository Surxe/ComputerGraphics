class SpotLight extends Light {
    constructor(location) {
        super([1, 1, 1]); // White light color

        this.position = location;
        this.position_velocities = [0, 0, 0]; // Initialize position velocities
        this.direction = [0, -1, 0];
        this.cutoff_degrees = 30;
    }

    get_next_position() {
        // Add position_velocities to current position
        const new_positions = this.position.slice(); // Create a copy of the current position
        for (let i = 0; i < 3; i++) {
            new_positions[i] += this.position_velocities[i];
        }
        return new_positions; // Return the updated position
    }

    move() {
        this.position = this.get_next_position(); // Update the position of the light
    }

    tick(should_move) {
        if (should_move) {
            this.move(); // Move the light if the actor moved
        }
    }
}