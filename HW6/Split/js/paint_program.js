class PaintProgram {
    constructor(program) {
        this.program = program
        this.shapes = [];
        this.next_vertices = [];
        this.next_shape;
        this.popped_vertices = [];
        this.args_per_vertex = 5; // 2 for position, 3 for color
    }

    get_num_vertices_current_shape() {
        return this.next_vertices.length/this.args_per_vertex
    }

    add_point(x, y, r, g, b, shape_type="Triangle", should_fill=true, push=true) {
        this.next_vertices.push(x, y, r, g, b);

        var shape_class;
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape == 0) { //no vertices drawn yet
            return;
        }
        console.log(`num_vertices_current_shape: ${num_vertices_current_shape} shape_type: ${shape_type}`)
        var shape_complete = false;
        if (shape_type == "triangle") {
            if (num_vertices_current_shape == 3) { // every 3rd vertex creates a new triangle
                shape_class = Triangle;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 2) {
                shape_class = Line;
            }
            else if (num_vertices_current_shape == 1) {
                shape_class = Point;
            }
        }
        else if (shape_type == "line") {
            if (num_vertices_current_shape == 2) {
                shape_class = Line;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 1) {
                shape_class = Point;
            }
        }
        else if (shape_type == "polygon") {
            if (num_vertices_current_shape >= 3) {
                shape_class = Polygon;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 2) {
                shape_class = Line;
            }
            else if (num_vertices_current_shape == 1) {
                shape_class = Point;
            }
        }
        else if (shape_type == "rectangle") {
            if (num_vertices_current_shape == 2) {
                shape_class = Rectangle;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 1) {
                shape_class = Point;
            }
        }
        else {
            throw Exception(`Invalid shape type: ${shape_type}`)
        }



        this.next_shape = new shape_class(this.next_vertices, should_fill);
        
        this.render();

        if (!push) { //after previewing the shape, remove the last vertex
            this.remove_last_vertex(false);
        }
        else if (shape_complete) { // if shape is complete
            this.shapes.push(this.next_shape);
            this.next_vertices = [];
        }
    }

    remove_last_vertex(store_last_vertex=true) {
        if (this.next_vertices.length > 0) {
            if (store_last_vertex) {
                // Get last vertex
                var last_vertex = this.next_vertices.slice(-this.args_per_vertex);

                // Store up to 10 vertices
                if (this.popped_vertices.length >= 10) {
                    this.popped_vertices.shift();
                }
                this.popped_vertices.push(last_vertex);
            }

            // Remove from used vertices list
            this.next_vertices = this.next_vertices.slice(0, -this.args_per_vertex);
        }
        else {
            throw Exception("No vertices to remove")
        }
    }

    mark_shape_complete() {
        this.shapes.push(this.next_shape);
        this.next_vertices = [];
    }

    del_current_shape() {
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape > 0) {
            //this.next_vertices = []; //wipe the shape completely
            //this.remove_last_vertex(); // undo latest vertex
            this.mark_shape_complete(); // complete the shape
        }
        this.render();
    }

    undo() {
        if (this.get_num_vertices_current_shape() > 0) {
            this.remove_last_vertex(true);
            this.render();
        }
    }

    redo() {
        if (this.popped_vertices.length > 0) {
            var last_vertex = this.popped_vertices.pop();
            this.next_vertices.push(...last_vertex);
            this.render();
        }
    }

    clear_shape() {
        if (this.next_vertices.length==0) {
            this.shapes.pop();
        }
        else {
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