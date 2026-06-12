import { Button } from "@/components/ui/button"
import { Starfield } from "@/components/starfield"
import { Clouds } from "@/components/clouds"
import { Meadow } from "@/components/meadow"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background photo of the starlit meadow scene */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/scene.png)" }}
        aria-hidden="true"
      />
      {/* Deep night gradient to blend the photo and lift the type */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.05 255 / 0.55) 0%, oklch(0.18 0.05 255 / 0.15) 35%, oklch(0.16 0.05 255 / 0.45) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Animated layers */}
      <Clouds />
      <Starfield />

      {/* Glowing x402 on the lit monitor screen (right side of the scene) */}
      <div className="absolute left-[68%] top-[72%] z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-monitor-glow select-none font-mono text-[clamp(0.8rem,1.6vw,1.5rem)] font-bold tracking-[0.3em] text-[oklch(0.4_0.06_60)]">
          x402
        </div>
      </div>

      {/* Hero copy */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center px-6 pt-40 text-center">
        <h1 className="animate-fade-up text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl lg:text-7xl">
          Where <span className="font-semibold">ideas bloom</span> under starlight.
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base"
          style={{ animationDelay: "0.15s" }}
        >
          We&apos;re building tools for thinkers, dreamers, and makers. In a world of noise, we
          design digital space for deep focus and meaningful creation.
        </p>

        <div className="animate-fade-up mt-10" style={{ animationDelay: "0.3s" }}>
          <Button
            size="lg"
            className="rounded-full bg-white/10 px-8 py-6 text-base font-medium text-foreground backdrop-blur-md ring-1 ring-white/25 transition-all hover:bg-white/20"
          >
            Start Creating
          </Button>
        </div>
      </div>

      {/* Foreground living meadow (wind, grass, flowers, fireflies) */}
      <Meadow />
    </section>
  )
}
