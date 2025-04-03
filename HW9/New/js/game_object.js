class GameObject {
    constructor(local_vertices, location=[0, 0, 0], position_velocities=[0, 0, 0], rotation_velocities=[0, 0, 0]) {
        // globalize the vertices
        for (let i = 0; i < local_vertices.length; i += 3) {
            local_vertices[i] += location[0];
            local_vertices[i + 1] += location[1];
            local_vertices[i + 2] += location[2];
        }
        this.vertices = local_vertices;

        this.location = location;
        this.position_velocities = position_velocities; // [vx, vy, vz]
        this.rotation_velocities = rotation_velocities; // [rx, ry, rz]
    }

    move() {
        var new_vertices = [];
        for (let i = 0; i < this.vertices.length; i += 3) {
            new_vertices.push(this.vertices[i] + this.position_velocities[0]);
            new_vertices.push(this.vertices[i + 1] + this.position_velocities[1]);
            new_vertices.push(this.vertices[i + 2] + this.position_velocities[2]);
        }
        this.vertices = new_vertices;
    }
}