import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

type FogLayerProps = {
  index: number
  progress: number
}

export function FogLayer({ index, progress }: FogLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    const baseZ = -index * 9 - progress * 36
    const wrappedZ = ((baseZ + 40) % 40) - 40
    meshRef.current.position.z = wrappedZ
    meshRef.current.position.x = Math.sin(progress * 8 + index) * 2
  })

  return (
    <mesh ref={meshRef} position={[0, index * 1.1 - 2, -index * 9]}>
      <planeGeometry args={[26, 10]} />
      <meshBasicMaterial color="#d8e9ff" transparent opacity={0.14} depthWrite={false} />
    </mesh>
  )
}
