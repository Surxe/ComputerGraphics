class GameObject {
    constructor(local_vertices, location=[0, 0, 0]) {
        for (let i = 0; i < local_vertices.length; i += 3) {
            local_vertices[i] += location[0];
            local_vertices[i + 1] += location[1];
            local_vertices[i + 2] += location[2];
        }
        this.vertices = local_vertices;
        this.location = location;
    }
}