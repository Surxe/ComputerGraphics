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
                v_frag_position = a_position;
                v_color = a_color;
            }
        `;

        // Fragment Shader with multiple point lights
        const fs_source = `
            precision mediump float;

            const int MAX_LIGHTS = 4;
            varying vec3 v_color;
            varying vec3 v_frag_position;

            uniform float u_ambient_strength;
            uniform vec3 u_view_position;
            uniform int u_num_lights;
            uniform vec3 u_light_positions[MAX_LIGHTS];
            uniform vec3 u_light_colors[MAX_LIGHTS];

            void main() {
                vec3 ambient = u_ambient_strength * v_color;
                vec3 result = ambient;

                vec3 norm = normalize(vec3(0.0, 1.0, 0.0));

                for (int i = 0; i < MAX_LIGHTS; ++i) {
                    if (i >= u_num_lights) break;
                    vec3 light_dir = normalize(u_light_positions[i] - v_frag_position);
                    float diff = max(dot(norm, light_dir), 0.0);
                    vec3 diffuse = diff * v_color * u_light_colors[i];
                    result += diffuse;
                }

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

        // Add multiple point lights
        this.add_point_lights(gl, program, [
            { position: [3.0, 0.0, 3.0], color: [1.0, 1.0, 1.0] },
            { position: [-3.0, 1.0, -2.0], color: [1.0, 0.5, 0.5] }
        ]);

        return [gl, program, canvas];
    }

    static add_point_lights(gl, program, lights) {
        const MAX_LIGHTS = 4;
        const num_lights = Math.min(lights.length, MAX_LIGHTS);

        const ambient_strength = 0.2;
        const view_position = [5.0, 1.0, 5.0]; // Camera location

        const u_ambient = gl.getUniformLocation(program, "u_ambient_strength");
        const u_view = gl.getUniformLocation(program, "u_view_position");
        const u_num = gl.getUniformLocation(program, "u_num_lights");
        const u_light_positions = gl.getUniformLocation(program, "u_light_positions");
        const u_light_colors = gl.getUniformLocation(program, "u_light_colors");

        gl.uniform1f(u_ambient, ambient_strength);
        gl.uniform3fv(u_view, view_position);
        gl.uniform1i(u_num, num_lights);

        // Flatten light arrays
        const positions = [];
        const colors = [];
        for (let i = 0; i < num_lights; i++) {
            positions.push(...lights[i].position);
            colors.push(...lights[i].color);
        }

        // Pad if needed
        while (positions.length < 3 * MAX_LIGHTS) positions.push(0);
        while (colors.length < 3 * MAX_LIGHTS) colors.push(0);

        gl.uniform3fv(u_light_positions, new Float32Array(positions));
        gl.uniform3fv(u_light_colors, new Float32Array(colors));
    }
}