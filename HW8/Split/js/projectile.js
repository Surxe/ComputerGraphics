class Projectile extends Actor {
    constructor(...args) {
        super(...args);
    }

    // Update movement/rotations based on pressed keys
    //keys_pressed is a map with keys [W, A, S, D] and values [true, false]
    update_velocities(p1) {
        // Projectile will not rotate

        // Position
        var unit_vector = this.calc_unit_vector(1);
        this.update_position_velocity(unit_vector);
    }

    on_collision(other_actor) {
        if (other_actor instanceof Hero) {
            console.log("Projectile collided with Hero!");
            return;
        }
        else if (other_actor instanceof Coin) {
            console.log("Projectile collided with Coin!");
            return;
        }
        else if (other_actor instanceof Obstacle) {
            console.log("Projectile collided with Wall!");
            this.should_destroy = true;
            return;
        }
        else if (other_actor instanceof Villain) {
            console.log("Projectile collided with Villain!");
            other_actor.should_destroy = true;
            this.should_destroy = true;
        }
    }
}