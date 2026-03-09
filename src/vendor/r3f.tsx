'use client'

import { ReactNode, createContext, useContext } from 'react'

const ThreeContext = createContext({ camera: { position: { z: 8 } } })

export function Canvas({ children }: { children: ReactNode; camera?: unknown }) {
  return <ThreeContext.Provider value={{ camera: { position: { z: 8 } } }}>{children}</ThreeContext.Provider>
}

export function useThree() {
  return useContext(ThreeContext)
}

export function useFrame(callback: (state: { clock: { getElapsedTime: () => number }; camera: { position: { z: number } }; scene: { traverse: (cb: (obj: any) => void) => void } }) => void) {
  callback({
    clock: { getElapsedTime: () => Date.now() / 1000 },
    camera: { position: { z: 8 } },
    scene: { traverse: () => undefined },
  })
}
