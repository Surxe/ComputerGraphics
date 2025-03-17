class Actor {
    // Actors are an Entity that have TriggerBoxes to detect collisions
    constructor(entity, trigger_boxes) {
        this.entity = entity
        this.trigger_boxes = trigger_boxes;
    }

    move() {
        this.entity.move();
        for (let trigger_box of this.trigger_boxes) {
            trigger_box.move();
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