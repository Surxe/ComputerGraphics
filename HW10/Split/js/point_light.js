class PointLight extends Light {
    constructor(position, color) {
        super(color);
        this.position = position;
    }

    set_position(position) {
        this.position = position;
    }
}