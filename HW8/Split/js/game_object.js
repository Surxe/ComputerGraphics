class GameObject {
    constructor(
            positions, 
            rgb=[0, 0, 0],
            rotations=[0, 0, 0],
            scalars=[1, 1, 1],
            translations=[0, 0, 0],
            should_fill=true, 
            velocity=[0, 0, 0],
            indices=null, // optional, will default to indices of array
            outline_gl_draw_mode='LINE_LOOP', 
            fill_gl_draw_mode='TRIANGLES'
        ) {

        this.original_positions = positions.map(vertex => [...vertex]); // List of [x, y, z] lists
        this.positions;
        this.rgb = [...rgb];
        this.rotations = [...rotations];
        this.scalars = [...scalars];
        this.translations = [...translations];
        this.should_fill = should_fill;
        this.velocity = [...velocity];
        this.indices = indices ? [...indices] : null;
        this.outline_gl_draw_mode = outline_gl_draw_mode;
        this.fill_gl_draw_mode = fill_gl_draw_mode;

        this.buffer()
    }

    process_transformations() {
        this.positions = this.original_positions.map(vertex => [...vertex]);
        this.positions = this.center_positions(this.positions);
        this.positions = Transform.translate_positions(this.positions, this.translations);
        this.positions = Transform.scale_positions(this.positions, this.scalars);
        this.positions = Transform.rotate_positions(this.positions, this.rotations);
        console.log("process_transformations", this.positions);
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
            // Center the game_object around the origin
            for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
                positions[vertex_i][0] -= x_avg;
                positions[vertex_i][1] -= y_avg;
                positions[vertex_i][2] -= z_avg;
            }
        }

        return positions.map(vertex => [...vertex]);
    }

    buffer_vertices(vertices) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    buffer_indices(indices) {
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }

    buffer() {
        this.process_transformations();

        var reformatted_positions = this.reformat_positions_arr(this.positions);
        this.buffer_vertices(reformatted_positions)

        if (this.indices) {
            this.buffer_indices(this.indices);
        }
    }

    // Reformat to [x, y, z, r, g, b] format
    // gl format is not very readable, and is not used to store the data, but is rather used in an intermediary step
    reformat_positions_arr(positions) {
        var is_rgb_per_vertex;
        if (this.rgb.length != this.positions.length && this.rgb.length == 1 && this.rgb[0].length == 3) { // if rgb is a single color, apply it to all vertices
            is_rgb_per_vertex = false
        }
        else if (this.rgb.length == this.positions.length) { // apply to each vertex
            is_rgb_per_vertex = true;
        }
        else {
            console.error("Invalid rgb array length.");
            return;
        }

        var vertices = [];
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                vertices.push(positions[vertex_i][dimension_j]);
            }
            
            if (is_rgb_per_vertex) {
                vertices.push(this.rgb[vertex_i][0]);
                vertices.push(this.rgb[vertex_i][1]);
                vertices.push(this.rgb[vertex_i][2]);
            } else {
                vertices.push(this.rgb[0]);
                vertices.push(this.rgb[1]);
                vertices.push(this.rgb[2]);
            }
        }

        return vertices;
    }
    
    is_out_of_bounds() {
        for (var vertex_i = 0; vertex_i < this.positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                if (this.positions[vertex_i][dimension_j] > 1 || this.positions[vertex_i][dimension_j] < -1) {
                    return true;
                }
            }
        }

        return false;
    }

    move() {
        
    }

    render(program) {
        this.buffer();

        console.log("Rendering game object.");

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

        const draw_mode_map = {
            'LINE_LOOP': gl.LINE_LOOP,
            'TRIANGLES': gl.TRIANGLES,
            'TRIANGLE_FAN': gl.TRIANGLE_FAN,
            'LINES': gl.LINES,
            'POINTS': gl.POINTS
        }
        var draw_mode = this.should_fill ? this.fill_gl_draw_mode : this.outline_gl_draw_mode;
        var gl_draw_mode = draw_mode_map[draw_mode];
        if (gl_draw_mode == undefined) {
            console.error("Invalid draw mode.");
            return;
        }

        if (this.indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl_draw_mode, this.indices.length, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(gl_draw_mode, 0, this.positions.length);
        }
    }
}