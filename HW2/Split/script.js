class main {
    constructor() {
        this.consoleSection = document.getElementById("console");
        this.outputContainer = document.getElementById("output-container");
        this.moneySection = document.getElementById("money");
        console.log("main class is created");
        this.money = 100;
        this.slotMachines = [];
        this.numSlotMachines = 3;
        this.winningPatterns = [ //should be in decreasing order of winning magnitude, as order affects which pattern is matched first
            new SlotPattern(['0', '0', '0'], 14),
            new SlotPattern(['c', 'a', 'c'], 10), //bonus
            new SlotPattern(['x', 'x', 'x'], 7),
            new SlotPattern(['0', '0', 'x'], 3),
            new SlotPattern(['x', 'x', '-'], 2),
            new SlotPattern(['0', '-', '-'], 1)
        ]
        this.minSlotValue = 0;
        this.maxSlotValue = 6; // note that local images only have 0-6

        // Add SM's
        for (let i = 0; i < this.numSlotMachines; i++) {
            this.slotMachines.push(new SlotMachine(this.minSlotValue, this.maxSlotValue, this.winningPatterns));
        }
    }
    
    playAll() {
        if (this.money == 0) {
            this.consoleSection.innerHTML += "<br>Out of money<br>";
            return;
        }
        if (this.money < 0) {
            this.consoleSection.innerHTML += `<br>You owe the bank ${this.money} <br>`;
            this.money = 0;
        }
        this.money--;
        this.outputContainer.innerHTML = "";

        // Play each SM
        for (let i = 0; i < this.numSlotMachines; i++) {
            var matchedPattern = this.slotMachines[i].play();
            if (matchedPattern) { //winnings
                this.money += matchedPattern.winnings;
            }

            this.moneySection.innerHTML = "Money Remaining: $" + this.money;

            // Update output section
            const section = document.createElement('section');
            // Vertically align text
            section.id = `section-${i}`;
            section.innerHTML = `<p style="display: flex; align-items: center;">\t\t${this.slotMachines[i].getOutput()}.</p>`;
            this.outputContainer.appendChild(section);
        }
    }

    handleClick() {
        console.log("Button is clicked");
        this.playAll();
    }
}

class SlotMachine {
    constructor(min, max, winningPatterns) {
        this.consoleSection = document.getElementById("console");
        console.log("SlotMachine class is created");

        this.lastWinningPattern = 0;
        this.numSlots = 3;
        this.slots = [];

        this.slotMinValue = min;
        this.slotMaxValue = max;

        this.winningPatterns = winningPatterns
    }

    play() {
        console.log("SlotMachine is played");

        // Generate random values for each slot
        for (let i = 0; i < this.numSlots; i++) {
            this.slots[i] = new Slot(this.slotMinValue, this.slotMaxValue);
        }

        var matchedPattern = this.getMatchingPattern();

        return matchedPattern
    }

    // Returns the winning pattern and determines the amount won
    getMatchingPattern() {
        console.log("Evaluating all winnings");
        for (let i = 0; i < this.winningPatterns.length; i++) {
            const pattern = this.winningPatterns[i];
            const matchedPattern = pattern.getMatchingPattern(this.slots.map(slot => slot.value.toString())); //value must be a string

            // If slotPattern is false, no pattern was found
            // If a pattern is found, its the pattern object
            if (!matchedPattern) {
                continue;
            }
            this.lastWinningPattern = matchedPattern;
            return matchedPattern;
        }
        this.lastWinningPattern = 0;
        return false; //no winnings
    }

    getOutput() {
        var slotsString = "";
        for (let i = 0; i < this.numSlots; i++) {
            slotsString += "<img src='" + this.slots[i].ImgSrc + "' alt='slot" + i + "'>";
        }
        var patternString = this.lastWinningPattern ? this.lastWinningPattern.toString() : "No winnings";
        return slotsString + "Won: " + patternString;
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

class SlotPattern {
    constructor(pattern, winnings) {
        this.pattern = pattern; //list of strings
            //for each string:
            // x: any same non-zero value
            // 0: 0
            // -: any value
        this.winnings = winnings // int
    }

    getMatchingPattern(patternToTest) {
        var currentLetterValues = {}; // dict where the key is a letter and the value is the last value matched by this letter
        // different keys CAN share the same value, i.e. (x, y) pattern would match for (1, 1)
        for (let i = 0; i < this.pattern.length; i++) {
            // Check if its a lowercase letter a-z
            if (this.pattern[i].charCodeAt(0) >= 97 && this.pattern[i].charCodeAt(0) <= 122) {
                if (patternToTest[i] == '0') { //value can be anything but 0
                    return false;
                }
                else if (!currentLetterValues[this.pattern[i]]) { //if the letter is not yet in the dictionary
                    currentLetterValues[this.pattern[i]] = patternToTest[i]; //first letter value of the pattern, allow it and store it for future letter values
                }
                else if (currentLetterValues[this.pattern[i]] != patternToTest[i]) {
                    return false; //x values do not match
                }
            }
            else if (this.pattern[i] == '-') {
                // - means any value
            }
            else if (this.pattern[i] != patternToTest[i]) {
                return false; //pattern does not match and isnt an x
            }
        }
        console.log("Pattern matched");
        return this; //return the whole object
    }

    toString() {
        var patternString = "";
        for (let i = 0; i < this.pattern.length; i++) {
            patternString += this.pattern[i];
            if (i != this.pattern.length - 1) {
                patternString += ", ";
            }
        }
        return "$" + this.winnings + " with pattern (" + patternString + ")";
    }
}

function onClick() {
    myMain.handleClick();
}