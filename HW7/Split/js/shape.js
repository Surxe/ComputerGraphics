class Shape {
    constructor(
            positions, 
            translations=[0, 0, 0], 
            scalars=[1, 1, 1], 
            rotations=[0, 0, 0], 
            outline_gl_draw_mode=gl.LINE_LOOP, 
            fill_gl_draw_mode=gl.TRIANGLES, 
            should_fill=true, 
            rgb=[0, 0, 0]
        ) {

        // Deep copy all arguments when creating the shape
        this.original_positions = positions.map(vertex => [...vertex]);
        this.positions = positions.map(vertex => [...vertex]); // Assume positions is a list of [x, y, z] lists
        this.translations = [...translations]; //translations is synonymous to location
        this.scalars = [...scalars];
        this.rotations = [...rotations];
        this.outline_gl_draw_mode = outline_gl_draw_mode;
        this.fill_gl_draw_mode = fill_gl_draw_mode;
        this.should_fill = should_fill;
        this.rgb = rgb;
        
        this.process_transformations();
    } 

    process_transformations() {
        this.positions = this.center_positions(this.original_positions);
        this.positions = Transform.rotate_positions(this.positions, this.rotations);
        this.positions = Transform.scale_positions(this.positions, this.scalars);
        this.positions = Transform.translate_positions(this.positions, this.translations);
        this.is_out_of_bounds(this.positions);

        var reformatted_positions = this.reformat_positions_arr(this.positions);
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

        return positions.map(vertex => [...vertex]);
    }

    // Reformat to [x, y, z, r, g, b] format
    // gl format is not very readable, and is not used to store the data, but is rather used in an intermediary step
    reformat_positions_arr(positions) {
        var vertices = [];
        for (var vertex_i = 0; vertex_i < positions.length; vertex_i++) {
            for (var dimension_j = 0; dimension_j < 3; dimension_j++) {
                vertices.push(positions[vertex_i][dimension_j]);
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

        var gl_draw_mode = this.should_fill ? this.fill_gl_draw_mode : this.outline_gl_draw_mode;

        gl.drawArrays(gl_draw_mode, 0, this.positions.length);
    }
}

class Triangle extends Shape {
    constructor(positions, translations, scalars, rotations, should_fill) {
        super(positions, translations, scalars, rotations, gl.LINE_LOOP, gl.TRIANGLES, should_fill);
    }
}

class Rectangle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Line extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.LINES, should_fill);
    }
}

class Polygon extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Circle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Point extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.POINTS, gl.POINTS, should_fill);
    }
}