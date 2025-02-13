class PaintProgram {
    constructor(program) {
        this.program = program
        this.draw_mode = "triangle";
        this.shapes = [];
        this.next_vertices = [];
        this.next_shape;
        this.args_per_vertex = 5; // 2 for position, 3 for color
    }

    get_num_vertices_current_shape() {
        return this.next_vertices.length/this.args_per_vertex % 3
    }

    add_point(x, y, r, g, b, push=true) {
        this.next_vertices.push(x, y, r, g, b);

        var draw_mode;
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape == 0) { // every 3rd vertex creates a new triangle
            draw_mode = gl.TRIANGLES
        }
        else if (num_vertices_current_shape == 2) { //
            draw_mode = gl.LINE_LOOP
        }
        else if (num_vertices_current_shape == 1) {
            draw_mode = gl.POINTS
        }

        this.next_shape = new Shape(this.next_vertices, draw_mode);
        
        this.render();

        if (!push) { //after previewing the shape, remove the last vertex
            this.remove_last_vertex();
        }
        else if (num_vertices_current_shape == 0) { // if shape is complete
            this.shapes.push(this.next_shape);
            this.next_vertices = [];
        }
    }

    remove_last_vertex() {
        if (this.next_vertices.length > 0) {
            this.next_vertices = this.next_vertices.slice(0, -this.args_per_vertex);
        }
        else {
            throw Exception("No vertices to remove")
        }
    }

    del_current_shape() {
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape > 0) {
            this.next_vertices = [];
        }
        this.render();
    }

    render() {
        // Render all existing shapes
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].render(this.program);
        }

        // Preview the next shape
        if (this.next_shape) {
            this.next_shape.render(this.program);
        }
    }
}