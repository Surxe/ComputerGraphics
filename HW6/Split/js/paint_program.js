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

        var draw_mode;
        var num_vertices_current_shape = this.vertices.length/this.args_per_vertex % 3
        if (num_vertices_current_shape == 0) { // every 3rd vertex creates a new triangle
            draw_mode = gl.TRIANGLES
        }
        else if (num_vertices_current_shape == 2) { //
            draw_mode = gl.LINE_LOOP
        }
        else if (num_vertices_current_shape == 1) {
            return;
        }

        var shape = new Shape(this.vertices, draw_mode);
        this.shapes.push(shape);
        //shape.render(this.program);
        this.render();
        if (num_vertices_current_shape == 0) {
            this.vertices = []; // clear the vertices after a triangle is drawn
        }
    }

    render() {
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].render(this.program);
        }
    }
}