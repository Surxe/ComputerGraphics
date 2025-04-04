class GameObject {
    constructor(local_vertices, location=[0, 0, 0]) {
        this.local_vertices = local_vertices; // local vertices relative to the object
        this.location = location;
        this.globalize_vertices();
    }

    globalize_vertices() {
        // Get the global location of the object by adding entity's location to its local vertices
        const globalized_verts = this.local_vertices.map((v, i) => {
            if (i % 3 === 0) { // x coordinate
                return v + this.location[0];
            } else if (i % 3 === 1) { // y coordinate
                return v + this.location[1];
            } else { // z coordinate
                return v + this.location[2];
            }
        });

        this.vertices = [...globalized_verts];
    }

    get_next_position(position_velocities, rotation_velocities=null) {
        var new_vertices = [...this.local_vertices];

        // Rotate
        // Assuming rotation_velocities is an array of [x, y, z] angles in radians
        if (rotation_velocities) {
            console.log('Before rotation: ', new_vertices);
            new_vertices = Transform.rotate_positions(new_vertices, rotation_velocities);
            console.log('After rotation: ', new_vertices);
        }

        // Translate
        for (let i = 0; i < new_vertices.length; i += 3) {
            new_vertices[i] += position_velocities[0];
            new_vertices[i+1] += position_velocities[1];
            new_vertices[i+2] += position_velocities[2];
        }

        return new_vertices;
    }

    move(position_velocities, rotation_velocities) {
        this.local_vertices = this.get_next_position(position_velocities, rotation_velocities);
        console.log('Moved vertices: ', this.local_vertices);
        this.globalize_vertices();
    }
}