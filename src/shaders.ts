
const vertSrc = `
precision highp float;

attribute vec2 a_coord;
attribute vec2 a_texCoord;

uniform vec2 u_scale;
uniform vec2 u_translation;

uniform float u_zoom;

varying vec2 v_texCoord;

void main() {
    float inverse = 1.0 / u_zoom;

    vec2 pos = (a_coord * u_scale + u_translation) * inverse;
    
    gl_Position = vec4(pos, 0.0, 1.0);
    v_texCoord = a_texCoord;
}
`;

const fragSrc = `
precision highp float;

varying vec2 v_texCoord;

vec2 complexPow2(vec2 number){
	return vec2(
		pow(number.x,2.0)-pow(number.y,2.0),
		2.0*number.x*number.y
	);
}

float mandelbrot(vec2 coord){
    const int maxIterations = 400;
    vec2 z = vec2(0,0);
	for(int i = 0; i < maxIterations; i++){
		z = complexPow2(z) + coord;
		if(length(z) > 2.0) return float(i)/float(maxIterations);
	}
	return float(maxIterations);
}

void main() {
    vec2 coord = 2.0 * v_texCoord - vec2(1.5, 1.0);
    float color = mandelbrot(coord);
    gl_FragColor = vec4(1.0 - color);
}
`;

export {
    vertSrc, fragSrc
}