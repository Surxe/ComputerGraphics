class SpotLight extends Light {
    constructor() {
        super([1, 1, 1]);

        const distance = 10;
        const x = Math.random() * distance - distance / 2;
        const y = 2;
        const z = Math.random() * distance - distance / 2;

        this.position = [x, y, z];
        this.direction = [0, -1, 0];
        this.cutoff_degrees = 30;
        this.initial_position = [x, y, z];

        this.movement_pattern_direction = Math.random() < 0.5 ? -1 : 1; // 1 for clockwise, -1 for counterclockwise
        this.movement_time_to_loop = Math.random() * 20 + 50; // seconds for a full loop. [50 to 70]
        this.movement_edge_length = Math.random() * 20 + 10; // length of each edge of the square to move. [10 to 30]
    }

    get_next_position() {
        const time = performance.now() / 1000; // seconds

        // Move along edge of a square as pathing
        const edge_length = 30; // length of each edge of the square
        var percent_path_traveled = (time % this.movement_time_to_loop) / this.movement_time_to_loop;
        if (this.movement_pattern_direction === -1) {
            // Reverse the direction of movement by complementing the percent path traveled
            percent_path_traveled = 1 - percent_path_traveled;
        }
        var shifts;
        if (percent_path_traveled < 0.25) {
            // Move along the first edge (0, 0) to (1, 0)
            const x = percent_path_traveled * 4 * this.movement_edge_length;
            shifts = [x, 0, 0];
        }
        else if (percent_path_traveled < 0.5) {
            // Move along the second edge (1, 0) to (1, 1)
            const y = (percent_path_traveled - 0.25) * 4 * this.movement_edge_length;
            shifts = [this.movement_edge_length, 0, y];
        }
        else if (percent_path_traveled < 0.75) {
            // Move along the third edge (1, 1) to (0, 1)
            const x = (percent_path_traveled - 0.5) * 4 * this.movement_edge_length;
            shifts = [this.movement_edge_length - x, 0, this.movement_edge_length];
        }
        else {
            // Move along the fourth edge (0, 1) to (0, 0)
            const y = (percent_path_traveled - 0.75) * 4 * this.movement_edge_length;
            shifts = [0, 0, this.movement_edge_length - y];
        }

        // Add shifts to initial position to get new location
        var new_location = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            new_location[i] = shifts[i] + this.initial_position[i];
        }

        return new_location;
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