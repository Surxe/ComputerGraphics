class Actor {
    // Actors are an Entity that have TriggerBoxes to detect collisions
    constructor(entity, trigger_boxes) {
        this.entity = entity
        this.trigger_boxes = trigger_boxes;
        console.log("Actor " + this.entity.name + " created with " + this.trigger_boxes.length + " trigger_boxes.");
    }

    move() {
        this.entity.move();
        for (let trigger_box of this.trigger_boxes) {
            trigger_box.move();
        }
    }

    update_velocities(p1) {
        this.entity.update_velocities(p1);
        for (let trigger_box of this.trigger_boxes) {
            trigger_box.update_velocities(p1);
        }
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