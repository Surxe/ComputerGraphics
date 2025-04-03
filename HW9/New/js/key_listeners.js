document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a": camera.rotate_left(); break;
        case "d": camera.rotate_right(); break;
        case "w": camera.move_forward(); break;
        case "s": camera.move_backward(); break;
        case "z": camera.move_up(); break;
        case "x": camera.move_down(); break;
    }
});