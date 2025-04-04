class Transform {
    // position = [x, y, z]
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

    // positions = [[x1, y1, z1], [x2, y2, z2], ...]
    static rotate_positions(positions, degrees=[0, 0, 0]) {
        var positions = Transform.flat_to_threes([...positions]); // Convert flat array to 3D array
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            positions[vertex_i] = Transform.rotate_axes(positions[vertex_i], degrees);
        }
        return this.threes_to_flat(positions);
    }

    // [a, b, c, d, e, f] -> [[a, b, c], [d, e, f]]
    static flat_to_threes(array) {
        var threes = [];
        for (var i = 0; i < array.length; i += 3) {
            threes.push([array[i], array[i + 1], array[i + 2]]);
        }
        return threes;
    }

    // [[a, b, c], [d, e, f]] -> [a, b, c, d, e, f]
    static threes_to_flat(array) {
        var flat = [];
        for (var i = 0; i < array.length; i++) {
            flat.push(...array[i]);
        }
        return flat;
    }
}