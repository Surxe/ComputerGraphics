class Shape {
    constructor(vertices, rgb=[0, 0, 0]) {
        // Assume vertices is a list of (x, y, z) records
        // Transform to [x, y, z, r, g, b] format
        var positions = [];
        for (var vertex_i = 0; vertex_i < vertices.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                positions.push(vertices[vertex_i][dimension_j]);
            }
            
            positions.push(rgb[0]);
            positions.push(rgb[1]);
            positions.push(rgb[2]);
        }
        
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);

        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        var offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        return this;
    }
}