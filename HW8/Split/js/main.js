class Main {
    constructor() {
        var game_engine = new GameEngine();

        function create_hero_actor() {
            // Initial game_objects' states
            // shape is square with triangle ontop
            //    **
            //   ****
            //  ******
            // ********
            // ********
            // ********
            // ********
            var positions = [
                // square base
                [-.5, -.5, 0], //bottom left
                [.5, -.5, 0], //bottom right
                [.5, .5, 0], //top right
                [-.5, .5, 0], //top left
                // triangle ontop
                [-.5, .5, 0],
                [.5, .5, 0],
                [0, 1, 0],
            ]
            var rgb = [
                // blue square base
                [0, 0, 1],
                [0, 0, 1],
                [0, 0, 1],
                [0, 0, 1],
                // purple triangle ontop
                [1, 0, 1],
                [1, 0, 1],
                [1, 0, 1],
            ]
            var rotations = [0, 0, 0]
            var position_speed = 0.015;
            var rotation_speed = 4;
            var position_velocity = [0, 0, 0];
            var rotation_velocity = [0, 0, 0];
            var indices = [
                // square base
                0, 1, 2, 
                0, 2, 3,
                // triangle ontop
                4, 5, 6,
            ]
            var hero_entity = new Entity('Hero', 'TRIANGLES', rgb, positions, rotations, [.15, .15, .15], [0, 0, 0], position_speed, rotation_speed, position_velocity, rotation_velocity, indices);
            var trigger_box1_positions = [
                [-.5, -.5, 0], //bottom left
                [.5, -.5, 0], //bottom right
                [.5, .5, 0], //top right
                [-.5, .5, 0], //top left
            ]
            var trigger_box2_positions = [
                [-.5, .5, 0],
                [0, 1, 0],
                [.5, .5, 0],
                [0, 0.5, 0],
            ]
            var hero_trigger_boxes = [
                new TriggerBox(trigger_box1_positions, rotations, [.15, .15, .15], [0, 0, -.5], position_speed, rotation_speed, position_velocity, rotation_velocity, null),
                new TriggerBox(trigger_box2_positions, rotations, [.15, .15, .15], [0, 0, -.5], position_speed, rotation_speed, position_velocity, rotation_velocity, null)
            ];
            var hero = new Hero(hero_entity, hero_trigger_boxes);
            return hero
        }

        // octagon villain
        function create_villain_actor() {
            var positions = [];
            var rotations = [0, 0, 0];
            var position_speed = 0.015;
            var rotation_speed = 4;
            var position_velocity = [0, 0, 0];
            var rotation_velocity = [0, 0, 0];
            for (var i = 0; i < 8; i++) {
                var x = Math.cos(i * Math.PI / 4);
                var y = Math.sin(i * Math.PI / 4);
                positions.push([x, y, 0]);
            }
            var radius = 0.5;
            // Compute length of the octagon's sides
            var side_length = Math.sqrt(2) * radius;
            var villain_entity = new Entity('Villain', 'TRIANGLE_FAN', [0, 1, 0], positions, rotations, [.10, .10, .10], [-.5, 0, 0], position_speed, rotation_speed, position_velocity, rotation_velocity, null);
            function travel_from_towards(p1, p2, distance) { //p1 and p2 are [x, y, z]
                // travel <distance> from p1 towards p2
                var x_diff = p2[0] - p1[0];
                var y_diff = p2[1] - p1[1];
                var z_diff = p2[2] - p1[2];
                var magnitude = Math.sqrt(x_diff**2 + y_diff**2 + z_diff**2);
                var unit_vector = [x_diff/magnitude, y_diff/magnitude, z_diff/magnitude];
                return [p1[0] + unit_vector[0]*distance, p1[1] + unit_vector[1]*distance, p1[2] + unit_vector[2]*distance];
            }
            function create_villain_tbox_positions(positions, i) {
                const corner0 = [positions[i][0],               positions[i][1], 0];
                const corner1 = [positions[(i + 1) % 8][0],     positions[(i + 1) % 8][1], 0];
                const corner4 = [positions[(i + 4) % 8][0],     positions[(i + 4) % 8][1], 0];
                const corner5 = [positions[(i + 1 + 4) % 8][0], positions[(i + 1 + 4) % 8][1], 0];
                return [
                    corner0,
                    corner1,
                    travel_from_towards(corner1, corner4, side_length),
                    travel_from_towards(corner0, corner5, side_length),
                ]
            }
            function create_villain_tbox(positions, scalar=.10) {
                return new TriggerBox(positions, rotations, [scalar, scalar, scalar], [-.5, 0, -.5], position_speed, rotation_speed, position_velocity, rotation_velocity, null);
            }
            var villain_trigger_boxes = [];
            for (var i = 0; i < 8; i++) {
                villain_trigger_boxes.push(create_villain_tbox(create_villain_tbox_positions(positions, i)));
            }
            // add tbox to cover the middle
            var villain_middle_tbox_positions = [
                [-.5, -.5, 0], //bottom left
                [.5, -.5, 0], //bottom right
                [.5, .5, 0], //top right
                [-.5, .5, 0], //top left
            ]

            villain_trigger_boxes.push(create_villain_tbox(villain_middle_tbox_positions, (radius-side_length)*.1*2));
            var villain = new Villain(villain_entity, villain_trigger_boxes);
            return villain;
        }

        function create_wall_actor() {
            // red wall
            var positions = [
                [-1, -1, 0], //bottom left
                [1, -1, 0], //bottom right
                [1, 0, 0], //top right
                [-1, 0, 0], //top left
            ]
            var rotations = [0, 0, 0]
            var position_velocity = [0, 0, 0];
            var rotation_velocity = [0, 0, 0];
            var wall_entity =         new Entity    ('Wall', 'TRIANGLE_FAN', [1, 0, 0], positions, rotations, [.15, .15, .15], [.3, 0, 0], 0, 0, position_velocity, rotation_velocity, null);
            var trigger_box1_positions = [
                [-1, -1, 0], //bottom left
                [0, -1, 0], //bottom right
                [0, 0, 0], //top right
                [-1, 0, 0], //top left
            ]
            var wall_trigger_boxes = [
                new TriggerBox(trigger_box1_positions, rotations, [.15, .15, .15], [0.3, 0, -.5], 0, 0, position_velocity, rotation_velocity, null),
                new TriggerBox(trigger_box1_positions, rotations, [.15, .15, .15], [0.3+1*.15, 0, -.5], 0, 0, position_velocity, rotation_velocity, null)
            ];       
            var wall = new Obstacle(wall_entity, wall_trigger_boxes);
            return wall;
        }

        function create_coin_actor() {
            var positions = [];
            var rotations = [0, 0, 0];
            var position_velocity = [0, 0, 0];
            var rotation_velocity = [0, 0, 0];
            // Circle
            for (var i = 0; i < 20; i++) {
                var x = Math.cos(i * 2 * Math.PI / 20);
                var y = Math.sin(i * 2 * Math.PI / 20);
                positions.push([x, y, 0]);
            }
            var coin_scale = .05;
            var coin_rotation_speed = 1;
            var coin_entity = new Entity('Coin', 'TRIANGLE_FAN', [1, 1, 0], positions, rotations, [coin_scale, coin_scale, coin_scale], [0, 0, 0], 0, coin_rotation_speed, position_velocity, rotation_velocity, null);
            var coin_trigger_box_positions = [
                [-1, -1, 0], //bottom left
                [1, -1, 0], //bottom right
                [1, 1, 0], //top right
                [-1, 1, 0], //top left
            ]
            var coin_trigger_boxes = [
                new TriggerBox(coin_trigger_box_positions, rotations, [coin_scale, coin_scale, coin_scale], [0, 0, -.5], 0, coin_rotation_speed, position_velocity, rotation_velocity, null)
            ];
            var coin = new Coin(coin_entity, coin_trigger_boxes);
            return coin;
        }

        var villain = create_villain_actor();
        game_engine.add_actor(villain);

        var coin = create_coin_actor();
        game_engine.add_actor(coin);

        var hero = create_hero_actor();
        game_engine.add_actor(hero);

        var wall = create_wall_actor();
        var obstacle_actors = [wall];
        game_engine.obstacle_actors = obstacle_actors;
        game_engine.add_actor(wall);

        game_engine.render();

        // WASD movement
        let keys_pressed = {
            W: false,  // Move Up (Y+)
            S: false,  // Move Down (Y-)
            A: false,  // Move Left (X-)
            D: false   // Move Right (X+)
        };

        // Handle keydown event
        document.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase(); // Normalize case to handle uppercase/lowercase keys

            if (key === 'w' && !keys_pressed.W) {
                keys_pressed.W = true;
            } else if (key === 's' && !keys_pressed.S) {
                keys_pressed.S = true;
            } else if (key === 'a' && !keys_pressed.A) {
                keys_pressed.A = true;
            } else if (key === 'd' && !keys_pressed.D) {
                keys_pressed.D = true;
            }
        });

        // Handle keyup event
        document.addEventListener('keyup', function(event) {
            const key = event.key.toLowerCase(); // Normalize case to handle uppercase/lowercase keys

            if (key == 'w') { // W
                keys_pressed.W = false;
            } else if (key == 's') { // S
                keys_pressed.S = false;
            } else if (key == 'a') { // A
                keys_pressed.A = false;
            } else if (key == 'd') { // D
                keys_pressed.D = false;
            }
        });

        // Handle space bar (shoot) event
        document.addEventListener('keydown', function(event) {
            if (event.key === ' ') {
                var bullet_actor = hero.create_bullet();
                game_engine.add_actor(bullet_actor);
            }
        });

        function tick() {
            game_engine.destroy();
            game_engine.update_velocities(keys_pressed);
            game_engine.move();
            game_engine.render();
        }

        // Wait till page loads to start ticking
        document.addEventListener('DOMContentLoaded', function () {
            const ticks_per_second = 30;
            const interval_id = setInterval(tick, 1000/ticks_per_second);
        });
    }
}