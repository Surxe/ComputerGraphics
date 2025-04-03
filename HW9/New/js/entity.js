class Entity extends GameObject {
    constructor(vertices, colors, location) {
        super(vertices, location)

        this.position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        this.vertex_count = this.vertices.length / 3;
    }

    render() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        const position_location = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position_location);
        gl.vertexAttribPointer(position_location, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        const color_location = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(color_location);
        gl.vertexAttribPointer(color_location, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertex_count);
    }
}