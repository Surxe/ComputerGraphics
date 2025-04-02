class GameEngine {
    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.actors = [];

        // Initialize shaders and uniforms
        this.shader_program = this.create_shader_program();
        this.position_attribute = gl.getAttribLocation(this.shader_program, "a_position");
        this.color_uniform = gl.getUniformLocation(this.shader_program, "u_color");
        this.transform_uniform = gl.getUniformLocation(this.shader_program, "u_transform");
        this.projection_uniform = gl.getUniformLocation(this.shader_program, "u_projection");
        this.view_uniform = gl.getUniformLocation(this.shader_program, "u_view");

        gl.useProgram(this.shader_program);
    }

    create_shader_program() {
        const vertex_shader_source = `
            attribute vec2 a_position;
            uniform mat4 u_projection;
            uniform mat4 u_view;
            void main() {
                gl_Position = u_projection * u_view * vec4(a_position, 0.0, 1.0);
            }
        `;
        
        const fragment_shader_source = `
            precision mediump float;
            uniform vec3 u_color;
            void main() {
                gl_FragColor = vec4(u_color, 1.0);
            }
        `;

        return GLSetup.create_shader_program(this.gl, vertex_shader_source, fragment_shader_source);
    }

    add_actor(entity) {
        this.actors.push(entity);
    }

    render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.shader_program);

        const projection_matrix = this.camera.get_projection_matrix();
        const view_matrix = this.camera.get_view_matrix();

        // Pass the projection and view matrices to the shader
        this.gl.uniformMatrix4fv(this.projection_uniform, false, projection_matrix);
        this.gl.uniformMatrix4fv(this.view_uniform, false, view_matrix);

        // Render all actors
        for (const entity of this.actors) {
            entity.draw(this.gl, this.position_attribute, this.color_uniform, this.transform_uniform, view_matrix);
        }
    }
}