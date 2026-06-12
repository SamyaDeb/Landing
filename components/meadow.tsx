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
      const height = rand() * 70 + 40
      // taller blades read as closer to the camera, so blur them more
      const blur = (height / 110) * 4 + rand() * 1.5 + 1
      return {
        left: `${rand() * 100}%`,
        height,
        width: rand() * 4 + 3,
        blur,
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
      const bottom = rand() * 40
      // lower flowers are closer/larger and more out of focus
      const blur = (1 - bottom / 40) * 5 + rand() * 1.5 + 1.5
      return {
        left: `${rand() * 100}%`,
        bottom: `${bottom}px`,
        size: rand() * 12 + 9,
        blur,
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
      {/* Soft out-of-focus bokeh haze pooling at the bottom edges for a
          shallow depth-of-field feel, matching the blurry foreground grass. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "radial-gradient(120% 90% at 8% 100%, oklch(0.7 0.13 95 / 0.28), transparent 55%), radial-gradient(120% 90% at 92% 100%, oklch(0.72 0.14 70 / 0.28), transparent 55%)",
          filter: "blur(28px)",
        }}
      />

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

      {/* grass blades — blurred for a shallow depth-of-field foreground */}
      {blades.map((b, i) => (
        <div
          key={`blade-${i}`}
          className="animate-sway absolute bottom-0"
          style={{
            left: b.left,
            filter: `blur(${b.blur}px)`,
            // @ts-expect-error custom props
            "--dur": b.dur,
            "--sway-min": b.min,
            "--sway-max": b.max,
            animationDelay: b.delay,
          }}
        >
          <div
            style={{
              width: b.width,
              height: b.height,
              borderRadius: "999px 999px 2px 2px",
              background: `linear-gradient(to top, transparent, ${b.hue})`,
            }}
          />
        </div>
      ))}

      {/* glowing flowers — soft bokeh orbs */}
      {flowers.map((fl, i) => (
        <div
          key={`flower-${i}`}
          className="animate-sway absolute"
          style={{
            left: fl.left,
            bottom: fl.bottom,
            filter: `blur(${fl.blur}px)`,
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
              boxShadow: `0 0 ${fl.size}px ${fl.size / 2}px ${fl.color}`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
