class Guard extends Actor {
    constructor() {
        // Cube vertices
        const vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5
        ];
        // Cube indices
        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            2, 3, 7, 2, 7, 6,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];
        // Cube colors (r, g, b)
        const colors = [
            // Purple
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,

            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, 0.5,
        ];
        const distance = 20;
        const x = Math.random() * distance - distance / 2;
        const y = 2;
        const z = Math.random() * distance - distance / 2;
        const location = [x, y, z];
        const entity = new Entity(
            vertices,
            indices,
            colors,
            location
        )
        const trigger_boxes = [
            new TriggerBox([0, -2+0.5, 0], [1, .5, 1])
        ]

        super(entity, trigger_boxes);

        // Attach a spot light
        const spot_light = new SpotLight([location[0], location[1] - 1, location[2]]); // Position the light just below the actor
        this.attach_light(spot_light);
        gl_setup.add_spot_light(spot_light);


        // Movement pattern is determined per instance
        this.movement_pattern_direction = Math.random() < 0.5 ? -1 : 1; // 1 for clockwise, -1 for counterclockwise
        this.movement_time_to_loop = Math.random() * 20 + 50; // seconds for a full loop. [50 to 70]
        this.movement_edge_length = Math.random() * 20 + 10; // length of each edge of the square to move. [10 to 30]
    }

    get_next_velocities() {
        const time = performance.now() / 1000; // seconds

        // Move along edge of a square as pathing
        var percent_path_traveled = (time % this.movement_time_to_loop) / this.movement_time_to_loop;
        if (this.movement_pattern_direction === -1) {
            // Reverse the direction of movement by complementing the percent path traveled
            percent_path_traveled = 1 - percent_path_traveled;
        }

        var velocities;
        var speed = 0.01;
        if (percent_path_traveled < 0.25) {
            // Move along the first edge (0, 0) to (1, 0)
            velocities = [speed, 0, 0];
        }
        else if (percent_path_traveled < 0.5) {
            // Move along the second edge (1, 0) to (1, 1)
            velocities = [0, 0, speed];
        }
        else if (percent_path_traveled < 0.75) {
            // Move along the third edge (1, 1) to (0, 1)
            velocities = [-speed, 0, 0];
        }
        else {
            // Move along the fourth edge (0, 1) to (0, 0)
            velocities = [0, 0, -speed];
        }

        return velocities;
    }

    // Override Actor.tick()
    tick(...args) {
        // Determine velocity to set for the entity
        const new_velocities = [...this.get_next_velocities()];
        this.position_velocities = new_velocities;
        this.light.position_velocities = new_velocities;

        super.tick(...args);
    }
}