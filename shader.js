const shaderProgram = InitShaderProgram(gl, vsSource, fsSource);
function InitShaderProgram(gl, source_vs, source_frag) {
    var shader_vs = loadShader(gl, gl.VERTEX_SHADER, source_vs);
    var shader_fg = loadShader(gl, gl.FRAGMENT_SHADER, source_fg);

    program = gl.createProgram();

    // attach shader to program
    gl.attachShader(program, shader_vs);
    gl.attachShader(program, shader_fg);

    var err = false;
    // link 
    if (gl.linkProgram(program) == 0) {
        console.log("gl.linkProrgam(program)");
        err = true;
    }

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    if (err) {
        Console.log(" failed to initialize");
        return false;
    }
    console.log("Initialize successful");
    return program;

}

const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
};


//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}