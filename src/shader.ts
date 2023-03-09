class Shader {
    public readonly program: WebGLProgram;
    public readonly gl: WebGLRenderingContext;

    private constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.program = program;
        this.gl = gl;
    }

    public static create(gl: WebGLRenderingContext,vertSrc: string, fragSrc: string): Shader | null {

        const frag = gl.createShader(gl.FRAGMENT_SHADER);

        if (frag == null) {
            throw new Error("Failed to create fragment shader");
        }

        gl.shaderSource(frag, fragSrc);

        const vert = gl.createShader(gl.VERTEX_SHADER);
        if (vert == null) {
            return null;
        }

        gl.shaderSource(vert, vertSrc);

        const program = gl.createProgram();
        if (program == null) {
            return null;
        }

        function checkShader(shader: WebGLShader | null) {
            if (!gl.getShaderParameter(shader as WebGLShader, gl.COMPILE_STATUS))
                console.log(gl.getShaderInfoLog(shader as WebGLShader));
        }

        gl.compileShader(vert);
        gl.compileShader(frag);

        checkShader(vert);
        checkShader(frag);

        gl.attachShader(program, vert);
        gl.attachShader(program, frag);

        gl.linkProgram(program);

        return new Shader(gl, program);        
    } 

    public use(): void {
        this.gl.useProgram(this.program);
    }
}

export {
    Shader
}