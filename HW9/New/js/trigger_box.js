class TriggerBox extends GameObject{
    constructor(location=[0, 0, 0], size=[1, 1, 1]) {
        // Define the 8 vertices of a cube, assuming the center of the box is at the location
        const [x, y, z] = location; //location relative to entity's location
        const [width, height, depth] = size;

        var vertices = [
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

        super(vertices, location); // Call the parent constructor
    }

    get_tbox_global_verts(entity_global_location) {
        // Get the global location of the trigger box by adding entity's location to its local vertices
        const trigger_box_local_vertices = this.vertices;
        return trigger_box_local_vertices.map((v, i) => {
            if (i % 3 === 0) { // x coordinate
                return v + entity_global_location[0];
            } else if (i % 3 === 1) { // y coordinate
                return v + entity_global_location[1];
            } else { // z coordinate
                return v + entity_global_location[2];
            }
        });
    }
}