'use client'

import { useMemo, useRef } from 'react'
import { InstancedMesh, Matrix4, Object3D } from 'three'
import { useFrame } from '@react-three/fiber'

interface MoneyFlowProps {
  intensity: number
}

export function MoneyFlow({ intensity }: MoneyFlowProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        offset: i * 0.3,
        radius: 1 + (i % 11) * 0.35,
      })),
    [],
  )

  useFrame(({ clock }) => {
    if (!meshRef.current || intensity < 0.05) return
    const dummy = new Object3D()
    const time = clock.getElapsedTime()

    particles.forEach((particle, index) => {
      const t = (time * (0.8 + intensity) + particle.offset) % 10
      dummy.position.set(
        Math.sin(t + particle.offset) * particle.radius,
        -3 + t * 0.8,
        -28 + Math.cos(t * 0.5 + particle.offset) * 2,
      )
      dummy.rotation.set(t, t * 0.7, t)
      dummy.scale.setScalar(0.08 + intensity * 0.08)
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(index, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#22c55e" emissive="#14532d" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}
