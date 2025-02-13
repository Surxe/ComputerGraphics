class Shape {
    constructor(vertices, draw_mode) {
        this.vertices = [...vertices];
        this.draw_mode = draw_mode;
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

        var type = gl.FLOAT;
        var normalize = false;
        var stride = 5 * Float32Array.BYTES_PER_ELEMENT;

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(colorAttributeLocation);

        gl.vertexAttribPointer(positionAttributeLocation, 2, type, normalize, stride, 0);
        gl.vertexAttribPointer(colorAttributeLocation,    3, type, normalize, stride, stride*2/5);

        gl.drawArrays(this.draw_mode, 0, this.vertices.length/5); // div 6 as there are 3 coordinates and 3 colors per vertex
    }
}