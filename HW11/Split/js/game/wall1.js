class Wall1 extends Actor {
    constructor() {
        const vertices = [
            -0.5,  0.5, 0.0,  // Top-left
             0.5,  0.5, 0.0,  // Top-right
             0.5, -0.5, 0.0,  // Bottom-right
            -0.5, -0.5, 0.0   // Bottom-left
        ];

        const indices = [
            0, 1, 2,   // First triangle
            2, 3, 0    // Second triangle
        ];

        const colors = [
            1.0, 1.0, 1.0,  // White (will be overridden by texture)
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0
        ];

        const tex_coords = [
            0.0, 0.0,  // Top-left
            1.0, 0.0,  // Top-right
            1.0, 1.0,  // Bottom-right
            0.0, 1.0   // Bottom-left
        ];

        const sample_texture_data = new Uint8Array([
            // Row 0 (Top)
            255, 0,   0,   255,    // Red
            0,   255, 0,   255,    // Green
        
            // Row 1 (Bottom)
            0,   0,   255, 255,    // Blue
            255, 255, 0,   255     // Yellow
        ]);

        const location = [0, 0, 0]; // Center of the wall

        const textured_entity = new TexturedEntity(vertices, indices, colors, tex_coords, sample_texture_data, 2, 2, location);
        const trigger_boxes = [];
        
        super(textured_entity, trigger_boxes);
    }
}