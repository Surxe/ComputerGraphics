class PointLight extends Light {
    constructor() {
        const max_distance = 40;
        const min_distance = 20;
        const x = Math.random() * (max_distance - min_distance) + min_distance;
        const y = 2;
        const z = Math.random() * (max_distance - min_distance) + min_distance;
        const position = [x, y, z];
        const color = [1, 1, 1]; // White light
        super(color);
        this.position = position;
    }

    set_position(position) {
        this.position = position;
    }
}