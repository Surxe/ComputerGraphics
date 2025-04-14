function create_sphere(radius, lat_segments, long_segments, rgb) {
    const verts = [];
    const indices = [];
    const colors = [];

    // Create vertices
    for (let lat = 0; lat <= lat_segments; lat++) {
        const theta = (lat * Math.PI) / lat_segments;
        const sin_theta = Math.sin(theta);
        const cos_theta = Math.cos(theta);

        for (let lon = 0; lon <= long_segments; lon++) {
            const phi = (lon * 2 * Math.PI) / long_segments;
            const sin_phi = Math.sin(phi);
            const cos_phi = Math.cos(phi);

            const x = radius * sin_theta * cos_phi;
            const y = radius * cos_theta + 2; // Raise the sphere to height 2
            const z = radius * sin_theta * sin_phi;

            verts.push(x, y, z);
            colors.push(rgb[0], rgb[1], rgb[2]);
        }
    }

    // Create indices
    for (let lat = 0; lat < lat_segments; lat++) {
        for (let lon = 0; lon < long_segments; lon++) {
            const first = (lat * (long_segments + 1)) + lon;
            const second = first + long_segments + 1;

            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }

    return { vertices: verts, indices: indices, colors: colors };
}

function create_cube(sizes=[1, 1, 1], rgb=[1, 1, 1]) {
    const [w, h, d] = sizes;

    const vertices = [];
    const indices = [];
    const colors = [];

    const half_w = w / 2;
    const half_h = h / 2;
    const half_d = d / 2;

    // Define the 8 vertices of a cube
    vertices.push(
        // Front face
        -half_w, -half_h, half_d,
        half_w, -half_h, half_d,
        half_w, half_h, half_d,
        -half_w, half_h, half_d,

        // Back face
        -half_w, -half_h, -half_d,
        half_w, -half_h, -half_d,
        half_w, half_h, -half_d,
        -half_w, half_h, -half_d
    );
    // Define the 12 triangles (2 per face) using indices
    indices.push(
        0, 1, 2, 0, 2, 3, // Front face
        4, 5, 6, 4, 6, 7, // Back face
        0, 1, 5, 0, 5, 4, // Left face
        2, 3, 7, 2, 7, 6, // Right face
        0, 3, 7, 0, 7, 4, // Top face
        1, 2, 6, 1, 6, 5 // Bottom face
    );

    // Assign the same color to each vertex
    for (let i = 0; i < vertices.length / 3; i++) {
        colors.push(rgb[0], rgb[1], rgb[2]);
    }
    return {vertices: vertices, indices: indices, colors: colors};
}