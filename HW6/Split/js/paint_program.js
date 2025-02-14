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

    add_point(x, y, r, g, b, shape_type="triangle", should_fill=true, push=true) {
        if (this.next_vertices.length > 0) {
            var [x1, y1] = this.get_previous_vertex_xy(); //store the prev x and y for if a rect is chosen
        }
        this.next_vertices.push(x, y, r, g, b);

        this.shape_class;
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape == 0) { //no vertices drawn yet
            return;
        }
        console.log(`num_vertices_current_shape: ${num_vertices_current_shape} shape_type: ${shape_type}`)
        var shape_complete = false;
        var num_verts_to_remove = 1;
        if (shape_type == "triangle") {
            if (num_vertices_current_shape == 3) { // every 3rd vertex creates a new triangle
                this.shape_class = Triangle;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 2) {
                this.shape_class = Line;
            }
            else if (num_vertices_current_shape == 1) {
                this.shape_class = Point;
            }
        }
        else if (shape_type == "line") {
            if (num_vertices_current_shape == 2) {
                this.shape_class = Line;
                shape_complete = true;
            }
            else if (num_vertices_current_shape == 1) {
                this.shape_class = Point;
            }
        }
        else if (shape_type == "polygon") {
            if (num_vertices_current_shape >= 3) {
                this.shape_class = Polygon;
            }
            else if (num_vertices_current_shape == 2) {
                this.shape_class = Line;
            }
            else if (num_vertices_current_shape == 1) {
                this.shape_class = Point;
            }
        }
        else if (shape_type == "rectangle") {
            if (num_vertices_current_shape == 2) {
                this.shape_class = Rectangle;
                num_verts_to_remove = 3;
                
                // Remove last vertex
                this.remove_last_vertex(1, false);
                this.next_vertices.push(x1, y, r, g, b);
                this.next_vertices.push(x, y, r, g, b); //add back to the end
                this.next_vertices.push(x, y1, r, g, b);

                shape_complete = true;
            }
            else if (num_vertices_current_shape == 1) {
                this.shape_class = Point;
            }
        }
        else if (shape_type == "circle") {
            if (num_vertices_current_shape == 2) {
                this.shape_class = Circle;

                // Calc radius from center point
                var radius = Math.sqrt((x-x1)**2 + (y-y1)**2);

                // Remove the first edge point
                this.remove_last_vertex(1, false);

                // Remove center point
                this.remove_last_vertex(1, false);

                // Add vertices for circle
                const num_segments = 30;
                num_verts_to_remove = num_segments
                for (var i = 0; i < num_segments; i++) {
                    var angle = i * 2 * Math.PI / num_segments;
                    var x2 = x1 + radius * Math.cos(angle);
                    var y2 = y1 + radius * Math.sin(angle);
                    this.next_vertices.push(x2, y2, r, g, b);
                }

                shape_complete = true;
            }
            else if (num_vertices_current_shape == 1) {
                this.shape_class = Point;
            }
        }
        else {
            throw Exception(`Invalid shape type: ${shape_type}`)
        }

        this.next_shape = new this.shape_class(this.next_vertices, should_fill);
        
        this.render();

        if (!push) { //after previewing the shape, remove the last vertex
            console.log(`Removing ${num_verts_to_remove} vertices`)
            this.remove_last_vertex(num_verts_to_remove, false);
            if (num_verts_to_remove == 30) {
                this.next_vertices.push(x1, y1, r, g, b); //add back to the end
            }
        }
        else if (shape_complete) { // if shape is complete
            this.shapes.push(this.next_shape);
            this.next_vertices = [];
        }
    }

    remove_last_vertex(num_vertices=1, store_last_vertex=true) {
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

        // Call it again if needed
        num_vertices--;
        if (num_vertices > 0) {
            this.remove_last_vertex(num_vertices, store_last_vertex);
        }
    }

    get_previous_vertex_xy() {
        if (this.next_vertices.length > 0) {
            return this.next_vertices.slice(-this.args_per_vertex, -this.args_per_vertex+2);
        }
        else {
            return null;
        }
    }

    mark_shape_complete() {
        this.shapes.push(this.next_shape);
        this.next_vertices = [];
    }

    complete_current_shape() {
        var num_vertices_current_shape = this.get_num_vertices_current_shape()
        if (num_vertices_current_shape > 0) {
            this.mark_shape_complete(); // complete the shape
        }
        this.render();
    }

    undo() {
        if (this.get_num_vertices_current_shape() > 0) {
            this.remove_last_vertex(1, true);
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