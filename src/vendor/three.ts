export class Object3D {
  position = { set: () => undefined }
  rotation = { set: () => undefined }
  scale = { setScalar: () => undefined }
  updateMatrix() {}
  matrix = {}
}

export class Matrix4 {}
export class Group {}
export class Mesh {
  userData: Record<string, unknown> = {}
  position = { z: 0 }
  rotation = { z: 0 }
}
export class InstancedMesh {
  instanceMatrix = { needsUpdate: false }
  setMatrixAt() {}
}
