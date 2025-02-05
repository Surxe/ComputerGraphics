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

        var letter_e_positions = [
            // X    Y       Z      R  G  B
            0,      0,      0,     0, 0, 1,
            0,      1,      0,     0, 0, 1,
            0.5,    1,      0,     0, 0, 1,
            0.5,    1-.1,   0,     0, 0, 1,
            0+.1,   1-.1,   0,     0, 0, 1,
            0+.1,   0+.1/2, 0,     0, 0, 1,
            0.5,    0+.1/2, 0,     0, 0, 1,
            0.5,    0-.1/2, 0,     0, 0, 1,
            0+.1,   0-.1/2, 0,     0, 0, 1,
            0+.1,   -1+.1,  0,     0, 0, 1,
            .5,     -1+.1,  0,     0, 0, 1,
            .5,     -1,     0,     0, 0, 1,
            0,      -1,     0,     0, 0, 1,
        ];
        var first_letter_x = -1;
        var first_letter_y = 0;
        var letter_spacing = .5;
        this.letter1 = new Shape(first_letter_x, first_letter_y, .5, .5, letter_e_positions);

        var letter_j_positions = [
            // X    Y       Z      R  G  B
            0,      0,      0,     0, 0, 1,
            .5, 0, 0, 0, 0, 1,
            .5, .3, 0, 0, 0, 1,
            .5, 1-.2, 0, 0, 0, 1,
            .5+.1, 1-.2, 0, 0, 0, 1,
            .5+.1, 1,   0, 0, 0, 1,
            .2, 1,   0, 0, 0, 1,
            .2, 1-.2, 0, 0, 0, 1,
            .2+.1, 1-.2, 0, 0, 0, 1,
            .2+.1, .15, 0, 0, 0, 1,
            .2, .15, 0, 0, 0, 1,
            .2, .25, 0, 0, 0, 1,
            0, .25, 0, 0, 0, 1,
        ]
        this.letter2 = new Shape(first_letter_x + letter_spacing, first_letter_y-.5, .5, 1, letter_j_positions);
        this.letter3 = new Shape(first_letter_x + letter_spacing*2, first_letter_y, .5, .5, letter_e_positions);



        // Render the scene
        this.renderScene();
    }

    renderScene() {
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.axis.render(this.program);
        this.letter1.render(this.program);
        this.letter2.render(this.program);
        this.letter3.render(this.program);
    }
}