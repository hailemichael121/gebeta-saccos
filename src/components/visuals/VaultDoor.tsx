import { useMemo } from 'react'

type VaultDoorProps = {
  openness: number
}

export function VaultDoor({ openness }: VaultDoorProps) {
  const rotation = useMemo(() => -Math.PI * 0.85 * openness, [openness])

  return (
    <group position={[0, 0, -22]}>
      <mesh>
        <cylinderGeometry args={[3.3, 3.3, 0.35, 48]} />
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.25} />
      </mesh>
      <group position={[-3.2, 0, 0]} rotation={[0, rotation, 0]}>
        <mesh position={[3.2, 0, 0.28]}>
          <cylinderGeometry args={[3.1, 3.1, 0.35, 48]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
