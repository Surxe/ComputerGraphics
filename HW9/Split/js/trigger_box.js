class TriggerBox {
    constructor(location=[0, 0, 0], size=[1, 1, 1]) {
        // Define the 8 vertices of a cube, assuming the center of the box is at the location
        const [x, y, z] = location;
        const [width, height, depth] = size;

        this.vertices = [
            // Front face
            x - width / 2, y - height / 2, z + depth / 2,
            x + width / 2, y - height / 2, z + depth / 2,
            x + width / 2, y + height / 2, z + depth / 2,
            x - width / 2, y + height / 2, z + depth / 2,

            // Back face
            x - width / 2, y - height / 2, z - depth / 2,
            x + width / 2, y - height / 2, z - depth / 2,
            x + width / 2, y + height / 2, z - depth / 2,
            x - width / 2, y + height / 2, z - depth / 2,
        ];
    }

    // Simple AABB collision check (if a point is inside the box)
    check_collision(point) {
        const [px, py, pz] = point;
        const [x_min, y_min, z_min] = [Math.min(...this.vertices.filter((_, idx) => idx % 3 === 0)),
                                       Math.min(...this.vertices.filter((_, idx) => (idx - 1) % 3 === 0)),
                                       Math.min(...this.vertices.filter((_, idx) => (idx - 2) % 3 === 0))];
        const [x_max, y_max, z_max] = [Math.max(...this.vertices.filter((_, idx) => idx % 3 === 0)),
                                       Math.max(...this.vertices.filter((_, idx) => (idx - 1) % 3 === 0)),
                                       Math.max(...this.vertices.filter((_, idx) => (idx - 2) % 3 === 0))];

        return px >= x_min && px <= x_max && py >= y_min && py <= y_max && pz >= z_min && pz <= z_max;
    }
}