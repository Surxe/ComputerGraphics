class GameObject {
    constructor(local_vertices, location=[0, 0, 0]) {
        // globalize the vertices
        for (let i = 0; i < local_vertices.length; i += 3) {
            local_vertices[i] += location[0];
            local_vertices[i + 1] += location[1];
            local_vertices[i + 2] += location[2];
        }
        this.vertices = local_vertices;

        this.location = location;
    }

    get_next_position(position_velocities) {
        var new_vertices = [];
        for (let i = 0; i < this.vertices.length; i += 3) {
            new_vertices.push(this.vertices[i] + position_velocities[0]);
            new_vertices.push(this.vertices[i + 1] + position_velocities[1]);
            new_vertices.push(this.vertices[i + 2] + position_velocities[2]);
        }
        return new_vertices;
    }

    move(position_velocities, rotation_velocities) {
        var new_vertices = [];
        for (let i = 0; i < this.vertices.length; i += 3) {
            new_vertices.push(this.vertices[i] + position_velocities[0]);
            new_vertices.push(this.vertices[i + 1] + position_velocities[1]);
            new_vertices.push(this.vertices[i + 2] + position_velocities[2]);
        }
        this.vertices = new_vertices;
    }
}