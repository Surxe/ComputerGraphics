class Actor {
    constructor(entity, trigger_box) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_box = trigger_box; // The bounding box (TriggerBox)
    }

    render() {
        this.entity.render();
    }

    get_tbox_global_verts() {
        // Get the global location of the trigger box by adding entity's location to its local vertices
        const entity_global_location = this.entity.location;
        const trigger_box_local_vertices = this.trigger_box.vertices;
        return trigger_box_local_vertices.map((v, i) => {
            if (i % 3 === 0) { // x coordinate
                return v + entity_global_location[0];
            } else if (i % 3 === 1) { // y coordinate
                return v + entity_global_location[1];
            } else { // z coordinate
                return v + entity_global_location[2];
            }
        });
    }

    check_trigger_collision(other_actor) {
        // add tbox loc to entity loc
        const my_global_verts = this.get_tbox_global_verts();
        const other_global_verts = other_actor.get_tbox_global_verts();
        return is_overlapping(my_global_verts, other_global_verts);
    }
}

function is_overlapping(a, b) { // where a and b are axis aligned arrays of 8 verts (length 24)
    return (
        a[0] <= b[3] && a[3] >= b[0] && // x-axis overlap
        a[1] <= b[7] && a[7] >= b[1] && // y-axis overlap
        a[2] <= b[11] && a[11] >= b[2] // z-axis overlap
    );
}