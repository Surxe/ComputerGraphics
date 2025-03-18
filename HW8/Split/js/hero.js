class Hero extends Character {
    constructor(...args) {
        super(...args);
    }

    create_bullet() {
        // Get hero's direction
        // Add 10 to hero's position in its direction
        const shift = []

        const bullet_draw_mode = 'TRIANGLE_FAN';
        const bullet_rgb = [120/255, 120/255, 120/255];
        const bullet_positions = [
            [-.25, -.5, 0], //bottom left
            [.25, -.5, 0], //bottom right
            [.25, .5, 0], //top right
            [-.25, .5, 0], //top left
        ]
        const bullet_rotations = this.entity.rotations;
        const bullet_scalars = [.05, .05, .05];
        const bullet_translations = this.entity.translations;
        const bullet_position_velocities = this.entity.position_velocities;
        const bullet_rotation_velocities = [0, 0, 0];
        const bullet_indices = null
        const bullet_trigger_boxes = [];
        var bullet_entity = new Entity(bullet_draw_mode, bullet_rgb, bullet_positions, bullet_rotations, bullet_scalars, bullet_translations, bullet_position_velocities, bullet_rotation_velocities, bullet_indices);
        var bullet_actor = new Actor(bullet_entity, bullet_trigger_boxes);
        game_engine.add_entity(bullet_entity);
        return bullet_actor;
    }

    shoot(bullet_actor) {


        console.log("Hero shoots!");
    }
}