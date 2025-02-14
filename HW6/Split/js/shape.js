class Shape {
    constructor(vertices, outline_gl_draw_mode, fill_gl_draw_mode, should_fill) {
        this.vertices = [...vertices];
        this.outline_gl_draw_mode = outline_gl_draw_mode;
        this.fill_gl_draw_mode = fill_gl_draw_mode;
        this.should_fill = should_fill;
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

        var type = gl.FLOAT;
        var normalize = false;
        var unit_stride = Float32Array.BYTES_PER_ELEMENT;

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(colorAttributeLocation);

        gl.vertexAttribPointer(positionAttributeLocation, 2, type, normalize, 5*unit_stride, 0);
        gl.vertexAttribPointer(colorAttributeLocation,    3, type, normalize, 5*unit_stride, 2*unit_stride);

        var gl_draw_mode = this.should_fill ? this.fill_gl_draw_mode : this.outline_gl_draw_mode;

        gl.drawArrays(gl_draw_mode, 0, this.vertices.length/5); // div 6 as there are 3 coordinates and 3 colors per vertex
    }
}

class Triangle extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.TRIANGLES, gl.TRIANGLES, should_fill);
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

class Point extends Shape {
    constructor(vertices, should_fill) {
        super(vertices, gl.POINTS, gl.POINTS, should_fill);
    }
}