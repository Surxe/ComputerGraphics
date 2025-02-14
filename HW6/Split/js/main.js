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
        var vertex_shader_source = document.getElementById("2DVertexShader").text;
        var fragment_shader_source = document.getElementById("2DFragmentShader").text;
        var vertex_shader = this.webGL.createShader(gl.VERTEX_SHADER, vertex_shader_source);
        var fragment_shader = this.webGL.createShader(gl.FRAGMENT_SHADER, fragment_shader_source);

        // Create and use the shader program
        this.program = this.webGL.createProgram(vertex_shader, fragment_shader);
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
        var r, g, b;
        var color_str;
        color_picker.addEventListener("input", () => {
            [r, g, b] = hex_to_rgb(color_picker.value);
            color_str = `${color_picker.value} rgb(${r}, ${g}, ${b})`
            color_value.textContent = color_str; // Updates the displayed color code
            console.log(`Color changed to: ${color_str}`);
        });

        // Fill outline listener
        var should_fill = true;
        document.getElementById('fill_outline_picker').addEventListener('change', (event) => {
            should_fill = event.target.checked;
        });

        // Click listener
        canvas.addEventListener('click', (event) => {
            var [cx, cy] = mouse_event_to_gl_coords(event, canvas);
            this.paint_program.add_point(cx, cy, r, g, b, should_fill, true);
            console.log(`Clicked at: (cx${cx}, cy${cy}) rgb(${r}, ${g}, ${b})`);
        });

        // Mouse move listener
        canvas.addEventListener('mousemove', (event) => {
            var [cx, cy] = mouse_event_to_gl_coords(event, canvas);
            this.paint_program.add_point(cx, cy, r, g, b, should_fill, false);
            console.log(`Mouse moved to: (cx${cx}, cy${cy})`);
        });

        // Right click listener
        canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // prevent the default context menu
            this.paint_program.del_current_shape();
            console.log("Right-click detected on canvas");
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