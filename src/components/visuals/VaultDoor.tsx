"use client"

type VaultDoorProps = {
  progress: number
}

export function VaultDoor({ progress }: VaultDoorProps) {
  const rotation = Math.min(progress, 1) * 110

  return (
    <div className="relative h-48 w-48 [perspective:900px]">
      <div className="absolute inset-0 rounded-full border-8 border-slate-200 bg-slate-900/85" />
      <div
        className="absolute inset-1 origin-left rounded-full border-4 border-sky-300/70 bg-slate-700"
        style={{ transform: `rotateY(${-rotation}deg)` }}
      >
        <div className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-slate-200/80" />
      </div>
    </div>
  )
}
