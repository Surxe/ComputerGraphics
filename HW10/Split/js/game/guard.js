class Guard extends Actor {
    constructor() {
        // Body (3d cube)
        const body_vertices = [
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
        const body_indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            2, 3, 7, 2, 7, 6,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];
        // Cube colors (r, g, b)
        const body_colors = [
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

        // Head (3d sphere)
        const sphere_data = create_sphere(.5, 10, 10, [1, 1, 0]) //yellow
        const head_vertices = sphere_data.vertices;
        const head_indices = sphere_data.indices;
        const head_colors = sphere_data.colors;
        for (let i = 1; i < head_vertices.length; i += 3) {
            head_vertices[i] -= 1; // Shift down by 1 unit
        }

        // left arm (3d cylinder)
        const left_arm_data = create_cube([.5, .5, 1], [0, 0, 1]) //blue
        const left_arm_vertices = [...left_arm_data.vertices];
        const left_arm_indices = left_arm_data.indices;
        const left_arm_colors = left_arm_data.colors;
        for (let i = 2; i < left_arm_vertices.length; i += 3) {
            left_arm_vertices[i] -= 1;
        }

        // right arm (3d cylinder)
        const right_arm_vertices = [...left_arm_data.vertices];
        const right_arm_indices = [...left_arm_data.indices];
        const right_arm_colors = [...left_arm_data.colors];
        for (let i = 2; i < right_arm_vertices.length; i += 3) {
            right_arm_vertices[i] += 1;
        }

        // left leg (3d cylinder)
        const left_leg_data = create_cube([.5, 1, .3], [0, 1, 0]) //green
        const left_leg_vertices = [...left_leg_data.vertices];
        const left_leg_indices = left_leg_data.indices;
        const left_leg_colors = left_leg_data.colors;
        for (let i = 1; i < left_leg_vertices.length; i += 3) {
            left_leg_vertices[i] -= 1;
        }
        for (let i = 2; i < left_leg_vertices.length; i += 3) {
            left_leg_vertices[i] -= .2;
        }

        // right leg (3d cylinder)
        const right_leg_vertices = [...left_leg_data.vertices];
        const right_leg_indices = [...left_leg_data.indices];
        const right_leg_colors = [...left_leg_data.colors];
        for (let i = 1; i < right_leg_vertices.length; i += 3) {
            right_leg_vertices[i] -= 1;
        }
        for (let i = 2; i < right_leg_vertices.length; i += 3) {
            right_leg_vertices[i] += .2;
        }


        // Combine the sets of vertices, indices, and colors
        const combined_vertices = [
            ...body_vertices,
            ...head_vertices,
            ...left_arm_vertices,
            ...right_arm_vertices,
            ...left_leg_vertices,
            ...right_leg_vertices
        ];
        const combined_indices = [
            ...body_indices,
            ...head_indices.map(index => index + body_vertices.length/3),
            ...left_arm_indices.map(index => index + body_vertices.length/3 + head_vertices.length/3),
            ...right_arm_indices.map(index => index + body_vertices.length/3 + head_vertices.length/3 + left_arm_vertices.length/3),
            ...left_leg_indices.map(index => index + body_vertices.length/3 + head_vertices.length/3 + left_arm_vertices.length/3 + right_arm_vertices.length/3),
            ...right_leg_indices.map(index => index + body_vertices.length/3 + head_vertices.length/3 + left_arm_vertices.length/3 + right_arm_vertices.length/3 + left_leg_vertices.length/3)
        ];
        const combined_colors = [
            ...body_colors,
            ...head_colors,
            ...left_arm_colors,
            ...right_arm_colors,
            ...left_leg_colors,
            ...right_leg_colors
        ];


        const distance = 20;
        const x = Math.random() * distance - distance / 2;
        const y = 2;
        const z = Math.random() * distance - distance / 2;
        const location = [x, y, z];
        const entity = new Entity(
            combined_vertices,
            combined_indices,
            combined_colors,
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