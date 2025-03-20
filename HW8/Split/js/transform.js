class Transform {
    static num_dimensions = 3;

    static translate_position(position, translation) {
        return position + translation;
    }

    static add_1d_arrays(array1, array2) {
        return array1.map((val, i) => val + array2[i]);
    }

    static translate_positions(positions, translations) {
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < Transform.num_dimensions; dimension_j++) {
                positions[vertex_i][dimension_j] = Transform.translate_position(positions[vertex_i][dimension_j], translations[dimension_j]);
            }
        }

        return positions;
    }

    static scale_position(position, scalar) {
        return position * scalar;
    }

    static scale_1d_array(array, scalar) {
        for (var i = 0; i < array.length; i++) {
            array[i] = Transform.scale_position(array[i], scalar);
        }

        return array;
    }

    static scale_positions(positions, scalars) {
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < Transform.num_dimensions; dimension_j++) {
                positions[vertex_i][dimension_j] = Transform.scale_position(positions[vertex_i][dimension_j], scalars[dimension_j]);
            }
        }

        return positions;
    }

    static rotate_axes(position, degrees=[0, 0, 0]) {
        let [x, y, z] = position;
        let [x_rads, y_rads, z_rads] = degrees.map(deg => deg * (Math.PI / 180)); // Convert degrees to radians

        // Rotation around X-axis
        let x_cos = Math.cos(x_rads), x_sin = Math.sin(x_rads);
        let y1 = y * x_cos - z * x_sin;
        let z1 = y * x_sin + z * x_cos;

        // Rotation around Y-axis
        let y_cos = Math.cos(y_rads), y_sin = Math.sin(y_rads);
        let x2 = x * y_cos + z1 * y_sin;
        let new_z = -x * y_sin + z1 * y_cos;

        // Rotation around Z-axis
        let z_cos = Math.cos(z_rads), z_sin = Math.sin(z_rads);
        let new_x = x2 * z_cos - y1 * z_sin;
        let new_y = x2 * z_sin + y1 * z_cos;

        return [new_x, new_y, new_z];
    }

    static rotate_positions(positions, degrees=[0, 0, 0]) {
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            positions[vertex_i] = Transform.rotate_axes(positions[vertex_i], degrees);
        }
        return positions;
    }

    static get_magnitude(array_1d) {
        var sum = 0;
        for (var i = 0; i < array_1d.length; i++) {
            sum += array_1d[i] ** 2;
        }
        return Math.sqrt(sum);
    }

    static dot_3d(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }

    static normalize_3d(v) {
        var magnitude = Math.sqrt(this.dot_3d(v, v));
        return [v[0] / magnitude, v[1] / magnitude, v[2] / magnitude];
    }

    static rotate_3d(position, rotations) {
        // Rotate a 3d position by the given rotations
        var x = position[0];
        var y = position[1];
        var z = position[2];
        var x_rads = rotations[0] * (Math.PI / 180); // Convert degrees to radians
        var y_rads = rotations[1] * (Math.PI / 180); // Convert degrees to radians
        var z_rads = rotations[2] * (Math.PI / 180); // Convert degrees to radians
        // Rotation around X-axis
        var x_cos = Math.cos(x_rads);
        var x_sin = Math.sin(x_rads);
        var y1 = y * x_cos - z * x_sin;
        var z1 = y * x_sin + z * x_cos;
        // Rotation around Y-axis
        var y_cos = Math.cos(y_rads);
        var y_sin = Math.sin(y_rads);
        var x2 = x * y_cos + z1 * y_sin;
        var new_z = -x * y_sin + z1 * y_cos;
        // Rotation around Z-axis
        var z_cos = Math.cos(z_rads);
        var z_sin = Math.sin(z_rads);
        var new_x = x2 * z_cos - y1 * z_sin;
        var new_y = x2 * z_sin + y1 * z_cos;
        return [new_x, new_y, new_z];
    }
}