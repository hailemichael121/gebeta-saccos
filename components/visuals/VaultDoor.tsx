"use client"

interface VaultDoorProps {
  progress: number
}

export function VaultDoor({ progress }: VaultDoorProps) {
  const rotation = Math.min(progress * 96, 92)

  return (
    <div className="relative h-64 w-64 [perspective:900px]">
      <div className="absolute inset-0 rounded-full border-[18px] border-slate-500 bg-slate-700/70" />
      <div
        className="absolute inset-5 origin-left rounded-full border-8 border-slate-300 bg-slate-500 shadow-2xl transition-transform duration-100"
        style={{ transform: `rotateY(${-rotation}deg)` }}
      >
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-200" />
      </div>
    </div>
  )
}
