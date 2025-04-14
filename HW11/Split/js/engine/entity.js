class Entity extends GameObject {
    constructor(vertices, indices, colors, location) {
        super(vertices, location);
        this.colors = colors;

        this.position_buffer = gl.createBuffer();
        this.color_buffer = gl.createBuffer();
        this.indices = indices ? [...indices] : null;
        if (this.indices) {
            this.index_buffer = gl.createBuffer();
        }

        this.vertex_count = this.vertices.length / 3;
    }

    buffer() {
        this.buffer_vertices();
        this.buffer_colors();
        if (this.indices) {
            this.buffer_indices();
        }
    }

    buffer_vertices() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }
    buffer_colors() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    }
    buffer_indices() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    }

    render() {
        this.buffer();

        // Disable texture usage for plain Entities
        const use_texture_location = gl.getUniformLocation(program, "u_use_texture");
        gl.uniform1i(use_texture_location, false);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer); //if this extra line is removed it will not work for some reason
        const position_location = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position_location);
        gl.vertexAttribPointer(position_location, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer); //if this extra line is removed it will not work for some reason
        const color_location = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(color_location);
        gl.vertexAttribPointer(color_location, 3, gl.FLOAT, false, 0, 0);

        if (this.indices) {
            gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        }
        else {
            gl.drawArrays(gl.TRIANGLES, 0, this.vertex_count);
        }
    }
}