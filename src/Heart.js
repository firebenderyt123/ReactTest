import * as THREE from "three";

export class Heart {

  constructor() {
    this.heartShape = new THREE.Shape();

    this.heartShape.moveTo( 25, 25 );
    this.heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    this.heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
    this.heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
    this.heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    this.heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    this.heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

    this.setExtrudeSettings({
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    });

    this.geometry = new THREE.ExtrudeGeometry( this.heartShape, this.extrudeSettings );

    this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshPhongMaterial() );
  }

  getShape() {
    return this.shape;
  }

  setExtrudeSettings(extrudeSettings) {
    this.extrudeSettings = extrudeSettings;
  }

  getExtrudeSettings() {
    return this.extrudeSettings;
  }

  getGeometry() {
    return this.geometry;
  }

  getMesh() {
    return this.mesh;
  }

  setGeometryScale(x, y, z) {
    return this.geometry.scale(x, y, z);
  }

}
