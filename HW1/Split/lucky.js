class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        console.log("<br>main class is created");
        this.wins = 0;
        this.losses = 0;
        this.img = document.getElementById("img");
    }

    // Generates a random number from [0, 100]
    roll() {
        return Math.floor(Math.random() * 100) + 1
    }

    // Compare two numbers to determine the winner
    processRolls(num1, num2) {
        var output = "";
        if (num2 > num1) {
            output = "You win!";
            this.wins++;
        }
        else {
            output = "You lose!";
            this.losses++;
        }

        // "Print" the output
        this.consoleSection.innerHTML += output + "<br>" + "Wins: " + this.wins + ", Losses: " + this.losses + "<br><br>";
    }

    updateImage() {
        if (this.wins > this.losses) {
            // Smiley face
            console.log("Smiley face");
            this.img.src = "happy.jpg";
        }
        else if (this.wins < this.losses) {
            // Sad face
            console.log("Sad face");
            this.img.src = "sad.jpg";
        }
        else {
            // Neutral face
            console.log("Neutral face");
            this.img.src = "neutral.png";
        }
    }
    
    // Plays a game
    playGame() {
        console.log("playGame function is called");
        
        // Roll two random numbers [0, 100]
        var num1 = this.roll();
        var num2 = this.roll();

        // Compare them and print output
        this.processRolls(num1, num2);

        //Update the image
        this.updateImage();
    }
}

function onClick() {
    myMain.playGame();
}