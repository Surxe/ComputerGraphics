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

    // Update movement/rotations based on pressed keys
    update_velocities(game_object, keys_pressed) {
        //keys_pressed is a map with keys [W, A, S, D] and values [true, false]
        var position_magnitude = .015;
        var rotation_magnitude = 4;
        var direction = 1;

        // (A/D) -> Rotate left/right
        if (keys_pressed.A) {
            direction = 1;
        } else if (keys_pressed.D) {
            direction = -1
        }
        else {
            rotation_magnitude = 0;
        }
        var rotation_velocity = rotation_magnitude * direction; //degrees
        var rotation_velocity_arr = [0, 0, rotation_velocity];
        game_object.rotation_velocity = rotation_velocity_arr;

        // (W/S) -> Move forward/backward
        if (keys_pressed.W) {
            direction = 1
        } else if (keys_pressed.S) {
            direction = -1
        }
        else {
            position_magnitude = 0;
        }
        var position_velocity = position_magnitude * direction;
        // Given position_velocity and rotation_velocity:
        // if facing left, change x dimension by position_velocity pixels
        // if facing right, change x dimension by position_velocity pixels
        // if facing up, change y dimension by position_velocity pixels
        // if facing down, change y dimension by position_velocity pixels
        // and all directions in between
        // ex: position_velocity = 1, rotation_velocity = 180 degrees (facing down) -> [0, -1, 0] (move down)
        var current_rotation = game_object.rotations[2] + rotation_velocity; //pre-emptively add rotation velocity as it will be added in the next move()
        var rotation_rads = current_rotation * Math.PI / 180;
        var dx = position_velocity * Math.sin(rotation_rads);
        var dy = position_velocity * Math.cos(rotation_rads);
        var position_velocity_arr = [-dx, dy, 0];
        game_object.position_velocity = position_velocity_arr
    }

    add_game_object(game_object) {
        this.game_objects.push(game_object);
    }

    render() {
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var game_object of this.game_objects) {
            game_object.render(this.program);
        }
    }
}