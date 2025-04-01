class Entity extends GameObject {
    constructor(gl, vertices, color, location) {
        super(vertices, location);
        this.color = color;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    get_transform_matrix() {
        return new Float32Array([
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            this.location[0], this.location[1], this.location[2], 1
        ]);
    }

    draw(gl, position_attribute, color_uniform, transform_uniform, camera_matrix) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(position_attribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(position_attribute);
        gl.uniform3fv(color_uniform, new Float32Array(this.color));

        // Combine entity's transform with camera's matrix
        const entity_matrix = this.get_transform_matrix();
        const final_matrix = this.multiply_matrices(camera_matrix, entity_matrix);
        gl.uniformMatrix4fv(transform_uniform, false, final_matrix);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 2);
    }

    multiply_matrices(a, b) {
        let result = new Float32Array(16);
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[row * 4 + col] =
                    a[row * 4] * b[col] +
                    a[row * 4 + 1] * b[col + 4] +
                    a[row * 4 + 2] * b[col + 8] +
                    a[row * 4 + 3] * b[col + 12];
            }
        }
        return result;
    }
}