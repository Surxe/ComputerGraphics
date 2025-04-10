class Rock extends Actor {
    constructor() {
        const dist = 20;
        const x = Math.random()*dist*2-dist // [-dist, .. +dist]
        const y = -.5;
        const z = Math.random()*dist*2-dist

        // Create rocks
        const vertices = [
            // Top vertex
            0,  .5,  0,  
            // Side vertices
            .5,  0,  0,  
            0,  0,  .5,  
            -.5,  0,  0,  
            0,  0, -.5,  
            // Bottom vertex
            0, -.5,  0   
        ];

        const indices = [
            0, 1, 2,  // Top front-right
            0, 2, 3,  // Top front-left
            0, 3, 4,  // Top back-left
            0, 4, 1,  // Top back-right
            5, 2, 1,  // Bottom front-right
            5, 3, 2,  // Bottom front-left
            5, 4, 3,  // Bottom back-left
            5, 1, 4   // Bottom back-right
        ];
        
        const colors = [
            //Gray
            .5, .5, .5,
            .7, .7, .7,
            .3, .3, .3,
            .5, .5, .5,
            .7, .7, .7,
            .3, .3, .3,
        ];
            
        const rock_entity = new Entity(
            [...vertices], 
            [...indices], 
            [...colors],
            [x, y, z],
        )

        const trigger_boxes = [new TriggerBox([0, 0, 0], [1, 1, 1])];

        super(
            rock_entity, // Entity
            trigger_boxes // Trigger boxes
        );
    }
}