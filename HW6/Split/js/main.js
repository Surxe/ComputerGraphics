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

        this.paint_program = new PaintProgram(this.program);

        // Shape listener
        const shape_picker = document.getElementById("shape_picker");
        var shape_type
        shape_picker.addEventListener("change", () => {
            shape_type = shape_picker.value;
            console.log("Shape changed to: " + shape_type);
        });

        // Color listener
        const color_picker = document.getElementById("color_picker");
        const color_value = document.getElementById("color_value");
        color_picker.addEventListener("input", () => {
            color_value.textContent = color_picker.value; // Updates the displayed color code
            console.log("Color changed to: " + color_picker.value);
        });

        // Fill outline listener
        var should_fill = false;
        document.getElementById('fill_outline_picker').addEventListener('change', (event) => {
            should_fill = event.target.checked;
        });

        // Click listener
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const cx = -1 +  2*x/canvas.width
            const cy = -1 + 2*(1-y/canvas.height)
            let [r, g, b] = hex_to_rgb(color_value.textContent);
            this.paint_program.add_point(cx, cy, r, g, b);
            console.log(`Clicked at: (x${x}, y${y}) (cx${cx}, cy${cy})`);
        });

        // Render the scene
        this.renderScene();
    }

    renderScene() {
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.paint_program.render();
        //this.axis.render(this.program);
    }   
}