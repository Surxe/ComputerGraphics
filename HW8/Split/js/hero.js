class Hero extends Character {
    constructor(...args) {
        super(...args);
    }

    create_bullet() {
        // Get hero's direction
        // Add pixels to hero's position in its direction
        const shift_magnitude = .08;
        const shift_direction = this.entity.unit_vector;
        const shift_vector = Transform.scale_1d_array(shift_direction, shift_magnitude);

        // Create bullet
        var bullet_draw_mode = 'TRIANGLE_FAN';
        var bullet_rgb = [120/255, 120/255, 120/255];
        var bullet_positions = [
            [-.25, -.5, 0], //bottom left
            [.25, -.5, 0], //bottom right
            [.25, .5, 0], //top right
            [-.25, .5, 0], //top left
        ]
        var bullet_rotations = this.entity.rotations;
        var bullet_scalars = [.05, .05, .05];
        var bullet_translations = Transform.add_1d_arrays(this.entity.translations, shift_vector);
        var bullet_position_velocities = this.entity.position_velocities;
        var bullet_rotation_velocities = [0, 0, 0];
        var bullet_indices = null
        var bullet_trigger_boxes = [];
        var bullet_entity = new Entity(bullet_draw_mode, bullet_rgb, bullet_positions, bullet_rotations, bullet_scalars, bullet_translations, bullet_position_velocities, bullet_rotation_velocities, bullet_indices);
        var bullet_actor = new Actor(bullet_entity, bullet_trigger_boxes);
        game_engine.add_entity(bullet_entity);
        return bullet_actor;
    }

    shoot(bullet_actor) {


        console.log("Hero shoots!");
    }
}