class GameEngine {
    constructor(camera_actor) {
        this.camera_actor = camera_actor;
        this.actors = [];
        this.asteroids = [];
        this.projectiles = [];
        this.ground_actor = null;
        this.matrix_location = gl.getUniformLocation(program, "u_matrix");
    }

    add_actor(actor) {
        this.actors.push(actor);
        if (actor instanceof Projectile) {
            this.projectiles.push(actor);
        } else if (actor instanceof Character) {
            this.asteroids.push(actor);
        } else if (actor instanceof Ground) {
            this.ground_actor = actor;
        }
    }

    move_actors() {
        for (const actor of this.actors) {
            // Make list of other actors that could collide with it. Don't bother checking collisions between same classes
            var other_actors;
            if (actor instanceof Projectile) {
                other_actors = [...this.asteroids, this.ground_actor]; // Projectiles can collide with asteroids and ground
            }
            else if (actor instanceof Character) {
                other_actors = [...this.projectiles, this.ground_actor]; // Characters can collide with projectiles and ground
            } else {
                other_actors = [...this.actors, this.ground_actor]; // All actors can collide with each other and the ground
            }

            // Remove self
            var other_actors = other_actors.filter(a => a !== actor);

            // Move actor
            actor.move(other_actors);
        }

        this.camera_actor.update_velocities(keys_down);
        this.camera_actor.move([...this.asteroids, this.ground_actor]); // Camera can collide with asteroids and ground
    }

    destroy_actors() {
        for (var actor of this.actors) {
            if (actor.should_destroy) {
                // Remove
                this.actors = this.actors.filter(a => a !== actor); // Remove the actor from the list
                console.log("Actor destroyed!");
            }
        }
        for (var character of this.asteroids) {
            if (character.should_destroy) {
                this.asteroids = this.asteroids.filter(a => a !== character); // Remove the actor from the list
                console.log("Character destroyed!");
            }
        }
        for (var projectile of this.projectiles) {
            if (projectile.should_destroy) {
                this.projectiles = this.projectiles.filter(a => a !== projectile); // Remove the actor from the list
                console.log("Projectile destroyed!");
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
        this.move_actors();
        this.destroy_actors();
        this.render();
    }
}
