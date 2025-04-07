class GLSetup {
    // Set up WebGL shaders for rendering shaders with colors and lighting
    static init(canvas_id) {
        const canvas = document.getElementById(canvas_id);
        const gl = canvas.getContext("webgl");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Vertex Shader
        const vs_source = `
            attribute vec3 a_position;
            attribute vec3 a_color;

            uniform mat4 u_matrix;
            varying vec3 v_color;
            varying vec3 v_frag_position;

            void main() {
                vec4 world_position = u_matrix * vec4(a_position, 1.0);
                gl_Position = world_position;
                v_frag_position = a_position; // Assuming world-space positions for lighting
                v_color = a_color;
            }
        `;

        // Fragment Shader with Ambient + Point Light
        const fs_source = `
            precision mediump float;

            varying vec3 v_color;
            varying vec3 v_frag_position;

            uniform float u_ambient_strength;
            uniform vec3 u_light_position;
            uniform vec3 u_view_position;

            void main() {
                // Ambient
                vec3 ambient = u_ambient_strength * v_color;

                // Diffuse (Lambert)
                vec3 norm = normalize(vec3(0.0, 1.0, 0.0)); // Assumes flat geometry facing Y+
                vec3 light_dir = normalize(u_light_position - v_frag_position);
                float diff = max(dot(norm, light_dir), 0.0);
                vec3 diffuse = diff * v_color;

                vec3 result = ambient + diffuse;
                gl_FragColor = vec4(result, 1.0);
            }
        `;

        function compile_shader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

        const vertex_shader = compile_shader(vs_source, gl.VERTEX_SHADER);
        const fragment_shader = compile_shader(fs_source, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vertex_shader);
        gl.attachShader(program, fragment_shader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Setup Lighting Defaults
        const ambient_strength = 0.2;
        const ambient_loc = gl.getUniformLocation(program, "u_ambient_strength");
        gl.uniform1f(ambient_loc, ambient_strength);

        const light_pos = [3.0, -.5, 3.0];
        const light_pos_loc = gl.getUniformLocation(program, "u_light_position");
        gl.uniform3fv(light_pos_loc, light_pos);

        return [gl, program, canvas];
    }
}