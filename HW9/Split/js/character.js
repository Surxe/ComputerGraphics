class Character extends Actor {
    constructor(health, ...args) {
        super(...args); // Call the parent constructor
        this.name = "Character"; // Name of the character
        this.health = health; // Initial health of the character
    }

    on_collision(other_actor) {
        if (other_actor.name === "Projectile") {
            this.health -= 1; // Decrease health on collision with a projectile
            console.log("Health decreased! Current health: " + this.health);
            if (this.health <= 0) {
                console.log("Character is dead!");
            }
        } else {
            console.log("Collision detected with " + other_actor.name + "!");
        }
    }
}