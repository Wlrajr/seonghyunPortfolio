"use client"

import { motion } from "framer-motion"
import { Cloud, Cpu, Database, Layers, Server, Wrench, type LucideIcon } from "lucide-react"
import type { StackCategory } from "@/lib/resume"

const iconFor: Record<string, LucideIcon> = {
  Backend: Server,
  Frontend: Layers,
  Database: Database,
  "Infra & DevOps": Cloud,
  Tools: Wrench,
}

const accentIcon: Record<string, string> = {
  Backend: "bg-violet-100 text-violet-700 ring-violet-200/80",
  Frontend: "bg-sky-100 text-sky-700 ring-sky-200/80",
  Database: "bg-emerald-100 text-emerald-700 ring-emerald-200/80",
  "Infra & DevOps": "bg-amber-100 text-amber-800 ring-amber-200/80",
  Tools: "bg-slate-100 text-slate-700 ring-slate-200/80",
}

/** 카테고리별 스킬 칩 */
const chipTone: Record<string, string> = {
  Backend: "bg-violet-50/95 text-violet-950 ring-violet-200/70 hover:bg-violet-100/90",
  Frontend: "bg-sky-50/95 text-sky-950 ring-sky-200/70 hover:bg-sky-100/90",
  Database: "bg-emerald-50/95 text-emerald-950 ring-emerald-200/70 hover:bg-emerald-100/90",
  "Infra & DevOps": "bg-amber-50/95 text-amber-950 ring-amber-200/70 hover:bg-amber-100/90",
  Tools: "bg-slate-50/95 text-slate-900 ring-slate-200/80 hover:bg-slate-100/90",
}

export function TechStackShowcase({ categories }: { categories: StackCategory[] }) {
  return (
    <div className="mt-12 grid justify-items-stretch gap-5 sm:gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {categories.map((cat, gi) => {
        const Icon = iconFor[cat.name] ?? Cpu
        const iconWrap = accentIcon[cat.name] ?? "bg-slate-100 text-slate-700 ring-slate-200/80"
        const chips = chipTone[cat.name] ?? "bg-slate-50/95 text-slate-900 ring-slate-200/80 hover:bg-slate-100/90"

        return (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: gi * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="group flex h-full w-full flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-4 text-center shadow-sm ring-1 ring-slate-100/70 backdrop-blur-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconWrap}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-sm font-semibold tracking-[-0.03em] text-slate-900">{cat.name}</h3>
            </div>
            <ul
              className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 sm:grid-cols-3"
              aria-label={cat.name}
            >
              {cat.items.map((item, si) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ duration: 0.35, delay: 0.03 * si + gi * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <span
                    className={`flex min-h-[2rem] w-full items-center justify-center rounded-lg px-2 py-1 text-center text-[11px] font-medium leading-tight tracking-[-0.01em] text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-inset transition-colors sm:text-xs ${chips}`}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )
      })}
    </div>
  )
}
