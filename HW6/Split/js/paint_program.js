class PaintProgram {
    constructor(program) {
        this.program = program
        this.draw_mode = "triangle";
        this.shapes = [];
        this.vertices = [];
        this.args_per_vertex = 5; // 3 for position, 3 for color
    }

    get_num_vertices_current_shape() {
        return this.vertices.length/this.args_per_vertex % 3
    }

    add_point(x, y, r, g, b) {
        this.vertices.push(x, y, r, g, b);

        var draw_mode;
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
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

    line_to(x, y, r, g, b) {
        // Draw temporary line
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape == 0) {
            return;
        }
        this.current_vertices.push(x, y, r, g, b);
        this.render();
    }

    del_current_shape() {
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape > 0) {
            this.vertices = [];
        }
        this.render();
    }

    render() {
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].render(this.program);
        }
    }
}