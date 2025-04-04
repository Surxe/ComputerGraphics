class Actor {
    constructor(entity, trigger_boxes, position_velocities=[0, 0, 0], rotation_velocities=[0, 0, 0]) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_boxes = trigger_boxes; // The bounding box (TriggerBox)
        this.position_velocities = position_velocities; // Position velocities
        this.rotation_velocities = rotation_velocities; // Rotation velocities
        this.name = "Actor"; // Name of the actor
    }

    render() {
        this.entity.render();
    }

    check_trigger_collision(my_global_verts, other_actor) {
        const other_entity_global_location = other_actor.entity.location;
        
        for (var other_trigger_box of other_actor.trigger_boxes) {
            const other_global_verts = other_trigger_box.get_global_verts(other_entity_global_location);
            if (is_overlapping(my_global_verts, other_global_verts)) {
                this.on_collision(other_actor); // Call the collision handler
                return true; // Collision detected
            }
        }
        
        return false; // No collision detected
    }

    on_collision(other_actor) {
        console.log("Collision detected with " + other_actor.name + "!");
    }

    move(other_actors) {
        var will_collide = false;

        for (var other_actor of other_actors) {
            // Get next position for all tboxes
            var next_tbox_positions = [];
            for (var trigger_box of this.trigger_boxes) {
                next_tbox_positions.push(trigger_box.get_next_position(this.position_velocities));
            }

            // Check for collisions with other actors
            for (var i = 0; i < this.trigger_boxes.length; i++) {
                const next_tbox_position = next_tbox_positions[i];
                const this_entity_global_location = this.entity.location;
                const next_tbox_global_verts = this.trigger_boxes[i].get_global_verts(this_entity_global_location, next_tbox_position);
                if (this.check_trigger_collision(next_tbox_global_verts, other_actor)) {
                    will_collide = true; // Collision detected
                    console.log("Collision detected with another actor!");
                    break;
                }
            }

            if (will_collide) {
                break; // Exit the loop if a collision is detected
            }
        }

        // Move entity and all tboxes
        if (!will_collide) {
            this.entity.move(this.position_velocities, this.rotation_velocities); // Move the entity based on its position velocities and rotation velocities
            for (var j = 0; j < this.trigger_boxes.length; j++) {
                this.trigger_boxes[j].move(this.position_velocities, 0); // Move the trigger boxes based on the same velocities
            }
        }
    }
}

function is_overlapping(a, b) { // where a and b are axis aligned arrays of 8 verts (length 24)
    return (
        a[0] <= b[3] && a[3] >= b[0] && // x-axis overlap
        a[1] <= b[7] && a[7] >= b[1] && // y-axis overlap
        a[2] <= b[11] //&& a[11] >= b[2] // z-axis overlap
    );
}