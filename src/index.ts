import { Renderer } from './renderer';

const canvas = document.querySelector<HTMLCanvasElement>("#canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl") as WebGLRenderingContext;
const renderer = Renderer.create(gl) as Renderer;

const onResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setViewportSize(canvas.width, canvas.height);
}

window.addEventListener("resize", onResize);
onResize();

const translation = {
    x: 0,
    y: 0,
};
let zoom = 1;

renderer.setZoom(1);
function zoomBy(delta: number) {
    const sens = 0.0005;
    zoom += delta * sens * zoom;
    
    if (zoom < 0.000022) {
        zoom = 0.000022;
    }

    if (zoom > 1) {
        zoom = 1;
    }

    renderer.setZoom(zoom);
    draw();
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

    translation.x += zoom * movementX * 0.005;
    translation.y -= zoom * movementY * 0.005;
    renderer.setTranslation(translation.x, translation.y);
    draw();
});

function draw() {
    renderer.clear();
    renderer.drawRect();
}

draw();


