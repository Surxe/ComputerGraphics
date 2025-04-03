class GameEngine {
    constructor(camera) {
        this.camera = camera;
        this.actors = [];
        this.matrix_location = gl.getUniformLocation(program, "u_matrix");
    }

    add_actor(actor) {
        this.actors.push(actor);
    }

    move_actors() {
        this.actors[0].move([this.actors[1]])
        // for (const actor of this.actors) {
        //     actor.move();
        // }
    }

    render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        const proj_matrix = this.camera.perspective(Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
        const view_matrix = this.camera.get_view_matrix();
    
        let final_matrix = [];
        for (let i = 0; i < 16; i++) {
            final_matrix[i] = proj_matrix[i % 4] * view_matrix[Math.floor(i / 4)] +
                             proj_matrix[(i % 4) + 4] * view_matrix[Math.floor(i / 4) + 4] +
                             proj_matrix[(i % 4) + 8] * view_matrix[Math.floor(i / 4) + 8] +
                             proj_matrix[(i % 4) + 12] * view_matrix[Math.floor(i / 4) + 12];
        }
    
        gl.uniformMatrix4fv(this.matrix_location, false, new Float32Array(final_matrix));
    
        for (const actor of this.actors) {
            this.camera.move(keys_down);
            actor.render();
        }
    }

    tick() {
        this.move_actors();
        this.render();
    }
}
