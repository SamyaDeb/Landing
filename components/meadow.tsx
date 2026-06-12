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
 * Foreground meadow layer. Uses a real, heavily out-of-focus photo of grass and
 * glowing wildflowers so it looks photographic rather than like CSS bars. Two
 * overlapping copies sway in opposite directions to fake a light wind, and
 * drifting fireflies are layered on top to keep the scene alive.
 */
export function Meadow() {
  const fireflies = useMemo(() => {
    const rand = seededRandom(321)
    return Array.from({ length: 22 }).map(() => ({
      left: `${rand() * 100}%`,
      bottom: `${rand() * 200 + 10}px`,
      dur: `${rand() * 4 + 4}s`,
      delay: `${rand() * 6}s`,
      size: rand() * 3 + 2,
    }))
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] overflow-hidden"
      aria-hidden="true"
    >
      {/* Back layer of grass — slightly larger, slower sway, faint softness for depth */}
      <div
        className="animate-grass-sway absolute inset-x-[-4%] bottom-0 h-full bg-cover bg-bottom"
        style={{
          backgroundImage: "url(/images/foreground-grass.png)",
          // @ts-expect-error custom props
          "--sway-min": "-1.2deg",
          "--sway-max": "1.2deg",
          "--dur": "9s",
          filter: "blur(1px)",
          opacity: 0.95,
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
        }}
      />

      {/* Front layer of grass — closer, sways the other way for parallax life */}
      <div
        className="animate-grass-sway-alt absolute inset-x-[-6%] bottom-0 h-full scale-105 bg-cover bg-bottom"
        style={{
          backgroundImage: "url(/images/foreground-grass.png)",
          // @ts-expect-error custom props
          "--sway-min": "-2deg",
          "--sway-max": "2deg",
          "--dur": "7s",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, black 50%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 92%)",
        }}
      />

      {/* fireflies floating over the grass */}
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
    </div>
  )
}
