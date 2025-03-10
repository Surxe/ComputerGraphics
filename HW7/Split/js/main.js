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

        this.shapes = [];

        this.render()
    }

    create_shape(shape_name, positions, translations, scalars, rotations, should_fill) {
        const shape_map = {
            'triangle': Triangle,
            'rectangle': Rectangle,
            'line': Line,
            'polygon': Polygon,
            'circle': Circle,
            'point': Point
        };
        if (!(shape_name in shape_map)) {
            console.error("Invalid shape_name.");
            return;
        }
        var shape = new Triangle(positions, translations, scalars, rotations, should_fill);
        this.shapes.push(shape);
    }

    render() {
        gl.clearColor(1, 1, 1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var shape of this.shapes) {
            shape.render(this.program);
        }
    }
}