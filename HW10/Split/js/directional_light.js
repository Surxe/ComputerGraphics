class DirectionalLight extends Light {
    constructor(direction, color) {
        super(color);
        this.direction = direction;
    }

    set_direction(direction) {
        this.direction = direction;
    }
}