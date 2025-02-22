class Shape {
    constructor(vertices, outline_gl_draw_mode, fill_gl_draw_mode, should_fill) {
        this.vertices = [...vertices];
        this.outline_gl_draw_mode = outline_gl_draw_mode;
        this.fill_gl_draw_mode = fill_gl_draw_mode;
        this.should_fill = should_fill;
        this.pos_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pos_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pos_buffer);

        var pos_attr_loc = gl.getAttribLocation(program, "a_position");
        var color_attr_loc = gl.getAttribLocation(program, "a_color");

        var type = gl.FLOAT;
        var normalize = false;
        var unit_stride = Float32Array.BYTES_PER_ELEMENT;

        gl.enableVertexAttribArray(pos_attr_loc);
        gl.enableVertexAttribArray(color_attr_loc);

        gl.vertexAttribPointer(pos_attr_loc, 2, type, normalize, 5*unit_stride, 0); //x and y
        gl.vertexAttribPointer(color_attr_loc,    3, type, normalize, 5*unit_stride, 2*unit_stride); //r, g, b starts 2 pos over

        var gl_draw_mode = this.should_fill ? this.fill_gl_draw_mode : this.outline_gl_draw_mode;

        gl.drawArrays(gl_draw_mode, 0, this.vertices.length/5); // div 5 as there are 2 coordinates and 3 colors per vertex
    }
}

class Triangle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLES, should_fill);
    }
}

class Rectangle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Line extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.LINES, should_fill);
    }
}

class Polygon extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Circle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.LINE_LOOP, gl.TRIANGLE_FAN, should_fill);
    }
}

class Point extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.POINTS, gl.POINTS, should_fill);
    }
}