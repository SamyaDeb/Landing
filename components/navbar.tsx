import Link from "next/link"
import { Button } from "@/components/ui/button"

const links = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="#home" className="flex items-center gap-1 text-xl font-medium tracking-tight text-foreground">
          Lunora
          <span className="text-xs text-muted-foreground">®</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          className="rounded-full border-white/25 bg-white/5 px-5 text-foreground backdrop-blur-sm hover:bg-white/10"
        >
          Start Creating
        </Button>
      </nav>
    </header>
  )
}
