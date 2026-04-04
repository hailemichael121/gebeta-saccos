'use client'

interface VaultDoorProps {
  rotation: number
}

export function VaultDoor({ rotation }: VaultDoorProps) {
  return (
    <group position={[0, -1.2, -30]}>
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[8, 8, 0.5]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.6} />
      </mesh>
      <group position={[-3.8, 0, 0]} rotation={[0, rotation, 0]}>
        <mesh position={[3.8, 0, 0]}>
          <cylinderGeometry args={[4, 4, 0.6, 48]} />
          <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
