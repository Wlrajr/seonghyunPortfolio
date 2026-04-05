"use client"

import { useEffect, useRef } from "react"

type Streak = {
  x: number
  y: number
  len: number
  speed: number
  opacity: number
  width: number
  color: string
}

const floatingShapes = [
  {
    className:
      "left-[-10vw] top-[5vh] h-[32rem] w-[32rem] rounded-[38%] border border-white/35 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.86),rgba(255,255,255,0.24)_18%,rgba(110,231,255,0.26)_42%,rgba(255,255,255,0.02)_72%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.48),0_45px_160px_rgba(56,189,248,0.24)] blur-[1px]",
    style: {
      ["--float-tilt" as string]: "rotateX(74deg) rotateY(-24deg) rotateZ(-18deg)",
      animationDuration: "11s",
    },
  },
  {
    className:
      "right-[1vw] top-[10vh] h-[22rem] w-[22rem] rounded-[32%] border border-white/32 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.84),rgba(251,191,36,0.2)_18%,rgba(244,114,182,0.22)_50%,rgba(255,255,255,0.04)_72%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.38),0_38px_130px_rgba(244,114,182,0.24)]",
    style: {
      ["--float-tilt" as string]: "rotateX(79deg) rotateY(32deg) rotateZ(22deg)",
      animationDuration: "9s",
    },
  },
  {
    className:
      "bottom-[7vh] left-[14vw] h-[15rem] w-[15rem] rounded-[30%] border border-white/28 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.72),rgba(255,255,255,0.14)_20%,rgba(129,140,248,0.28)_52%,rgba(255,255,255,0.03)_74%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.34),0_30px_100px_rgba(96,165,250,0.22)]",
    style: {
      ["--float-tilt" as string]: "rotateX(82deg) rotateY(-36deg) rotateZ(14deg)",
      animationDuration: "8s",
    },
  },
  {
    className:
      "bottom-[16vh] right-[16vw] h-[12rem] w-[12rem] rounded-[34%] border border-white/28 bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.76),rgba(255,255,255,0.12)_18%,rgba(250,204,21,0.28)_46%,rgba(251,146,60,0.18)_60%,rgba(255,255,255,0.04)_76%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.34),0_24px_90px_rgba(251,191,36,0.26)]",
    style: {
      ["--float-tilt" as string]: "rotateX(84deg) rotateY(18deg) rotateZ(-18deg)",
      animationDuration: "7s",
    },
  },
] as const

function useStreakCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = ["#67e8f9", "#7dd3fc", "#93c5fd", "#c4b5fd", "#f9a8d4", "#fdba74"]
    let streaks: Streak[] = []
    let raf = 0

    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const spawn = (w: number, h: number) => {
      const count = Math.min(180, Math.max(56, Math.floor((w * h) / 15000)))
      streaks = Array.from({ length: count }, () => ({
        x: Math.random() * (w + 400) - 200,
        y: Math.random() * (h + 400) - 200,
        len: 26 + Math.random() * 140,
        speed: reduced ? 0 : 1.6 + Math.random() * 2.8,
        opacity: 0.04 + Math.random() * 0.1,
        width: Math.random() > 0.75 ? 1.6 : 0.85,
        color: colors[Math.floor(Math.random() * colors.length)]!,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      spawn(w, h)
    }

    const angle = -Math.PI / 3.9

    const tick = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      for (const s of streaks) {
        ctx.strokeStyle = s.color
        ctx.globalAlpha = s.opacity
        ctx.lineWidth = s.width
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + cos * s.len, s.y + sin * s.len)
        ctx.stroke()

        if (!reduced) {
          s.x += cos * s.speed
          s.y += sin * s.speed
          if (s.x > w + 240) s.x = -280
          if (s.y > h + 240) s.y = -280
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return canvasRef
}

function CodeOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] select-none overflow-hidden opacity-[0.055] md:opacity-[0.07]"
      aria-hidden
    >
      <pre className="h-full overflow-hidden whitespace-pre p-6 pl-4 font-mono text-[9px] leading-relaxed text-slate-500 sm:p-10 sm:pl-6 sm:text-[10px] md:text-[11px]">
        <span className="text-fuchsia-400/90">&lt;html</span> <span className="text-sky-300/90">lang</span>=
        <span className="text-emerald-400/90">&quot;ko&quot;</span>
        <span className="text-fuchsia-400/90">&gt;</span>
        {"\n"}
        <span className="text-fuchsia-400/90">  &lt;body&gt;</span>
        {"\n"}
        <span className="text-sky-300/90">    &lt;main</span> <span className="text-sky-300/90">class</span>=
        <span className="text-emerald-400/90">&quot;min-h-screen&quot;</span>
        <span className="text-fuchsia-400/90">&gt;</span>
        {"\n"}
        <span className="text-amber-200/80">      &lt;!-- Spring Boot · React --&gt;</span>
        {"\n"}
        <span className="text-sky-300/90">      &lt;section</span> <span className="text-sky-300/90">id</span>=
        <span className="text-emerald-400/90">&quot;skills&quot;</span>
        <span className="text-fuchsia-400/90">&gt;</span>
        {"\n"}
        <span className="text-zinc-400">        const stack = [&apos;Java&apos;, &apos;Next.js&apos;, &apos;MySQL&apos;];</span>
        {"\n"}
        <span className="text-fuchsia-400/90">      &lt;/section&gt;</span>
        {"\n"}
        <span className="text-sky-300/90">      &lt;p&gt;</span>
        <span className="text-zinc-400"> portfolio · fullstack · REST </span>
        <span className="text-sky-300/90">&lt;/p&gt;</span>
        {"\n"}
        <span className="text-fuchsia-400/90">    &lt;/main&gt;</span>
        {"\n"}
        <span className="text-fuchsia-400/90">  &lt;/body&gt;</span>
        {"\n"}
        <span className="text-fuchsia-400/90">&lt;/html&gt;</span>
      </pre>
    </div>
  )
}

export function Background3D() {
  const canvasRef = useStreakCanvas()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#dde8f4] [perspective:1800px]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_18%),radial-gradient(circle_at_16%_18%,rgba(125,211,252,0.16),transparent_24%),radial-gradient(circle_at_84%_14%,rgba(250,204,21,0.12),transparent_20%),radial-gradient(circle_at_78%_64%,rgba(244,114,182,0.1),transparent_24%),radial-gradient(circle_at_28%_78%,rgba(129,140,248,0.12),transparent_26%),linear-gradient(180deg,#edf5fd_0%,#d6e5f2_38%,#cfe0ee_68%,#dde8f4_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 animate-drift-fast bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.14),transparent_20%),radial-gradient(circle_at_50%_36%,rgba(147,197,253,0.05),transparent_28%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "min(7vw, 82px) min(7vw, 82px)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.38), rgba(0,0,0,0.05) 34%, transparent 78%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0" aria-hidden>
        {floatingShapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute animate-float-3d ${shape.className}`}
            style={shape.style}
          />
        ))}
      </div>
      <div
        className="absolute left-[12vw] top-[22vh] h-[22rem] w-[38rem] rounded-full animate-drift-fast bg-[radial-gradient(circle,rgba(255,255,255,0.16)_0%,rgba(125,211,252,0.1)_28%,rgba(59,130,246,0.03)_56%,transparent_74%)] blur-3xl"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-[10vh] h-[30rem] w-[74rem] max-w-[130vw] -translate-x-1/2 rounded-full animate-drift-fast bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(125,211,252,0.12)_24%,rgba(14,165,233,0.04)_46%,transparent_74%)] blur-3xl"
        style={{ animationDelay: "-2s" }}
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-[34vh] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-sky-200/50 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_62%)] opacity-70 blur-[2px]"
        style={{ transform: "translateX(-50%) rotateX(80deg)" }}
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-[44vh] h-[54rem] w-[54rem] -translate-x-1/2 rounded-full border border-cyan-100/40 opacity-45"
        style={{ transform: "translateX(-50%) rotateX(82deg)" }}
        aria-hidden
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <CodeOverlay />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_26%,rgba(173,216,255,0.05)_72%,rgba(201,229,255,0.1)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_44%,rgba(147,197,253,0.05)_76%,rgba(125,211,252,0.09)_100%)]"
        aria-hidden
      />
    </div>
  )
}
