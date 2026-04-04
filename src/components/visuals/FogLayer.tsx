'use client'

import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { clamp01 } from '@/src/utils/easing'

interface FogLayerProps {
  intensity: number
}

export function FogLayer({ intensity }: FogLayerProps) {
  const layers = useMemo(() => Array.from({ length: 12 }, (_, index) => ({ index, x: (index % 4 - 1.5) * 7 })), [])

  useFrame(({ clock, camera, scene }) => {
    scene.traverse((object) => {
      if (object.userData.fogPlane) {
        const mesh = object as Mesh
        mesh.position.z += 0.02 + intensity * 0.08
        if (mesh.position.z > camera.position.z + 3) mesh.position.z = camera.position.z - 60
        mesh.rotation.z += 0.0008
      }
    })
  })

  return (
    <group>
      {layers.map(({ index, x }) => (
        <mesh
          key={index}
          userData={{ fogPlane: true }}
          position={[x, (index % 3) * 2 - 2, -index * 6]}
          rotation={[-Math.PI / 2.8, 0, 0]}
        >
          <planeGeometry args={[12, 9]} />
          <meshBasicMaterial color="#dff4ff" transparent opacity={clamp01(0.08 + intensity * 0.22)} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
