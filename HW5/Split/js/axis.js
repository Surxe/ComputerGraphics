class Axis {
    constructor() {
        var axisVertices = [
            // X    Y    Z      R  G  B
            -1,    0,   0,     1, 0, 0,  // X-Axis (Red)
             1,    0,   0,     1, 0, 0,  

             0,   -1,   0,     0, 1, 0,  // Y-Axis (Green)
             0,    1,   0,     0, 1, 0   
        ];

        this.axis_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.axis_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisVertices), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.axis_buffer);

        var pos_attr_loc = gl.getAttribLocation(program, "a_position");
        var color_attr_loc = gl.getAttribLocation(program, "a_color");

        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        var offset = 0;

        gl.enableVertexAttribArray(pos_attr_loc);
        gl.enableVertexAttribArray(color_attr_loc);

        gl.vertexAttribPointer(pos_attr_loc, size, type, normalize, stride, offset);
        gl.vertexAttribPointer(color_attr_loc, size, type, normalize, stride, stride);

        // Render as lines
        gl.drawArrays(gl.LINES, 0, 4);
    }
}
