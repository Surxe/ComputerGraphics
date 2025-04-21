class HeroBullet extends Bullet {
    constructor(...args) {
        super(...args);
    }

    on_collision(other_actor) {
        if (other_actor instanceof Guard) {
            console.log("HeroBullet collided with " + other_actor.constructor.name + "!");
            other_actor.hit_received(this.damage); // Deal damage to the guard
            this.should_destroy = true; // Destroy the bullet
        }
    }
}