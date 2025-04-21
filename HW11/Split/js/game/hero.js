class Hero extends CameraActor {
    constructor(...args) {
        const health = 5;
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

    on_destroy() {
        console.log("You lose!");
        console_section.innerHTML = "You lose!";
        // Kill canvas
        canvas.remove();
        should_continue = false; // Stop the game loop
    }

    on_collision(other_actor) {
        if (other_actor instanceof Guard) {
            this.should_destroy = true; // die
        }
        else if (other_actor instanceof TargetDestination) {
            console.log("You win!");
            console_section.innerHTML = "You win!";
        }
    }
}