class Actor {
    constructor(gl, entity, trigger_box) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_box = trigger_box; // The bounding box (TriggerBox)
    }

    draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix) {
        this.entity.draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix);
    }

    get_global_location() {
        var global_location = this.trigger_box.vertices.slice(0); // Copy the vertices array
        // Translate the trigger box vertices by the entity's location
        for (var i = 0; i < global_location.length; i += 3) {
            global_location[i] += this.entity.location[0]; // x
            global_location[i + 1] += this.entity.location[1]; // y
            global_location[i + 2] += this.entity.location[2]; // z
        }
        return global_location;
    }

    check_trigger_collision(other_actor) {
        // add tbox loc to entity loc
        const my_global_verts = this.get_global_location();
        const other_global_verts = other_actor.get_global_location();
        return is_overlapping(my_global_verts, other_global_verts);
    }
}

function is_overlapping(a, b) { // where a and b are axis aligned arrays of 8 verts
    return (
        a[0] <= b[3] && a[3] >= b[0] && // x-axis overlap
        a[1] <= b[7] && a[7] >= b[1] && // y-axis overlap
        a[2] <= b[11] && a[11] >= b[2] // z-axis overlap
    );
}