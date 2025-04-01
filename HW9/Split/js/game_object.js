class GameObject {
    constructor(gl, vertices, color) {
        this.gl = gl;
        this.vertices = vertices;
        this.color = color;
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    draw(gl, shader_program, position_attribute) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(position_attribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(position_attribute);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 2);
    }
}