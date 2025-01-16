class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        console.log("<br>main class is created<br>");
        this.money = 100;
        this.slotMachines = [];
        this.numSlotMachines = 1;

        // Add SM's
        for (let i = 0; i < this.numSlotMachines; i++) {
            this.slotMachines.push(new SlotMachine());
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
        for (let i = 0; i < this.numSlotMachines; i++) {
            this.slotMachines[i].play();
        }
    }

    renderAll() {
        for (let i = 0; i < this.numSlotMachines; i++) {
            this.outputSection.innerHTML += "<br>Slot Machine " + i + ": " + this.slotMachines[i].slots + "<br>";
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
        this.numSlots = 3;
        this.slots = [];

        this.slotMinValue = 0;
        this.slotMaxValue = 6;
    }

    play() {
        this.consoleSection.innerHTML += "<br>SlotMachine is played<br>";

        // Generate random values for each slot
        for (let i = 0; i < this.numSlots; i++) {
            this.slots[i] = Math.floor(Math.random() * (this.slotMaxValue - this.slotMinValue + 1)) + this.slotMinValue;
        }
    }

    render() {
        return this.slots;
    }
}

function onClick() {
    myMain.handleClick();
}