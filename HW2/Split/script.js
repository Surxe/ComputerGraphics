class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        console.log("<br>main class is created<br>");
        this.money = 100;
        this.slot_machines = [];
        this.num_slot_machines = 1;

        // Add SM's
        for (let i = 0; i < this.num_slot_machines; i++) {
            this.slot_machines.push(new SlotMachine());
        }
        
        // Add a <section> for output
        this.outputSection = document.createElement("section");
        this.outputSection.innerHTML = "<br>Output Section<br>";
        this.consoleSection.appendChild(this.outputSection);
    }
    
    playAll() {
        if (this.money == 0) {
            this.consoleSection.innerHTML += "<br>Out of money<br>";
            return;
        }
        this.money--;

        // Play each SM
        for (let i = 0; i < this.num_slot_machines; i++) {
            this.slot_machines[i].play();
        }
    }

    renderAll() {
        for (let i = 0; i < this.num_slot_machines; i++) {
            this.outputSection.innerHTML += "<br>Slot Machine " + i + ": " + this.slot_machines[i].slots + "<br>";
        }
        this.consoleSection.appendChild(this.outputSection);
    }

    handleClick() {
        this.consoleSection.innerHTML += "<br>Button is clicked<br>";
        this.playAll();
        this.renderAll();
    }
}

class SlotMachine {
    constructor() {
        this.consoleSection = document.getElementById("console");
        this.consoleSection.innerHTML += "<br>SlotMachine class is created<br>";

        this.lastAmountWon = 0;
        this.num_slots = 3;
        this.slots = [];

        this.slot_min_value = 0;
        this.slot_max_value = 6;
    }

    play() {
        this.consoleSection.innerHTML += "<br>SlotMachine is played<br>";

        // Generate random values for each slot
        for (let i = 0; i < this.num_slots; i++) {
            this.slots[i] = Math.floor(Math.random() * (this.slot_max_value - this.slot_min_value + 1)) + this.slot_min_value;
        }
    }

    render() {
        return this.slots;
    }
}

function onClick() {
    myMain.handleClick();
}