class Shape {
    constructor() {
        var positions = [
            // X    Y       Z      R  G  B
            0,      0,      0,     1, 0, 0,
            0,      0.5,    0,     0, 1, 0,
            0.7,    0,      0,     0, 0, 1,
        ];

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        var offset = 0;

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(colorAttributeLocation);

        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, stride);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}