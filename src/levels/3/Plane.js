class Plane extends THREE.Mesh {
  constructor(dimensions, position, colour) {
    // Geometry

    var geometry = new THREE.PlaneGeometry(
      dimensions.width,
      dimensions.height,
      1,
      1
    );

    // Material

    var material = new THREE.MeshLambertMaterial({ color: colour });

    // Superclass constructor

    super(geometry, material);

    // Position

    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;

    // Orientation

    this.rotation.x = -0.5 * Math.PI;

    // Shadow

    this.receiveShadow = true;
    this.castShadow = true;

    // Methods

    this.rescale = function (x, y, z) {
      this.scale.x *= x;
      this.scale.y *= y;
      this.scale.z *= z;
    };

    this.translate = function (x, y, z) {
      this.position.x += x;
      this.position.y += y;
      this.position.z += z;
    };

    this.rotate = function (x, y, z) {
      this.rotation.x += x;
      this.rotation.y += y;
      this.rotation.z += z;
    };
  }
}

export default Plane;
