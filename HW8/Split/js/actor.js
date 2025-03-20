class Actor {
    // Actors are an Entity that have TriggerBoxes to detect collisions
    constructor(entity, trigger_boxes) {
        this.entity = entity
        this.trigger_boxes = trigger_boxes;
        console.log("Actor " + this.entity.name + " created with " + this.trigger_boxes.length + " trigger_boxes.");
    }

    move() {
        // Update positions and rotations

        var new_position_data = this.entity.attempt_move();
        if (!new_position_data) {
            return;
        }
        this.entity.positions = new_position_data[0];
        this.entity.rotations = new_position_data[1];
        this.entity.translations = new_position_data[2];
        this.entity.unit_vector = this.calc_unit_vector(1);
        
        
        for (let trigger_box of this.trigger_boxes) {
            var new_position_data = trigger_box.attempt_move();
            trigger_box.positions = new_position_data[0];
            trigger_box.rotations = new_position_data[1];
            trigger_box.translations = new_position_data[2];
            trigger_box.unit_vector = this.calc_unit_vector(1);
        }
    }

    copy_lead_entity_velocity_to_trigger_boxes() {
        for (let trigger_box of this.trigger_boxes) {
            trigger_box.copy_velocity(this.entity);
        }
    }

    update_velocities(p1) {
        this.entity.update_velocities(p1);
        this.copy_lead_entity_velocity_to_trigger_boxes();
    }

    update_rotation_velocity(p1) {
        this.entity.update_rotation_velocity(p1);
    }

    update_position_velocity(p1) {
        this.entity.update_position_velocity(p1);
    }

    calc_unit_vector(p1) {
        return this.entity.calc_unit_vector(p1);
    }

    render(program) {
        this.entity.render(program);
        for (let trigger_box of this.trigger_boxes) {
            trigger_box.render(program);
        }
    }

    is_touching(other_actor) {
        for (let trigger_box of this.trigger_boxes) {
            for (let other_trigger_box of other_actor.trigger_boxes) {
                if (trigger_box.is_touching(other_trigger_box)) {
                    return true;
                }
            }
        }
        return false;
    }
}