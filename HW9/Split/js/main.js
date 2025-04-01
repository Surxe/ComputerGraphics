const gl = GLSetup.init_webgl("gl_canvas");
if (!gl) throw new Error("WebGL failed to initialize");

// Vertex and fragment shader sources
const vertex_shader_source = `
    attribute vec2 a_position;
    uniform mat4 u_transform;
    void main() {
        gl_Position = u_transform * vec4(a_position, 0.0, 1.0);
    }
`;

const fragment_shader_source = `
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        gl_FragColor = vec4(u_color, 1.0);
    }
`;

const shader_program = GLSetup.create_shader_program(gl, vertex_shader_source, fragment_shader_source);
if (!shader_program) throw new Error("Shader program failed to initialize");

gl.useProgram(shader_program);

const position_attribute = gl.getAttribLocation(shader_program, "a_position");
const color_uniform = gl.getUniformLocation(shader_program, "u_color");
const transform_uniform = gl.getUniformLocation(shader_program, "u_transform");

// Create entities (two triangles)
const triangle1 = new Entity(gl, [
    -0.5, -0.5,
     0.5, -0.5,
     0.0,  0.5
], [1.0, 0.0, 0.0], -1, 0, 0);

const triangle2 = new Entity(gl, [
    -0.5,  0.5,
     0.5,  0.5,
     0.0, -0.5
], [0.0, 1.0, 0.0], 1, 0, 0);

const camera = new Camera();

// Handle key presses for camera movement
document.addEventListener("keydown", (event) => {
    const speed = 0.1;
    if (event.key === "w") camera.move_forward(speed);
    if (event.key === "s") camera.move_backward(speed);
    if (event.key === "a") camera.rotate_left(0.05);
    if (event.key === "d") camera.rotate_right(0.05);
    if (event.key === "z") camera.move_up(speed);
    if (event.key === "x") camera.move_down(speed);
});

// Main render loop
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(shader_program);

    const camera_matrix = camera.get_transform_matrix();

    triangle1.draw(gl, position_attribute, color_uniform, transform_uniform, camera_matrix);
    triangle2.draw(gl, position_attribute, color_uniform, transform_uniform, camera_matrix);

    requestAnimationFrame(render);
}

render();