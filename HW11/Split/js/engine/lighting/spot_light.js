class SpotLight extends Light {
    constructor(location, direction=[0, -1, 0], cutoff_degrees=30) { //face down by default
        super([1, 1, 1]); // White light color

        this.position = location;
        this.position_velocities = [0, 0, 0]; // Initialize position velocities
        this.rotation_velocities = [0, 0, 0];
        this.direction = direction;
        this.cutoff_degrees = cutoff_degrees;
    }

    get_next_position() {
        // Add position_velocities to current position
        const new_positions = this.position.slice(); // Create a copy of the current position
        for (let i = 0; i < 3; i++) {
            new_positions[i] += this.position_velocities[i];
        }

        return new_positions; // Return the updated position
    }

    get_next_direction() {
        const yaw = this.rotation_velocities[1]; // Yaw rotation velocity in radians

        const new_direction = this.direction.slice(); // Create a copy of the current direction
        
        // Update the direction based on the yaw rotation velocity. Each dimension of direction can be from [-1, ... 1]
        const x = new_direction[0];
        const y = new_direction[1];
        const z = new_direction[2];
        new_direction[0] = x * Math.cos(yaw) - z * Math.sin(yaw); // Update x based on yaw
        new_direction[2] = x * Math.sin(yaw) + z * Math.cos(yaw); // Update z based on yaw
        new_direction[1] = y; // Keep y unchanged

        // Normalize the new direction vector to ensure it remains a unit vector
        const length = Math.sqrt(new_direction[0]**2 + new_direction[1]**2 + new_direction[2]**2);
        if (length > 0) {
            new_direction[0] /= length;
            new_direction[1] /= length;
            new_direction[2] /= length;
        }
        
        return new_direction;
    }

    move() {
        this.position = this.get_next_position(); // Update the position of the light
        this.direction = this.get_next_direction(); // Update the direction of the light
    }

    tick(should_move) {
        if (should_move) {
            this.move(); // Move the light if the actor moved
        }
    }
}