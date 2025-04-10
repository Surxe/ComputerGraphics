class DirectionalLight extends Light {
    constructor() {
        const direction = [0, -1, 0];
        const color = [1, 1, 1]; // White light
        super(color);
        this.direction = direction;
    }
}