class Actor {
    constructor(gl, entity, trigger_box) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_box = trigger_box; // The bounding box (TriggerBox)
    }

    draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix) {
        this.entity.draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix);
    }

    get_tbox_global_verts() {
        // Get the global location of the trigger box by adding its local location to the entity's location
        const entity_vertices = this.entity.vertices;
        const trigger_box_local_location = this.trigger_box.location;
        return entity_vertices.map((v, i) => v + trigger_box_local_location[i % 3]);
    }

    check_trigger_collision(other_actor) {
        // add tbox loc to entity loc
        const my_global_verts = this.get_tbox_global_verts();
        const other_global_verts = other_actor.get_tbox_global_verts();
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