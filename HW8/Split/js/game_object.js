class GameObject {
    // GameObject represents any 3D object
    constructor(
            name,
            positions,
            rotations=[0, 0, 0],
            scalars=[1, 1, 1],
            translations=[0, 0, 0],
            position_speed=0,
            rotation_speed=0,
            position_velocity=[0, 0, 0],
            rotation_velocity=[0, 0, 0],
            indices=null, // optional, will default to indices of array
        ) {

        this.name = name;
        this.original_positions = positions.map(vertex => [...vertex]); // List of [x, y, z] lists
        this.positions;
        this.rotations = [...rotations];
        this.scalars = [...scalars];
        this.translations = [...translations];
        this.position_speed = position_speed;
        this.rotation_speed = rotation_speed;
        this.position_velocity = [...position_velocity];
        this.rotation_velocity = [...rotation_velocity];
        this.indices = indices ? [...indices] : null;

        this.process_transformations()

        this.unit_vector = this.calc_unit_vector(1);; // direction the game_object is facing
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

        this.unit_vector = this.calc_unit_vector(1);
    }

    update_rotation_velocity(unit_vector) {
        var rotation_velocity_arr = Transform.scale_1d_array(unit_vector, this.rotation_speed);
        this.rotation_velocity = rotation_velocity_arr;
    }

    update_position_velocity(unit_vector) {
        var position_velocity_arr = Transform.scale_1d_array(unit_vector, this.position_speed);
        this.position_velocity = position_velocity_arr
    }

    calc_unit_vector(sign) {
        // Calculate the unit vector of the direction the game_object is facing
        var current_rotation = this.rotations[2];
        var rotation_rads = current_rotation * Math.PI / 180;
        var dx = sign * Math.sin(rotation_rads);
        var dy = sign * Math.cos(rotation_rads);
        return [-dx, dy, 0];
    }

    // true/false if this is touching another game_object
    is_touching(game_object) {
        // touching means 
    }
}