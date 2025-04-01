class GameObject {
    constructor(vertices) {
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }
    draw() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posAttrib);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}