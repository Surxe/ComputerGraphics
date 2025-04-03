class Actor {
    constructor(entity, trigger_boxes) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_boxes = trigger_boxes; // The bounding box (TriggerBox)
    }

    render() {
        this.entity.render();
    }

    check_trigger_collision(other_actor) {
        const entity_global_location = this.entity.location;
        for (let i = 0; i < this.trigger_boxes.length; i++) {
            for (let j = 0; j < other_actor.trigger_boxes.length; j++) {
                // add tbox loc to entity loc
                const my_global_verts = this.trigger_boxes[i].get_tbox_global_verts(entity_global_location);
                const other_global_verts = other_actor.trigger_boxes[j].get_tbox_global_verts(entity_global_location);
                if (is_overlapping(my_global_verts, other_global_verts)) {
                    return true; // Collision detected
                }
            }
        }
        return false; // No collision detected
    }
}

function is_overlapping(a, b) { // where a and b are axis aligned arrays of 8 verts (length 24)
    return (
        a[0] <= b[3] && a[3] >= b[0] && // x-axis overlap
        a[1] <= b[7] && a[7] >= b[1] && // y-axis overlap
        a[2] <= b[11] && a[11] >= b[2] // z-axis overlap
    );
}