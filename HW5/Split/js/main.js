var gl; // global

class main {
    constructor() {
        // Create and append canvas
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        document.body.appendChild(canvas);

        // Initialize global WebGL context
        gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported.");
        }

        this.webGL = new InitWebGLProgram();
        var vertexShaderSource = document.getElementById("2DVertexShader").text;
        var fragmentShaderSource = document.getElementById("2DFragmentShader").text;
        var vertexShader = this.webGL.createShader(gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = this.webGL.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Create and use the shader program
        this.program = this.webGL.createProgram(vertexShader, fragmentShader);
        gl.useProgram(this.program);

        // Create and render objects
        this.axis = new Axis();

        var letter_1_positions = [
            // X    Y       Z      R  G  B
            0,      0.5,    0,     1, 0, 0,
            1,      0.5,    0,     0, 1, 0,
            0.5,    1,      0,     0, 0, 1,
        ];
        this.shape = new Shape(letter_1_positions);

        // Render the scene
        this.renderScene();
    }

    renderScene() {
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.axis.render(this.program);
        this.shape.render(this.program);
    }
}