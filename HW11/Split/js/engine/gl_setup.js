class GLSetup {
    constructor(canvas_id) {
        this.canvas_id = canvas_id;
        this.MAX_POINT_LIGHTS = 4;
        this.MAX_DIR_LIGHTS = 4;
        this.MAX_SPOT_LIGHTS = 4;
        this.point_lights = [];
        this.directional_lights = [];
        this.spot_lights = [];
    }

    init() {
        const canvas = document.getElementById(this.canvas_id);
        const gl = canvas.getContext("webgl");
        this.canvas = canvas;
        this.gl = gl;
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth * (9/16);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const vs_source = `
            attribute vec3 a_position;
            attribute vec3 a_color;
            attribute vec2 a_tex_coord;

            uniform mat4 u_matrix;

            varying vec3 v_color;
            varying vec3 v_frag_position;
            varying vec2 v_texcoord;

            void main() {
                vec4 world_position = u_matrix * vec4(a_position, 1.0);
                gl_Position = world_position;
                v_frag_position = a_position;
                v_color = a_color;
                v_texcoord = a_tex_coord;  // Ensure this matches
            }
        `;

        const fs_source = `
            precision mediump float;

            varying vec3 v_color;
            varying vec3 v_frag_position;
            varying vec2 v_texcoord;

            uniform float u_ambient_strength;
            uniform vec3 u_view_position;

            // Lighting
            uniform int u_num_point_lights;
            uniform vec3 u_point_light_positions[${this.MAX_POINT_LIGHTS}];
            uniform vec3 u_point_light_colors[${this.MAX_POINT_LIGHTS}];

            uniform int u_num_dir_lights;
            uniform vec3 u_dir_light_directions[${this.MAX_DIR_LIGHTS}];
            uniform vec3 u_dir_light_colors[${this.MAX_DIR_LIGHTS}];

            uniform int u_num_spot_lights;
            uniform vec3 u_spot_positions[${this.MAX_SPOT_LIGHTS}];
            uniform vec3 u_spot_directions[${this.MAX_SPOT_LIGHTS}];
            uniform vec3 u_spot_colors[${this.MAX_SPOT_LIGHTS}];
            uniform float u_spot_cutoffs[${this.MAX_SPOT_LIGHTS}];

            // Texture support
            uniform bool u_use_texture;
            uniform sampler2D u_sampler;

            void main() {
                vec3 base_color = u_use_texture
                    ? texture2D(u_sampler, v_texcoord).rgb
                    : v_color;

                vec3 ambient = u_ambient_strength * base_color;
                vec3 result = ambient;

                vec3 norm = normalize(vec3(0.0, 1.0, 0.0));

                // Point lights
                for (int i = 0; i < ${this.MAX_POINT_LIGHTS}; ++i) {
                    if (i >= u_num_point_lights) break;
                    vec3 light_dir = normalize(u_point_light_positions[i] - v_frag_position);
                    float diff = max(dot(norm, light_dir), 0.0);
                    result += diff * base_color * u_point_light_colors[i];
                }

                // Directional lights
                for (int i = 0; i < ${this.MAX_DIR_LIGHTS}; ++i) {
                    if (i >= u_num_dir_lights) break;
                    vec3 light_dir = normalize(-u_dir_light_directions[i]);
                    float diff = max(dot(norm, light_dir), 0.0);
                    result += diff * base_color * u_dir_light_colors[i] * 0.25;
                }

                // Spotlights
                for (int i = 0; i < ${this.MAX_SPOT_LIGHTS}; ++i) {
                    if (i >= u_num_spot_lights) break;
                    vec3 light_dir = normalize(u_spot_positions[i] - v_frag_position);
                    float theta = dot(light_dir, normalize(-u_spot_directions[i]));
                    float epsilon = 0.01;
                    float intensity = smoothstep(u_spot_cutoffs[i] - epsilon, u_spot_cutoffs[i], theta);
                    float diff = max(dot(norm, light_dir), 0.0);
                    vec3 diffuse = diff * base_color * u_spot_colors[i] * intensity;
                    result += diffuse;
                }

                gl_FragColor = vec4(result, 1.0);
            }
        `;


        const vertex_shader = this.compile_shader(vs_source, gl.VERTEX_SHADER);
        const fragment_shader = this.compile_shader(fs_source, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vertex_shader);
        gl.attachShader(program, fragment_shader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const ambient_strength = 0.2;
        const view_position = [5.0, 1.0, 5.0];
        gl.uniform1f(gl.getUniformLocation(program, "u_ambient_strength"), ambient_strength);
        gl.uniform3fv(gl.getUniformLocation(program, "u_view_position"), new Float32Array(view_position));

        return [gl, program, canvas];
    }

    compile_shader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    add_point_light(light) {
        if (this.point_lights.length < this.MAX_POINT_LIGHTS) {
            this.point_lights.push(light);
            this.upload_point_lights();
        }
    }

    add_directional_light(light) {
        if (this.directional_lights.length < this.MAX_DIR_LIGHTS) {
            this.directional_lights.push(light);
            this.upload_directional_lights();
        }
    }

    add_spot_light(light) {
        if (this.spot_lights.length < this.MAX_SPOT_LIGHTS) {
            this.spot_lights.push(light);
            this.upload_spot_lights();
        }
    }

    upload_point_lights() {
        const gl = this.gl;
        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        const u_num = gl.getUniformLocation(program, "u_num_point_lights");
        const u_positions = gl.getUniformLocation(program, "u_point_light_positions");
        const u_colors = gl.getUniformLocation(program, "u_point_light_colors");

        const positions = [], colors = [];
        for (const light of this.point_lights) {
            positions.push(...light.position);
            colors.push(...light.color);
        }
        while (positions.length < 3 * this.MAX_POINT_LIGHTS) positions.push(0);
        while (colors.length < 3 * this.MAX_POINT_LIGHTS) colors.push(0);

        gl.uniform1i(u_num, this.point_lights.length);
        gl.uniform3fv(u_positions, new Float32Array(positions));
        gl.uniform3fv(u_colors, new Float32Array(colors));
    }

    upload_directional_lights() {
        const gl = this.gl;
        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        const u_num = gl.getUniformLocation(program, "u_num_dir_lights");
        const u_directions = gl.getUniformLocation(program, "u_dir_light_directions");
        const u_colors = gl.getUniformLocation(program, "u_dir_light_colors");

        const directions = [], colors = [];
        for (const light of this.directional_lights) {
            directions.push(...light.direction);
            colors.push(...light.color);
        }
        while (directions.length < 3 * this.MAX_DIR_LIGHTS) directions.push(0);
        while (colors.length < 3 * this.MAX_DIR_LIGHTS) colors.push(0);

        gl.uniform1i(u_num, this.directional_lights.length);
        gl.uniform3fv(u_directions, new Float32Array(directions));
        gl.uniform3fv(u_colors, new Float32Array(colors));
    }

    upload_spot_lights() {
        const gl = this.gl;
        const program = gl.getParameter(gl.CURRENT_PROGRAM)
        const u_num = gl.getUniformLocation(program, "u_num_spot_lights");
        const u_positions = gl.getUniformLocation(program, "u_spot_positions");
        const u_directions = gl.getUniformLocation(program, "u_spot_directions");
        const u_colors = gl.getUniformLocation(program, "u_spot_colors");
        const u_cutoffs = gl.getUniformLocation(program, "u_spot_cutoffs");

        const positions = [], directions = [], colors = [], cutoffs = [];
        for (const light of this.spot_lights) {
            positions.push(...light.position);
            directions.push(...light.direction);
            colors.push(...light.color);
            cutoffs.push(Math.cos(light.cutoff_degrees * Math.PI / 180));
        }
        while (positions.length < 3 * this.MAX_SPOT_LIGHTS) positions.push(0);
        while (directions.length < 3 * this.MAX_SPOT_LIGHTS) directions.push(0);
        while (colors.length < 3 * this.MAX_SPOT_LIGHTS) colors.push(0);
        while (cutoffs.length < this.MAX_SPOT_LIGHTS) cutoffs.push(0);

        gl.uniform1i(u_num, this.spot_lights.length);
        gl.uniform3fv(u_positions, new Float32Array(positions));
        gl.uniform3fv(u_directions, new Float32Array(directions));
        gl.uniform3fv(u_colors, new Float32Array(colors));
        gl.uniform1fv(u_cutoffs, new Float32Array(cutoffs));
    }

    upload_lights() {
        this.upload_point_lights();
        this.upload_directional_lights();
        this.upload_spot_lights();
    }

    tick() {
        this.upload_lights();
    }
}