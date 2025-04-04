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

        this.vertices = globalized_verts;
    }

    get_next_position(position_velocities) {
        var new_vertices = [];
        for (let i = 0; i < this.local_vertices.length; i += 3) {
            new_vertices.push(this.local_vertices[i] + position_velocities[0]);
            new_vertices.push(this.local_vertices[i + 1] + position_velocities[1]);
            new_vertices.push(this.local_vertices[i + 2] + position_velocities[2]);
        }
        return new_vertices;
    }

    move(position_velocities, rotation_velocities) {
        this.local_vertices = this.get_next_position(position_velocities, rotation_velocities);
        this.globalize_vertices();
    }
}