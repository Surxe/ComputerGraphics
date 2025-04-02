var keys_down = {};
const valid_keys = ["w", "s", "a", "d", "z", "x"];

// Handle key presses for camera movement
document.addEventListener("keydown", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = true;
    }
});
// Handle key releases for camera movement
document.addEventListener("keyup", (event) => {
    if (valid_keys.includes(event.key)) {
        keys_down[event.key] = false;
    }
});