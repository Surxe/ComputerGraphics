class TriggerBox extends Entity{
    constructor(positions, ...args) {
        // Ensure positions create's a box that is axis-aligned
        // Not a perfect validation yet
        if (positions.length != 4) {
            console.error("TriggerBox must have 4 positions.");
            return;
        }
        var draw_mode = 'LINE_LOOP';
        var rgb = [1, 0, 0];
        super('TRIGGER_BOX', draw_mode, rgb, positions, ...args);
    }

    render(program) {
        // Render the TriggerBox
        console.log("Rendering TriggerBox");
        super.render(program);
    }

    is_touching(other_trigger_box) {
        // Given rotations [x, y, z] degrees
        // Given positions of vertices [[x1, y1, z1], [x2, y2, z2], ...]
        // Use Separating Axis Theorem to determine if two boxes are touching
        return false;
    }
}