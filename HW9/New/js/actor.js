class Actor {
    constructor(entity, trigger_boxes, position_velocities=[0, 0, 0], rotation_velocities=[0, 0, 0]) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_boxes = trigger_boxes; // The bounding box (TriggerBox)
        this.position_velocities = position_velocities; // Position velocities
        this.rotation_velocities = rotation_velocities; // Rotation velocities
    }

    render() {
        this.entity.render();
    }

    check_trigger_collision(other_actor) {
        const this_entity_global_location = this.entity.location;
        const other_entity_global_location = other_actor.entity.location;
        for (var this_trigger_box of this.trigger_boxes) {
            for (var other_trigger_box of other_actor.trigger_boxes) {
                const my_global_verts = this_trigger_box.get_global_verts(this_entity_global_location);
                const other_global_verts = other_trigger_box.get_global_verts(other_entity_global_location);
                if (is_overlapping(my_global_verts, other_global_verts)) {
                    return true; // Collision detected
                }
            }
        }
        return false; // No collision detected
    }

    move() {
        this.entity.move(this.position_velocities, this.rotation_velocities); // Move the entity based on its position velocities and rotation velocities
        for (var trigger_box of this.trigger_boxes) {
            trigger_box.move(this.position_velocities, [0, 0, 0]); // tboxes will never rotate to ensure AABB alignment
        }
    }
}

function is_overlapping(a, b) { // where a and b are axis aligned arrays of 8 verts (length 24)
    return (
        a[0] <= b[3] && a[3] >= b[0] && // x-axis overlap
        a[1] <= b[7] && a[7] >= b[1] && // y-axis overlap
        a[2] <= b[11] && a[11] >= b[2] // z-axis overlap
    );
}