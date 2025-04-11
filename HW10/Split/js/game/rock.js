class Rock extends Actor {
    constructor() {
        const dist = 20;
        const x = Math.random()*dist*2-dist // [-dist, .. +dist]
        const y = -1;
        const z = Math.random()*dist*2-dist

        // Create rocks
        const sphere_data = create_sphere(1, 10, 10, [.5, .5, .5]);
        const vertices = sphere_data.vertices;
        // Translate Y down
        for (let i = 1; i < vertices.length; i+=3) {
            vertices[i] += -1.5;
        }
        const indices = sphere_data.indices;
        const colors = sphere_data.colors;
            
        const rock_entity = new Entity(
            [...vertices], 
            [...indices], 
            [...colors],
            [x, y, z],
        )

        const trigger_boxes = [new TriggerBox([0, .5, 0], [1, 1, 1])];

        super(
            rock_entity, // Entity
            trigger_boxes // Trigger boxes
        );
    }
}