"use client"

type VaultDoorProps = {
  progress: number
}

export function VaultDoor({ progress }: VaultDoorProps) {
  const rotation = Math.min(progress * 95, 95)

  return (
    <div className="relative mx-auto h-48 w-48 rounded-full border-8 border-slate-600 bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl">
      <div
        className="absolute inset-0 origin-left rounded-full border-4 border-slate-500 bg-gradient-to-br from-slate-500 to-slate-700"
        style={{ transform: `perspective(800px) rotateY(${rotation}deg)` }}
      >
        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-300" />
      </div>
    </div>
  )
}
