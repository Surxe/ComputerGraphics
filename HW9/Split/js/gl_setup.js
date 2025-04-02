class GLSetup {
    static init_webgl(canvas_id) {
        const canvas = document.getElementById(canvas_id);
        const gl = canvas.getContext("webgl");
    
        if (!gl) {
            console.error("WebGL initialization failed.");
            return null;
        }
    
        // Set canvas resolution to match display resolution
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    
        return gl;
    }
    

    static create_shader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    static create_shader_program(gl, vertex_source, fragment_source) {
        const vertex_shader = this.create_shader(gl, gl.VERTEX_SHADER, vertex_source);
        const fragment_shader = this.create_shader(gl, gl.FRAGMENT_SHADER, fragment_source);

        if (!vertex_shader || !fragment_shader) return null;

        const program = gl.createProgram();
        gl.attachShader(program, vertex_shader);
        gl.attachShader(program, fragment_shader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        return program;
    }
}
