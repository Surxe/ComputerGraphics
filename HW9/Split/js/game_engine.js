class GameEngine {
    constructor(camera) {
        this.camera = camera;
        this.actors = [];
        this.asteroids = [];
        this.projectiles = [];
        this.matrix_location = gl.getUniformLocation(program, "u_matrix");
    }

    add_actor(actor) {
        this.actors.push(actor);
        if (actor instanceof Projectile) {
            this.projectiles.push(actor);
        } else if (actor instanceof Character) {
            this.asteroids.push(actor);
        }
    }

    move_actors() {
        for (const actor of this.actors) {
            // Make list of other actors that could collide with it. Don't bother checking collisions between same classes
            var other_actors;
            if (actor instanceof Projectile) {
                other_actors = this.asteroids;
            }
            else if (actor instanceof Character) {
                other_actors = this.projectiles;
            } else {
                other_actors = this.actors;
            }

            // Remove self
            var other_actors = other_actors.filter(a => a !== actor);

            // Move actor
            actor.move(other_actors);
        }
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
            actor.render();
        }

        this.camera.move(keys_down);
    }

    tick() {
        this.move_actors();
        this.render();
    }
}
