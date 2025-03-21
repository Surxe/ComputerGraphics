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

        this.positions = this.process_transformations(
            this.original_positions.map(vertex => [...vertex]), 
            [...this.rotations],
            [...this.scalars],
            [...this.translations]
        );

        this.should_render = true;

        this.unit_vector = this.calc_unit_vector(1); // direction the game_object is facing
    }

    process_transformations(positions, rotations, scalars, translations) {
        positions = Transform.rotate_positions(positions, rotations);
        positions = Transform.scale_positions(positions, scalars);
        positions = Transform.translate_positions(positions, translations);
        return positions;
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

    copy_velocity(other_game_object) {
        this.position_velocity = [...other_game_object.position_velocity];
        this.rotation_velocity = [...other_game_object.rotation_velocity];
    }
    
    is_out_of_bounds(positions) {
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                if (positions[vertex_i][dimension_j] > 1 || positions[vertex_i][dimension_j] < -1) {
                    return true;
                }
            }
        }

        return false;
    }

    get_next_position(rotation_shift=0) {
        // Deep copy positions and rotations
        var new_translations = [...this.translations];
        var new_rotations = [...this.rotations];

        // Apply rotation_velocity to rotations
        for (var dimension_i = 0; dimension_i < 3; dimension_i++) {
            new_rotations[dimension_i] += this.rotation_velocity[dimension_i];
        }
        new_rotations[2] = (new_rotations[2] - rotation_shift) % 360; // Rotate rs degrees around z

        // Apply position_velocity to translations
        // Translate in direction the object is facing
        for (var dimension_i = 0; dimension_i < 3; dimension_i++) {
            new_translations[dimension_i] += this.position_velocity[dimension_i];
        }

        var new_positions = this.process_transformations(
            this.original_positions.map(vertex => [...vertex]), 
            new_rotations,
            [...this.scalars],
            new_translations
        );

        var new_position_data = [new_positions, new_rotations, new_translations];
        return new_position_data;
    }

    attempt_move(attempts_remaining=2, rotation_shift=0) {
        var new_position_data = this.get_next_position(rotation_shift);

        if (!this.can_move(new_position_data[0])) {
            return false;
        }

        // Check if its out of bounds
        if (this.is_out_of_bounds(new_position_data[0])) {
            if (attempts_remaining <= 0) {
                return false;
            }
            return this.attempt_move(attempts_remaining-1, 180);
        }

        return new_position_data;
    }

    can_move(new_positions) {
        // Check if the new position is touching another game_object
        return true
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