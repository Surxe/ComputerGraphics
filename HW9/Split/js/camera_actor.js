class CameraActor extends Actor {
    constructor(...args) {
        super(...args); // Call the parent constructor
        this.position_speed = 0.2 * tick_rate_scale;
        this.rotation_speed = 0.02 * tick_rate_scale;
    }

    update_velocities(keys_down) {
        // Reset velocities each frame
        var position_velocities = [0, 0, 0];
        var rotation_velocities = [0, 0, 0];

        const angle = this.entity.angle;

        if (keys_down["w"]) {
            position_velocities[0] += this.position_speed * Math.sin(angle);
            position_velocities[2] -= this.position_speed * Math.cos(angle);
        }

        if (keys_down["s"]) {
            position_velocities[0] -= this.position_speed * Math.sin(angle);
            position_velocities[2] += this.position_speed * Math.cos(angle);
        }

        if (keys_down["z"]) {
            position_velocities[1] += this.position_speed;
        }

        if (keys_down["x"]) {
            position_velocities[1] -= this.position_speed;
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
}