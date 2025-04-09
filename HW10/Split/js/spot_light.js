class SpotLight extends Light {
    constructor(position, direction, color, cutoff_degrees) {
        super(color);
        this.position = position;
        this.direction = direction;
        this.cutoff_degrees = cutoff_degrees;
    }

    set_position(position) {
        this.position = position;
    }

    set_direction(direction) {
        this.direction = direction;
    }

    set_cutoff(degrees) {
        this.cutoff_degrees = degrees;
    }
}