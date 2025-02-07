class Shape {
    constructor(location_x, location_y, scale_x, scale_y, vertices) {
        this.positions = [...vertices];
        //For each vertex, 
        for (var i = 0; i < this.positions.length; i += 6) {
            // scale the x and y coordinates
            this.positions[i]     *= scale_x;
            this.positions[i + 1] *= scale_y;

            //add the location to the x and y coordinates
            this.positions[i]     += location_x;
            this.positions[i + 1] += location_y;
        }

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
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

        gl.drawArrays(gl.LINE_LOOP, 0, this.positions.length/6); // div 6 as there are 3 coordinates and 3 colors per vertex
    }
}