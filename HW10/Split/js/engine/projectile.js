class Projectile extends Actor {
    constructor(...args) {
        super(...args);
    }

    on_collision(other_actor) {
        // Projectile collided with an asteroid, destroy the projectile
        if (other_actor instanceof Character) {
            console.log("Projectile hit an asteroid!");
            this.should_destroy = true;
        }
    }
}