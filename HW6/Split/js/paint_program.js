class PaintProgram {
    constructor(program) {
        this.program = program
        this.draw_mode = "triangle";
        this.shapes = [];
        this.vertices = [];
        this.args_per_vertex = 6; // 3 for position, 3 for color
    }

    add_point(x, y) {
        this.vertices.push(x, y, 0, 1, 0, 0);

        if (this.vertices.length/this.args_per_vertex % 3 == 0) { // every 3rd vertex creates a new triangle
            const shape = new Shape(this.vertices);
            this.shapes.push(shape);
            shape.render(this.program);
            this.vertices = []; // clear the vertices
        }
    }

    render() {
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].render(this.program);
        }
    }
}