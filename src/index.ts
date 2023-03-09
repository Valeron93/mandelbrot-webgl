import { Renderer } from './renderer';

const canvas = document.querySelector<HTMLCanvasElement>("#canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl") as WebGLRenderingContext;
const renderer = Renderer.create(gl) as Renderer;

const state = {
    x: 0,
    y: 0,
    zoom: 1,
};


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setViewportSize(canvas.width, canvas.height);
    draw();
}

renderer.setZoom(1);

function zoomBy(delta: number) {
    const sens = 0.0005;
    
    state.zoom += delta * sens * state.zoom;
    
    if (state.zoom < 0.000022) {
        state.zoom = 0.000022;
    }

    if (state.zoom > 1) {
        state.zoom = 1;
    }

    renderer.setZoom(state.zoom);
    draw();
}



function draw() {
    renderer.clear();
    renderer.drawRect();
}

window.addEventListener("wheel", (event) => {
    const { deltaY } = event;
    zoomBy(-deltaY);
});

window.addEventListener("mousemove", (event) => {
    if (event.buttons == 0) {
        return;
    }

    const { movementX, movementY } = event;
    const { zoom } = state;
    state.x += zoom * movementX * 0.005;
    state.y -= zoom * movementY * 0.005;
    renderer.setTranslation(state.x, state.y);
    draw();
});

window.addEventListener("resize", resize);

resize();
draw();

