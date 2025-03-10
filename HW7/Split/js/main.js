var gl; // global

class main {
    constructor() {
        // Create and append canvas
        var canvas = document.createElement("canvas");
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

        this.shapes = [];

        var verts = [
            [-0.5, 0.0, 0.0],
            [0, 0.5, 0.0],
            [0.5, 0.0, 1.0]
        ]
        var temp = new Shape(verts, [0, 0, 0], [1, 1, 1], [0, 0, 15]);

        
        this.shapes.push(temp);
        this.render()
    }

    render() {
        gl.clearColor(1, 1, 1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var shape of this.shapes) {
            shape.render(this.program);
        }
    }
}