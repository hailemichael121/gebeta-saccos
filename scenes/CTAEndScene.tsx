"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SceneContainer } from "@/components/scene/SceneContainer"

interface CTAEndSceneProps {
  active: boolean
}

export function CTAEndScene({ active }: CTAEndSceneProps) {
  return (
    <SceneContainer active={active} className="bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">Join the next chapter of member-owned finance.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Become part of a cooperative built on trust, access, and measurable community outcomes.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg"><Link href="/auth/register">Join Now</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="/contact">Talk to us</Link></Button>
        </div>
      </div>
    </SceneContainer>
  )
}
