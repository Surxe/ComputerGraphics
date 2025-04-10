class GameEngine {
    constructor(camera_actor) {
        this.camera_actor = camera_actor;
        this.actors = [];
        this.matrix_location = gl.getUniformLocation(program, "u_matrix");
    }

    add_actor(actor) {
        this.actors.push(actor);
    }

    tick_actors() {
        for (const actor of this.actors) {
            // Remove self from the list of actors to avoid self-collision
            var other_actors = this.actors.filter(a => a !== actor);

            // Move actor
            actor.tick(other_actors);
        }

        this.camera_actor.update_velocities(keys_down);
        this.camera_actor.tick(this.actors); // Camera can collide with asteroids and ground
    }

    destroy_actors() {
        for (var actor of this.actors) {
            if (actor.should_destroy) {
                // Remove
                this.actors = this.actors.filter(a => a !== actor); // Remove the actor from the list
                console.log("Actor destroyed!");
            }
        }
    }

    render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        const proj_matrix = this.camera_actor.entity.perspective(Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
        const view_matrix = this.camera_actor.entity.get_view_matrix();
    
        let final_matrix = [];
        for (let i = 0; i < 16; i++) {
            final_matrix[i] = proj_matrix[i % 4] * view_matrix[Math.floor(i / 4)] +
                             proj_matrix[(i % 4) + 4] * view_matrix[Math.floor(i / 4) + 4] +
                             proj_matrix[(i % 4) + 8] * view_matrix[Math.floor(i / 4) + 8] +
                             proj_matrix[(i % 4) + 12] * view_matrix[Math.floor(i / 4) + 12];
        }
    
        gl.uniformMatrix4fv(this.matrix_location, false, new Float32Array(final_matrix));
    
        for (const actor of this.actors) {
            actor.render();
        }
    }

    tick() {
        this.tick_actors();
        this.destroy_actors();
        this.render();
    }
}
