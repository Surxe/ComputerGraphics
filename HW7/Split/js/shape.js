class Shape {
    constructor(positions, translations=[0, 0, 0], scalars=[1, 1, 1], rotations=[0, 0, 0], rgb=[0, 0, 0]) {
        this.positions = positions; // Assume positions is a list of [x, y, z] lists
        this.translations = translations; //translations is synonymous to location
        this.scalars = scalars;
        this.rotations = rotations;
        this.rgb = rgb;
        
        this.process_transformations();
    }

    process_transformations() {
        this.positions = this.center_positions(this.positions);
        this.positions = Transform.scale_positions(this.positions, this.scalars);
        this.positions = Transform.translate_positions(this.positions, this.translations);
        this.positions = Transform.rotate_positions(this.positions, this.rotations);

        var reformatted_positions = this.reformat_positions_arr();
        this.buffer_vertices(reformatted_positions)
    }

    // Ensure positions is centered around the origin
    center_positions(positions) {
        var x_sum = 0;
        var y_sum = 0;
        var z_sum = 0;
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            x_sum += positions[vertex_i][0];
            y_sum += positions[vertex_i][1];
            z_sum += positions[vertex_i][2];
        }

        var x_avg = x_sum / positions.length;
        var y_avg = y_sum / positions.length;
        var z_avg = z_sum / positions.length;

        if (x_avg != 0 || y_avg != 0 || z_avg != 0) {
            // Center the shape around the origin
            for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
                positions[vertex_i][0] -= x_avg;
                positions[vertex_i][1] -= y_avg;
                positions[vertex_i][2] -= z_avg;
            }
        }

        console.log('Centered positions:', positions);

        return positions
    }

    // Reformat to [x, y, z, r, g, b] format
    // gl format is not very readable, and is not used to store the data, but is rather used in an intermediary step
    reformat_positions_arr() {
        var vertices = [];
        for (var vertex_i = 0; vertex_i < this.positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                vertices.push(this.positions[vertex_i][dimension_j]);
            }
            
            vertices.push(this.rgb[0]);
            vertices.push(this.rgb[1]);
            vertices.push(this.rgb[2]);
        }

        return vertices;
    }
    
    buffer_vertices(vertices) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
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
    }
}