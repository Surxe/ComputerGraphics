class OrientedBoundingBox {
    // Requirements:
    // The OBB must have 8 vertices that form a perfect cube OR
    // The OBB must have 4 vertices that form a perfect square

    constructor(positions, rotations) {
        // Validate its a cube and not a square
        if (positions.length == 4) {
            // Convert 2D box to 3D box
            const [x1, y1, z1] = positions[0];
            const [x2, y2, z2] = positions[1];
            const [x3, y3, z3] = positions[2];
            const [x4, y4, z4] = positions[3];
            positions = [
                [x1, y1, z1],
                [x2, y2, z2],
                [x3, y3, z3],
                [x4, y4, z4],
                [x1, y1, z1],
                [x2, y2, z2],
                [x3, y3, z3],
                [x4, y4, z4]
            ];
        }
        if (positions.length != 8) {
            console.error("OrientedBoundingBox must have 8 vertices.");
            return;
        }

        this.positions = positions;
        this.rotation_matrix = OrientedBoundingBox.get_rotation_matrix(rotations);

        // Compute center and half-sizes from given positions
        this.center = OrientedBoundingBox.compute_center(positions);
        this.half_sizes = OrientedBoundingBox.compute_half_sizes(positions, this.center);
    }

    // Convert Euler angles (degrees) to a rotation matrix
    static get_rotation_matrix([rx, ry, rz]) {
        const to_radians = Math.PI / 180;
        rx *= to_radians;
        ry *= to_radians;
        rz *= to_radians;

        const cos_x = Math.cos(rx), sin_x = Math.sin(rx);
        const cos_y = Math.cos(ry), sin_y = Math.sin(ry);
        const cos_z = Math.cos(rz), sin_z = Math.sin(rz);

        // Rotation matrices for each axis
        const rot_x = [
            [1, 0, 0],
            [0, cos_x, -sin_x],
            [0, sin_x, cos_x]
        ];
        const rot_y = [
            [cos_y, 0, sin_y],
            [0, 1, 0],
            [-sin_y, 0, cos_y]
        ];
        const rot_z = [
            [cos_z, -sin_z, 0],
            [sin_z, cos_z, 0],
            [0, 0, 1]
        ];

        // Combined rotation: R = Rz * Ry * Rx
        return OrientedBoundingBox.multiply_matrices(OrientedBoundingBox.multiply_matrices(rot_z, rot_y), rot_x);
    }

    // Multiply two 3x3 matrices
    static multiply_matrices(A, B) {
        return A.map((row, i) =>
            row.map((_, j) => A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j])
        );
    }

    // Compute the center of the cube
    static compute_center(positions) {
        return positions.reduce((sum, p) => sum.map((v, i) => v + p[i]), [0, 0, 0])
            .map(v => v / positions.length);
    }

    // Compute half-sizes from the center
    static compute_half_sizes(positions, center) {
        let max_diff = [0, 0, 0];
        positions.forEach(p => {
            max_diff = max_diff.map((v, i) => Math.max(v, Math.abs(p[i] - center[i])));
        });
        return max_diff;
    }

    // Project a set of points onto an axis
    static project(vertices, axis) {
        let min = Infinity, max = -Infinity;
        vertices.forEach(v => {
            const projection = OrientedBoundingBox.dot(v, axis);
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        });
        return [min, max];
    }

    // Compute the 8 vertices from the center, half-sizes, and rotation matrix
    get_vertices() {
        const [hx, hy, hz] = this.half_sizes;
        const axes = this.rotation_matrix;
        const corners = [];

        for (let dx of [-1, 1]) {
            for (let dy of [-1, 1]) {
                for (let dz of [-1, 1]) {
                    const offset = [
                        dx * hx * axes[0][0] + dy * hy * axes[1][0] + dz * hz * axes[2][0],
                        dx * hx * axes[0][1] + dy * hy * axes[1][1] + dz * hz * axes[2][1],
                        dx * hx * axes[0][2] + dy * hy * axes[1][2] + dz * hz * axes[2][2]
                    ];
                    corners.push([
                        this.center[0] + offset[0],
                        this.center[1] + offset[1],
                        this.center[2] + offset[2]
                    ]);
                }
            }
        }
        return corners;
    }

    // Dot product of two vectors
    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    // Cross product of two vectors
    static cross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    // SAT Collision Detection
    static is_touching(obb1, obb2) {
        const axes_a = obb1.rotation_matrix;
        const axes_b = obb2.rotation_matrix;

        // Separating axes
        const axes = [
            axes_a[0], axes_a[1], axes_a[2],  // Box A's axes
            axes_b[0], axes_b[1], axes_b[2],  // Box B's axes
            OrientedBoundingBox.cross(axes_a[0], axes_b[0]), OrientedBoundingBox.cross(axes_a[0], axes_b[1]), OrientedBoundingBox.cross(axes_a[0], axes_b[2]),
            OrientedBoundingBox.cross(axes_a[1], axes_b[0]), OrientedBoundingBox.cross(axes_a[1], axes_b[1]), OrientedBoundingBox.cross(axes_a[1], axes_b[2]),
            OrientedBoundingBox.cross(axes_a[2], axes_b[0]), OrientedBoundingBox.cross(axes_a[2], axes_b[1]), OrientedBoundingBox.cross(axes_a[2], axes_b[2])
        ];

        // Check projection overlap for each axis
        for (let axis of axes) {
            if (axis[0] === 0 && axis[1] === 0 && axis[2] === 0) continue; // Ignore zero vectors

            const [min_a, max_a] = OrientedBoundingBox.project(obb1.get_vertices(), axis);
            const [min_b, max_b] = OrientedBoundingBox.project(obb2.get_vertices(), axis);

            if (max_a < min_b || max_b < min_a) return false; // Found a separating axis
        }

        return true; // No separating axis found, so they overlap
    }
}