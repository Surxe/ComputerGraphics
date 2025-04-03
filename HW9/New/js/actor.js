class Actor {
    constructor(entity, trigger_box) {
        this.entity = entity; // The graphical representation (Entity)
        this.trigger_box = trigger_box; // The bounding box (TriggerBox)
    }

    render() {
        this.entity.render();
    }
}