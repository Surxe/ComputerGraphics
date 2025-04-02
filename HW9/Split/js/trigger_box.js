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
}