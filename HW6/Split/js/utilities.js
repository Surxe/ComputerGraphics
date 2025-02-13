function hex_to_rgb(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16)/255;
    let g = parseInt(hex.substring(2, 4), 16)/255;
    let b = parseInt(hex.substring(4, 6), 16)/255;

    return [r, g, b];
} 

function mouse_event_to_gl_coords(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = -1 +  2*x/canvas.width
    const cy = -1 + 2*(1-y/canvas.height)
    return [cx, cy];
}