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
        // Given rotations [x, y, z] degrees
        // Given positions of vertices [[x1, y1, z1], [x2, y2, z2], ...]
        // Use Separating Axis Theorem to determine if two boxes are touching
        var rotations = this.rotations;
        var positions = this.positions;
        var other_rotations = other_trigger_box.rotations;
        var other_positions = other_trigger_box.positions;
        // Rotate the other box's vertices by the rotation of this box
        var rotated_other_positions = [];
        for (let other_position of other_positions) {
            rotated_other_positions.push(Transform.rotate_3d(other_position, rotations));
        }
        // Rotate this box's vertices by the rotation of the other box
        var rotated_positions = [];
        for (let position of positions) {
            rotated_positions.push(Transform.rotate_3d(position, other_rotations));
        }
        // Get the normals of the faces of this box
        var normals = [];
        for (let i = 0; i < 4; i++) {
            var v1 = positions[i];
            var v2 = positions[(i + 1) % 4];
            var normal = Transform.normalize_3d([v2[1] - v1[1], v1[0] - v2[0], 0]);
            normals.push(normal);
        }
        // Get the normals of the faces of the other box
        var other_normals = [];
        for (let i = 0; i < 4; i++) {
            var v1 = rotated_other_positions[i];
            var v2 = rotated_other_positions[(i + 1) % 4];
            var normal = Transform.normalize_3d([v2[1] - v1[1], v1[0] - v2[0], 0]);
            other_normals.push(normal);
        }
        // Check if the boxes are touching
        for (let normal of normals) {
            var min_this = Number.MAX_VALUE;
            var max_this = Number.MIN_VALUE;
            for (let position of rotated_positions) {
                var projection = Transform.dot_3d(position, normal);
                min_this = Math.min(min_this, projection);
                max_this = Math.max(max_this, projection);
            }
            var min_other = Number.MAX_VALUE;
            var max_other = Number.MIN_VALUE;
            for (let position of rotated_other_positions) {
                var projection = Transform.dot_3d(position, normal);
                min_other = Math.min(min_other, projection);
                max_other = Math.max(max_other, projection);
            }
            if (max_this < min_other || max_other < min_this) {
                return false;
            }
        }
        for (let normal of other_normals) {
            var min_this = Number.MAX_VALUE;
            var max_this = Number.MIN_VALUE;
            for (let position of rotated_positions) {
                var projection = Transform.dot_3d(position, normal);
                min_this = Math.min(min_this, projection);
                max_this = Math.max(max_this, projection);
            }
            var min_other = Number.MAX_VALUE;
            var max_other = Number.MIN_VALUE;
            for (let position of rotated_other_positions) {
                var projection = Transform.dot_3d(position, normal);
                min_other = Math.min(min_other, projection);
                max_other = Math.max(max_other, projection);
            }
            if (max_this < min_other || max_other < min_this) {
                return false;
            }
        }
        return true;
    }
}