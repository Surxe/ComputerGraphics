class Entity extends GameObject {
    // Entities are GameObjects that are drawn on the screen using WebGL
    constructor(draw_mode, rgb, ...args) {
        super(...args);
        this.draw_mode = draw_mode;
        this.rgb = rgb;
    }

    buffer() {
        this.process_transformations();

        var reformatted_positions = this.reformat_positions_arr(this.positions);
        this.buffer_vertices(reformatted_positions)

        if (this.indices) {
            this.buffer_indices(this.indices);
        }
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

    render(program) {
        this.buffer();

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
        var gl_draw_mode = draw_mode_map[this.draw_mode];
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