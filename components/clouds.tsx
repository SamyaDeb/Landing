"use client"

/**
 * Soft drifting clouds rendered with layered radial gradients so they read as
 * wispy night clouds rather than hard shapes. Each cloud drifts horizontally
 * at its own slow pace.
 */
export function Clouds() {
  const clouds = [
    { top: "8%", scale: 1, dur: "80s", delay: "-20s", opacity: 0.18 },
    { top: "18%", scale: 1.4, dur: "120s", delay: "-60s", opacity: 0.12 },
    { top: "4%", scale: 0.8, dur: "95s", delay: "-40s", opacity: 0.15 },
    { top: "28%", scale: 1.2, dur: "140s", delay: "-90s", opacity: 0.1 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="animate-cloud absolute left-0"
          style={{
            top: c.top,
            // @ts-expect-error custom prop
            "--dur": c.dur,
            animationDelay: c.delay,
          }}
        >
          <div
            style={{
              width: 320 * c.scale,
              height: 90 * c.scale,
              opacity: c.opacity,
              background:
                "radial-gradient(60px 40px at 30% 60%, rgba(200,215,255,1), transparent 70%)," +
                "radial-gradient(80px 50px at 55% 50%, rgba(210,220,255,1), transparent 72%)," +
                "radial-gradient(60px 38px at 75% 62%, rgba(190,205,255,1), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
