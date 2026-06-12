"use client"

import { useMemo } from "react"

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/**
 * Foreground layer that adds a sense of light wind: thin swaying grass blades,
 * little glowing flowers, and drifting fireflies layered over the bottom of the
 * hero photo so the meadow feels alive.
 */
export function Meadow() {
  const blades = useMemo(() => {
    const rand = seededRandom(99)
    return Array.from({ length: 46 }).map(() => {
      const min = -(rand() * 4 + 2)
      const max = rand() * 4 + 2
      return {
        left: `${rand() * 100}%`,
        height: rand() * 70 + 40,
        dur: `${rand() * 2.5 + 3}s`,
        delay: `${rand() * 4}s`,
        min: `${min}deg`,
        max: `${max}deg`,
        hue: rand() > 0.5 ? "oklch(0.55 0.12 140)" : "oklch(0.6 0.13 130)",
      }
    })
  }, [])

  const flowers = useMemo(() => {
    const rand = seededRandom(123)
    return Array.from({ length: 16 }).map(() => {
      const min = -(rand() * 6 + 3)
      const max = rand() * 6 + 3
      const palette = ["oklch(0.85 0.13 85)", "oklch(0.82 0.15 60)", "oklch(0.88 0.1 95)"]
      return {
        left: `${rand() * 100}%`,
        bottom: `${rand() * 40}px`,
        size: rand() * 10 + 8,
        dur: `${rand() * 2 + 3.5}s`,
        delay: `${rand() * 4}s`,
        min: `${min}deg`,
        max: `${max}deg`,
        color: palette[Math.floor(rand() * palette.length)],
      }
    })
  }, [])

  const fireflies = useMemo(() => {
    const rand = seededRandom(321)
    return Array.from({ length: 22 }).map(() => ({
      left: `${rand() * 100}%`,
      bottom: `${rand() * 180 + 10}px`,
      dur: `${rand() * 4 + 4}s`,
      delay: `${rand() * 6}s`,
      size: rand() * 3 + 2,
    }))
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden"
      aria-hidden="true"
    >
      {/* fireflies */}
      {fireflies.map((f, i) => (
        <span
          key={`fly-${i}`}
          className="animate-twinkle absolute rounded-full"
          style={{
            left: f.left,
            bottom: f.bottom,
            width: f.size,
            height: f.size,
            background: "oklch(0.9 0.14 90)",
            boxShadow: "0 0 8px 2px oklch(0.85 0.14 90 / 0.8)",
            // @ts-expect-error custom prop
            "--dur": f.dur,
            animationDelay: f.delay,
          }}
        />
      ))}

      {/* grass blades */}
      {blades.map((b, i) => (
        <div
          key={`blade-${i}`}
          className="animate-sway absolute bottom-0"
          style={{
            left: b.left,
            // @ts-expect-error custom props
            "--dur": b.dur,
            "--sway-min": b.min,
            "--sway-max": b.max,
            animationDelay: b.delay,
          }}
        >
          <div
            style={{
              width: 3,
              height: b.height,
              borderRadius: "999px 999px 2px 2px",
              background: `linear-gradient(to top, transparent, ${b.hue})`,
            }}
          />
        </div>
      ))}

      {/* glowing flowers */}
      {flowers.map((fl, i) => (
        <div
          key={`flower-${i}`}
          className="animate-sway absolute"
          style={{
            left: fl.left,
            bottom: fl.bottom,
            // @ts-expect-error custom props
            "--dur": fl.dur,
            "--sway-min": fl.min,
            "--sway-max": fl.max,
            animationDelay: fl.delay,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: fl.size,
              height: fl.size,
              background: fl.color,
              boxShadow: `0 0 10px 2px ${fl.color}`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
