class PointLight extends Light {
    constructor(location) {
        const color = [1, 1, 1]; // White light
        super(color);
        this.position = location;
    }
}