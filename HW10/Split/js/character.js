class Character extends Actor {
    constructor(health, ...args) {
        super(...args); // Call the parent constructor
        this.health = health; // Initial health of the character
    }

    on_collision(other_actor) {
        // Character collided with a Projectile, decrease health, destroy if dead
        if (other_actor instanceof Projectile) {
            this.health -= 1; // Decrease health on collision with a projectile
            console.log("Health decreased! Current health: " + this.health);
            if (this.health <= 0) {
                this.should_destroy = true; // Mark the character for destruction if health is 0 or less
                console.log("Character is dead!");
            }
        }
    }
}