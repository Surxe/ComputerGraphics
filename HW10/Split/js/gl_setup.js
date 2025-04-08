class GLSetup {
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

        // Fragment Shader supporting point & directional lights
        const fs_source = `
            precision mediump float;

            const int MAX_POINT_LIGHTS = 4;
            const int MAX_DIR_LIGHTS = 4;

            varying vec3 v_color;
            varying vec3 v_frag_position;

            uniform float u_ambient_strength;
            uniform vec3 u_view_position;

            uniform int u_num_point_lights;
            uniform vec3 u_point_light_positions[MAX_POINT_LIGHTS];
            uniform vec3 u_point_light_colors[MAX_POINT_LIGHTS];

            uniform int u_num_dir_lights;
            uniform vec3 u_dir_light_directions[MAX_DIR_LIGHTS];
            uniform vec3 u_dir_light_colors[MAX_DIR_LIGHTS];

            void main() {
                vec3 ambient = u_ambient_strength * v_color;
                vec3 result = ambient;

                vec3 norm = normalize(vec3(0.0, 1.0, 0.0));

                // Point Lights
                for (int i = 0; i < MAX_POINT_LIGHTS; ++i) {
                    if (i >= u_num_point_lights) break;
                    vec3 light_dir = normalize(u_point_light_positions[i] - v_frag_position);
                    float diff = max(dot(norm, light_dir), 0.0);
                    vec3 diffuse = diff * v_color * u_point_light_colors[i];
                    result += diffuse;
                }

                // Directional Lights
                for (int i = 0; i < MAX_DIR_LIGHTS; ++i) {
                    if (i >= u_num_dir_lights) break;
                    vec3 light_dir = normalize(-u_dir_light_directions[i]); // Inverted since it's a direction *towards* surface
                    float diff = max(dot(norm, light_dir), 0.0);
                    vec3 diffuse = diff * v_color * u_dir_light_colors[i] * 0.25;
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

        // Lighting Setup
        const ambient_strength = 0.2;
        const view_position = [5.0, 1.0, 5.0];

        gl.uniform1f(gl.getUniformLocation(program, "u_ambient_strength"), ambient_strength);
        gl.uniform3fv(gl.getUniformLocation(program, "u_view_position"), new Float32Array(view_position));

        // Add point lights
        this.add_point_lights(gl, program, [
            //{ position: [3.0, 0.0, 3.0], color: [1.0, 1.0, 1.0] },
            //{ position: [-3.0, 1.0, -2.0], color: [1.0, 0.5, 0.5] }
        ]);

        // Add directional lights
        this.add_directional_lights(gl, program, [
            { direction: [0.0, -1.0, 1.0], color: [1, 1, 1] }
        ]);

        return [gl, program, canvas];
    }

    static add_point_lights(gl, program, lights) {
        const MAX = 4;
        const count = Math.min(lights.length, MAX);

        const u_num = gl.getUniformLocation(program, "u_num_point_lights");
        const u_positions = gl.getUniformLocation(program, "u_point_light_positions");
        const u_colors = gl.getUniformLocation(program, "u_point_light_colors");

        const positions = [], colors = [];
        for (let i = 0; i < count; i++) {
            positions.push(...lights[i].position);
            colors.push(...lights[i].color);
        }

        while (positions.length < 3 * MAX) positions.push(0);
        while (colors.length < 3 * MAX) colors.push(0);

        gl.uniform1i(u_num, count);
        gl.uniform3fv(u_positions, new Float32Array(positions));
        gl.uniform3fv(u_colors, new Float32Array(colors));
    }

    static add_directional_lights(gl, program, lights) {
        const MAX = 4;
        const count = Math.min(lights.length, MAX);

        const u_num = gl.getUniformLocation(program, "u_num_dir_lights");
        const u_dirs = gl.getUniformLocation(program, "u_dir_light_directions");
        const u_colors = gl.getUniformLocation(program, "u_dir_light_colors");

        const directions = [], colors = [];
        for (let i = 0; i < count; i++) {
            directions.push(...lights[i].direction);
            colors.push(...lights[i].color);
        }

        while (directions.length < 3 * MAX) directions.push(0);
        while (colors.length < 3 * MAX) colors.push(0);

        gl.uniform1i(u_num, count);
        gl.uniform3fv(u_dirs, new Float32Array(directions));
        gl.uniform3fv(u_colors, new Float32Array(colors));
    }
}