function initCanvas(cb) {
    // Grab canvas & 2d context.
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    // Variables required for a smooth throttled loop.
    let lastTime = 0;
    let fpsLimit = 100;
    let delta = 0;
    let paused = false;

    const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Ensure that the canvas dimensions are updated when window is resized.
    window.addEventListener('resize', updateCanvasSize, false);

    // Set initial dimensions.
    updateCanvasSize();

    // Time based tick function.
    const tick = timestamp => {
        if (timestamp < lastTime + (1000 / fpsLimit)) {
            // skip
        } else {
            delta = timestamp - lastTime;
            lastTime = timestamp;

            if (!paused) cb(ctx, delta, canvas.width, canvas.height);
        }

        window.requestAnimationFrame(tick);
    }

    // Start loop.
    window.requestAnimationFrame(tick);

    function togglePause() {
        paused = !paused;
    }

    return {
        canvas, ctx, togglePause
    };
}
