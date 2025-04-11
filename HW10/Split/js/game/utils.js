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