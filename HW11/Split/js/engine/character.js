class Character extends Actor {
    constructor(health, ...args) {
        super(...args); // Call the parent constructor
        this.health = health; // Initial health of the character
    }

    // this received a hit of damage damage
    hit_received(damage) {
        this.health -= damage; 
        if (this.health <= 0) {
            this.should_destroy = true; // die
        }
        else {
            console.log("Remaining health: " + this.health); // Log remaining health
        }
    }
}