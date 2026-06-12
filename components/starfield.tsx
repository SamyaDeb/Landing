"use client"

import { useMemo } from "react"

type Star = {
  left: string
  top: string
  size: number
  dur: string
  delay: string
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function Starfield() {
  // Deterministic stars so SSR and client match.
  const stars = useMemo<Star[]>(() => {
    const rand = seededRandom(42)
    return Array.from({ length: 140 }).map(() => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 70}%`,
      size: rand() * 2 + 1,
      dur: `${rand() * 3 + 2}s`,
      delay: `${rand() * 5}s`,
    }))
  }, [])

  const shootingStars = useMemo(() => {
    const rand = seededRandom(7)
    return Array.from({ length: 4 }).map(() => ({
      left: `${rand() * 80 + 10}%`,
      dur: `${rand() * 6 + 7}s`,
      delay: `${rand() * 12}s`,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            // @ts-expect-error custom prop
            "--dur": star.dur,
            animationDelay: star.delay,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {shootingStars.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="animate-star-fall absolute h-[2px] w-[2px] rounded-full bg-white"
          style={{
            left: s.left,
            top: 0,
            // @ts-expect-error custom prop
            "--dur": s.dur,
            animationDelay: s.delay,
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.9), 0 0 40px 4px rgba(160,190,255,0.5)",
          }}
        />
      ))}
    </div>
  )
}
