

class Texture {
    private readonly gl: WebGLRenderingContext;
    private readonly texture: WebGLTexture;

    private constructor(gl: WebGLRenderingContext, texture: WebGLTexture) {
        this.gl = gl;
        this.texture = texture;
    }

    public static create(gl: WebGLRenderingContext, image: ImageData): Texture | null {
        const { width, height, data } = image;

        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const texture = gl.createTexture();

        if (texture == null) {
            return null
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            srcFormat,
            srcType,
            data
        );
    
        function isPowerOf2(value: number): boolean {
            return (value & (value - 1)) == 0;
        }
    
        if (isPowerOf2(width) && isPowerOf2(height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }
    
        return new Texture(gl, texture);
    }

    public update(image: ImageData) {
        const { width, height, data } = image;
        const { gl, texture }= this;

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
    
    public bind() {
        const { gl, texture } = this;
        gl.bindTexture(gl.TEXTURE_2D, texture);
    }
}


export { 
    Texture
}