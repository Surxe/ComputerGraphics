class GLSetup {
    static init(canvas_id) {
        const canvas = document.getElementById(canvas_id);
        const gl = canvas.getContext("webgl");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Shader Sources
        const vsSource = `
            attribute vec3 a_position;
            attribute vec3 a_color;
            varying vec3 v_color;
            uniform mat4 u_matrix;
            void main() {
                gl_Position = u_matrix * vec4(a_position, 1.0);
                v_color = a_color;
            }
        `;

        const fsSource = `
            precision mediump float;
            varying vec3 v_color;
            void main() {
                gl_FragColor = vec4(v_color, 1.0);
            }
        `;

        // Compile Shader
        function compileShader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

        // Initialize WebGL Program
        const vertex_shader = compileShader(vsSource, gl.VERTEX_SHADER);
        const fragment_shader = compileShader(fsSource, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vertex_shader);
        gl.attachShader(program, fragment_shader);
        gl.linkProgram(program);
        gl.useProgram(program);

        return [gl, program, canvas];

        this.gl = gl
        this.program = program;
        this.canvas = canvas;
    }
}