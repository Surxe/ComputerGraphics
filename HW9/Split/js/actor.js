class Actor {
    constructor(gl, entity, trigger_box) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_box = trigger_box; // The bounding box (TriggerBox)
    }

    draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix) {
        this.entity.draw(gl, position_attribute, color_uniform, transform_uniform, view_matrix);
        this.trigger_box.draw(gl, position_attribute); // Draw the trigger box (cube)
    }

    check_trigger_collision(point) {
        return this.trigger_box.check_collision(point);
    }
}