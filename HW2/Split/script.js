class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        this.outputContainer = document.getElementById("output-container");
        console.log("main class is created");
        this.money = 100;
        this.slotMachines = [];
        this.numSlotMachines = 3;

        // Add SM's
        for (let i = 0; i < this.numSlotMachines; i++) {
            this.slotMachines.push(new SlotMachine(0, 6));
        }
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
        // Clear existing sections
        this.outputContainer.innerHTML = "";
        for (let i = 0; i < this.numSlotMachines; i++) {
            const section = document.createElement('section');
            section.id = `section-${i}`;
            section.innerHTML = `<p>${this.slotMachines[i].getOutput()}.</p>`;
            this.outputContainer.appendChild(section);
            console.log("Rendered section " + i);
        }
    }

    handleClick() {
        console.log("Button is clicked");
        this.playAll();
        this.renderAll();
    }
}

class SlotMachine {
    constructor(min, max) {
        this.consoleSection = document.getElementById("console");
        console.log("SlotMachine class is created");

        this.lastAmountWon = 0;
        this.numSlots = 3;
        this.slots = [];

        this.slotMinValue = min;
        this.slotMaxValue = max;
    }

    play() {
        console.log("SlotMachine is played");

        // Generate random values for each slot
        for (let i = 0; i < this.numSlots; i++) {
            this.slots[i] = new Slot(this.slotMinValue, this.slotMaxValue);
        }
    }

    getOutput() {
        var slotsString = "";
        for (let i = 0; i < this.numSlots; i++) {
            slotsString += "<img src='" + this.slots[i].ImgSrc + "' alt='slot" + i + "'>";
        }
        return slotsString + "Won: " + this.lastAmountWon;
    }
}

class Slot {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.value = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        this.ImgSrc = "images/" + this.value + ".png";
    }
}

function onClick() {
    myMain.handleClick();
}