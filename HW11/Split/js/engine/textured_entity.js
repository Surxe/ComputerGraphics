class TexturedEntity extends Entity {
    constructor(vertices, indices, tex_coords, texture_data, width, height, location) {
        const colors = [0, 0, 0] // will be overridden by texture anyways, this is filler data

        // Create Entity
        super(vertices, indices, colors, location);

        // Create texture
        this.tex_coords = tex_coords;
        this.texture_buffer = gl.createBuffer();
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Upload texture data
        const internalFormat = texture_data.length === width * height * 4 ? gl.RGBA : gl.RGB;
        gl.texImage2D(
            gl.TEXTURE_2D, 0, internalFormat, width, height, 0,
            internalFormat, gl.UNSIGNED_BYTE, new Uint8Array(texture_data)
        );

        // Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        this.has_texture = true;
    }

    buffer_tex_coords() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texture_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tex_coords), gl.STATIC_DRAW);
    }

    buffer() {
        super.buffer();
        this.buffer_tex_coords();
    }

    render() {
        this.buffer();

        // Position attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        const position_location = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position_location);
        gl.vertexAttribPointer(position_location, 3, gl.FLOAT, false, 0, 0);

        // Color attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        const color_location = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(color_location);
        gl.vertexAttribPointer(color_location, 3, gl.FLOAT, false, 0, 0);

        // Texture coordinate attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texture_buffer);
        const texcoord_location = gl.getAttribLocation(program, "a_tex_coord");
        gl.enableVertexAttribArray(texcoord_location);
        gl.vertexAttribPointer(texcoord_location, 2, gl.FLOAT, false, 0, 0);

        // Set texture uniforms
        const use_texture_location = gl.getUniformLocation(program, "u_use_texture");
        gl.uniform1i(use_texture_location, this.has_texture ? 1 : 0);

        if (this.has_texture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            const sampler_location = gl.getUniformLocation(program, "u_sampler");
            gl.uniform1i(sampler_location, 0); // Texture unit 0
        }

        if (this.indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
            gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(gl.TRIANGLES, 0, this.vertex_count);
        }
    }
}