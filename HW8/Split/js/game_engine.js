var gl; // global

class GameEngine {
    constructor() {
        // Create and append canvas with id canvas
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        canvas.id = "canvas";
        canvas.style.border = "1px solid";

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

        this.game_objects = [];

        this.render()
    }

    add_game_object(game_object) {
        this.game_objects.push(game_object);
    }

    render() {
        gl.clearColor(1, 1, 1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var game_object of this.game_objects) {
            game_object.render(this.program);
        }
    }
}