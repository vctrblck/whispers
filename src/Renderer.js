// Renderer.js ---

// Code:

class Renderer extends THREE.WebGLRenderer {
  constructor(container, colour, width, height) {
    super();

    this.setClearColor(colour, 1.0);
    this.setSize(width, height);
    this.shadowMap.enabled = true;
    this.shadowMap.type = THREE.PCFSoftShadowMap;

    container.append(this.domElement);
  }
}

export default Renderer;

// Renderer.js ends here
