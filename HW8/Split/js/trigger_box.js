class TriggerBox extends Entity{
    constructor(positions, ...args) {
        // Ensure positions create's a box
        // Not a perfect validation yet
        if (positions.length != 4) {
            console.error("TriggerBox must have 4 positions.");
            return;
        }
        super(positions, ...args);
    }

    
}