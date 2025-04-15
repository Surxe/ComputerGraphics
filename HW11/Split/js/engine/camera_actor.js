class CameraActor extends Actor {
    constructor(...args) {
        super(...args); // Call the parent constructor
        this.position_speed = 0.2 * tick_rate_scale;
        this.rotation_speed = 0.02 * tick_rate_scale;

        // Attach a spot light to the camera
        const spot_light_direction = [0, 0, 1];
        const spot_light_init_location = [this.entity.location[0], this.entity.location[1], this.entity.location[2] + .5]; // position light just in front of camera
        const spot_light = new SpotLight(spot_light_init_location, spot_light_direction, 25); // Position the light just below the actor
        this.attach_light(spot_light);
        gl_setup.add_spot_light(spot_light);
    }

    update_velocities(keys_down) {
        // Reset velocities each frame
        var position_velocities = [0, 0, 0];
        var rotation_velocities = [0, 0, 0];

        const angle = this.entity.angle;

        var position_speed = this.position_speed;
        if (keys_down["c"]) {
            position_speed *= 3; // Triple speed
        }

        if (keys_down["w"]) {
            position_velocities[0] += position_speed * Math.sin(angle);
            position_velocities[2] -= position_speed * Math.cos(angle);
        }

        if (keys_down["s"]) {
            position_velocities[0] -= position_speed * Math.sin(angle);
            position_velocities[2] += position_speed * Math.cos(angle);
        }

        if (keys_down["z"]) {
            position_velocities[1] += position_speed;
        }

        if (keys_down["x"]) {
            position_velocities[1] -= position_speed;
        }

        if (keys_down["a"]) {
            rotation_velocities[1] -= this.rotation_speed;
        }

        if (keys_down["d"]) {
            rotation_velocities[1] += this.rotation_speed;
        }

        this.position_velocities = position_velocities;
        this.rotation_velocities = rotation_velocities;
    }

    on_collision(other_actor) {
        console.log("Camera collided with " + other_actor.constructor.name + "!");
        if (other_actor instanceof Guard) {
            this.entity.local_vertices = this.entity.initial_vertices; // Reset camera position
        }
    }

    tick(p1) {
        // Update attached light's velocity to match mine
        this.light.position_velocities = this.position_velocities;
        this.light.rotation_velocities = this.rotation_velocities;

        super.tick(p1);
    }
}