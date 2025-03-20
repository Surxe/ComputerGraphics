class TriggerBox extends Entity{
    constructor(positions, ...args) {
        // Ensure positions create's a box that is axis-aligned
        // Not a perfect validation yet
        if (positions.length != 4) {
            console.error("TriggerBox must have 4 positions.");
            return;
        }
        var draw_mode = 'LINE_LOOP';
        var rgb = [1, 1, 1];
        super('TRIGGER_BOX', draw_mode, rgb, positions, ...args);
    }

    is_touching(other_trigger_box) {
        var cube1 = new OrientedBoundingBox(this.positions, this.rotations);
        var cube2 = new OrientedBoundingBox(other_trigger_box.positions, this.rotations);
        return OrientedBoundingBox.is_touching(cube1, cube2);
    }
}