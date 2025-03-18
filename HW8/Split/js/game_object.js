class GameObject {
    // GameObject represents any 3D object
    constructor(
            positions,
            rotations=[0, 0, 0],
            scalars=[1, 1, 1],
            translations=[0, 0, 0],
            position_velocity=[0, 0, 0],
            rotation_velocity=[0, 0, 0],
            indices=null, // optional, will default to indices of array
        ) {

        this.original_positions = positions.map(vertex => [...vertex]); // List of [x, y, z] lists
        this.positions;
        this.rotations = [...rotations];
        this.scalars = [...scalars];
        this.translations = [...translations];
        this.position_velocity = [...position_velocity];
        this.rotation_velocity = [...rotation_velocity];
        this.indices = indices ? [...indices] : null;

        this.position_direction = [0, 0, 0];
        this.rotation_direction = [0, 0, 0];

        this.process_transformations()
    }

    process_transformations() {
        this.positions = this.original_positions.map(vertex => [...vertex]);
        this.positions = this.center_positions(this.positions);
        this.positions = Transform.rotate_positions(this.positions, this.rotations);
        this.positions = Transform.scale_positions(this.positions, this.scalars);
        this.positions = Transform.translate_positions(this.positions, this.translations);
    }

    // Ensure positions is centered around the origin
    center_positions(positions) {
        var x_sum = 0;
        var y_sum = 0;
        var z_sum = 0;
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            x_sum += positions[vertex_i][0];
            y_sum += positions[vertex_i][1];
            z_sum += positions[vertex_i][2];
        }

        var x_avg = x_sum / positions.length;
        var y_avg = y_sum / positions.length;
        var z_avg = z_sum / positions.length;

        if (x_avg != 0 || y_avg != 0 || z_avg != 0) {
            // Center the game_object around the origin
            for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
                positions[vertex_i][0] -= x_avg;
                positions[vertex_i][1] -= y_avg;
                positions[vertex_i][2] -= z_avg;
            }
        }

        return positions.map(vertex => [...vertex]);
    }

    // Reformat to [x, y, z, r, g, b] format
    // gl format is not very readable, and is not used to store the data, but is rather used in an intermediary step
    reformat_positions_arr(positions) {
        var is_rgb_per_vertex;
        if (this.rgb.length == this.positions.length && this.rgb[0].length == 3) { // if num vertices in rgb and positions match and each rgb has 3 values
            is_rgb_per_vertex = true;
        }
        else if (this.rgb.length == 3) { // if rgb is a single color with 3 values, apply it to all vertices
            is_rgb_per_vertex = false 
        }
        else {
            console.error("Invalid rgb array length.");
            return;
        }

        var vertices = [];
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                vertices.push(positions[vertex_i][dimension_j]);
            }
            
            if (is_rgb_per_vertex) {
                vertices.push(this.rgb[vertex_i][0]);
                vertices.push(this.rgb[vertex_i][1]);
                vertices.push(this.rgb[vertex_i][2]);
            } else {
                vertices.push(this.rgb[0]);
                vertices.push(this.rgb[1]);
                vertices.push(this.rgb[2]);
            }
        }

        return vertices;
    }
    
    is_out_of_bounds() {
        for (var vertex_i = 0; vertex_i < this.positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                if (this.positions[vertex_i][dimension_j] > 1 || this.positions[vertex_i][dimension_j] < -1) {
                    return true;
                }
            }
        }

        return false;
    }

    move() {
        // Apply rotation_velocity to rotations
        for (var dimension_i = 0; dimension_i < 3; dimension_i++) {
            this.rotations[dimension_i] += this.rotation_velocity[dimension_i];
        }

        // Apply position_velocity to translations
        // Translate in direction the object is facing
        for (var dimension_i = 0; dimension_i < 3; dimension_i++) {
            this.translations[dimension_i] += this.position_velocity[dimension_i];
        }
    }

    // Update movement/rotations based on pressed keys
    update_velocities(keys_pressed) {
        //keys_pressed is a map with keys [W, A, S, D] and values [true, false]
        var position_magnitude = .015;
        var rotation_magnitude = 4;
        var rotation_sign;

        // (A/D) -> Rotate left/right
        if (keys_pressed.A) {
            rotation_sign = 1;
        } else if (keys_pressed.D) {
            rotation_sign = -1
        }
        else {
            rotation_sign = 0;
        }
        var rotation_velocity = rotation_magnitude * rotation_sign; //degrees
        this.rotation_direction = [0, 0, rotation_sign];
        var rotation_velocity_arr = Transform.scale_1d_array(this.rotation_direction, rotation_magnitude);
        this.rotation_velocity = rotation_velocity_arr;

        var position_sign;
        // (W/S) -> Move forward/backward
        if (keys_pressed.W) {
            position_sign = -1
        } else if (keys_pressed.S) {
            position_sign = 1
        }
        else {
            position_sign = 0;
        }
        // Given position_velocity and rotation_velocity:
        // if facing left, change x dimension by position_velocity pixels
        // if facing right, change x dimension by position_velocity pixels
        // if facing up, change y dimension by position_velocity pixels
        // if facing down, change y dimension by position_velocity pixels
        // and all directions in between
        // ex: position_velocity = 1, rotation_velocity = 180 degrees (facing down) -> [0, -1, 0] (move down)
        var current_rotation = this.rotations[2] + rotation_velocity; //pre-emptively add rotation velocity as it will be added in the next move()
        var rotation_rads = current_rotation * Math.PI / 180;
        var dx = position_sign * Math.sin(rotation_rads);
        var dy = position_sign * Math.cos(rotation_rads);
        this.position_direction = [dx, -dy, 0];
        var position_velocity_arr = Transform.scale_1d_array(this.position_direction, position_magnitude);
        this.position_velocity = position_velocity_arr
    }

    // true/false if this is touching another game_object
    is_touching(game_object) {
        // touching means 
    }
}