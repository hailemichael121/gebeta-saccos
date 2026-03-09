import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type MoneyFlowProps = {
  progress: number
}

const PARTICLES = 140

export function MoneyFlow({ progress }: MoneyFlowProps) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const buffer = new Float32Array(PARTICLES * 3)
    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3
      buffer[i3] = (Math.random() - 0.5) * 5
      buffer[i3 + 1] = Math.random() * 8 - 4
      buffer[i3 + 2] = -26 - Math.random() * 14
    }
    return buffer
  }, [])

  useFrame(({ clock }) => {
    if (!points.current) return
    const attrs = points.current.geometry.attributes.position as THREE.BufferAttribute
    const t = clock.getElapsedTime()

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3
      const baseY = positions[i3 + 1]
      attrs.array[i3] = Math.sin(t * 0.8 + i * 0.12) * 2
      attrs.array[i3 + 1] = ((baseY + t * 1.1 + progress * 10 + i * 0.02) % 10) - 5
      attrs.array[i3 + 2] = -26 + Math.cos(t * 0.5 + i) * 2
    }

    attrs.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fde047" size={0.09} transparent opacity={0.9} />
    </points>
  )
}
