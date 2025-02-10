var gl; // global

class main {
    constructor() {
        // Create and append canvas
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        canvas.style.border = '1px solid black';
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

        this.shapes = [];

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const cx = -1 +  2*x/canvas.width
            const cy = -1 + 2*(1-y/canvas.height)
            console.log(`Clicked at: (x${x}, y${y}) (cx${cx}, cy${cy})`);
        });

        // Render the scene
        this.renderScene();
    }

    renderScene() {
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        //this.axis.render(this.program);
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].render(this.program);
        }

        this.axis.render(this.program);
    }
}