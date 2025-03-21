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

        this.actors = [];
        this.obstacle_actors = [];
        this.score = 0;

        this.render()
    }

    add_actor(actor) {
        // If entity is an Entity
        if (actor instanceof Actor) {
            this.actors.push(actor);
        }
    }

    update_velocities(keys_pressed) {
        for (var actor of this.actors) {
            actor.update_velocities(keys_pressed);
            actor.copy_lead_entity_velocity_to_trigger_boxes();
        }
    }

    move() {
        for (var actor of this.actors) {
            var other_actors = this.actors.filter(other_actor => other_actor != actor);
            actor.move();
            var actions = actor.collision_checks(other_actors);
            for (var action of actions) {
                if (action == "add_score") {
                    this.add_score();
                }
                else if (action == "game_over") {
                    this.game_over();
                }
            }
        }
    }

    destroy() {
        for (var actor of this.actors) {
            if (actor.should_destroy) {
                this.actors = this.actors.filter(other_actor => other_actor != actor);
            }
        }
    }

    add_score() {
        this.score += 1;
        document.getElementById("score").innerText = "Score: " + this.score;
    }

    game_over() {
        document.getElementById("game_over").innerText = "Game Over!";
    }

    render() {
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var actor of this.actors) {
            actor.render(this.program);
        }
    }
}