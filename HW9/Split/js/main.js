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

// Create game objects
const triangle1 = new GameObject(gl, [
    -0.5, -0.5,
     0.5, -0.5,
     0.0,  0.5
], [1.0, 0.0, 0.0]);

const triangle2 = new GameObject(gl, [
    -0.5,  0.5,
     0.5,  0.5,
     0.0, -0.5
], [0.0, 1.0, 0.0]);

const camera = new Camera();

document.addEventListener("keydown", (event) => {
    const speed = 0.1;
    if (event.key === "w") camera.move_forward(speed);
    if (event.key === "s") camera.move_backward(speed);
    if (event.key === "a") camera.rotate_left(0.05);
    if (event.key === "d") camera.rotate_right(0.05);
    if (event.key === "z") camera.move_up(speed);
    if (event.key === "x") camera.move_down(speed);
});

const transform_uniform = gl.getUniformLocation(shader_program, "u_transform");

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(shader_program);

    // Get the camera's transformation matrix
    const transform_matrix = camera.get_transform_matrix();
    gl.uniformMatrix4fv(transform_uniform, false, transform_matrix);

    gl.uniform3fv(color_uniform, new Float32Array([1.0, 0.0, 0.0]));
    triangle1.draw(gl, shader_program, position_attribute);

    gl.uniform3fv(color_uniform, new Float32Array([0.0, 1.0, 0.0]));
    triangle2.draw(gl, shader_program, position_attribute);

    requestAnimationFrame(render);
}

render();
