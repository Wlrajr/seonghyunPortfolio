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
  Backend: "bg-violet-100 text-violet-900 ring-violet-300/80",
  Frontend: "bg-sky-100 text-sky-900 ring-sky-300/80",
  Database: "bg-emerald-100 text-emerald-900 ring-emerald-300/80",
  "Infra & DevOps": "bg-amber-100 text-amber-950 ring-amber-300/80",
  Tools: "bg-slate-100 text-text-body ring-slate-300/80",
}

/** 카테고리별 스킬 칩 */
const chipTone: Record<string, string> = {
  Backend: "bg-violet-50/98 text-violet-950 ring-violet-300/75 hover:bg-violet-100/95",
  Frontend: "bg-sky-50/98 text-sky-950 ring-sky-300/75 hover:bg-sky-100/95",
  Database: "bg-emerald-50/98 text-emerald-950 ring-emerald-300/75 hover:bg-emerald-100/95",
  "Infra & DevOps": "bg-amber-50/98 text-amber-950 ring-amber-300/75 hover:bg-amber-100/95",
  Tools: "bg-slate-50/98 text-text-heading ring-slate-300/80 hover:bg-slate-100/95",
}

export function TechStackShowcase({ categories }: { categories: StackCategory[] }) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:gap-6">
      {categories.map((cat, gi) => {
        const Icon = iconFor[cat.name] ?? Cpu
        const iconWrap = accentIcon[cat.name] ?? "bg-slate-100 text-slate-700 ring-slate-200/80"
        const chips = chipTone[cat.name] ?? "bg-slate-50/95 text-slate-900 ring-slate-200/80 hover:bg-slate-100/90"

        return (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px 32px 0px" }}
            transition={{ duration: 0.45, delay: gi * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="group flex h-full w-full min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/92 px-5 py-6 text-center shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm transition-shadow hover:shadow-md sm:w-[calc(50%-0.75rem)] sm:min-h-[210px] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconWrap}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-sm font-bold tracking-[-0.03em] text-text-heading text-shadow-crisp">{cat.name}</h3>
            </div>
            <ul
              className="mt-3 grid flex-1 content-start grid-cols-1 gap-x-2 gap-y-1.5 min-[400px]:grid-cols-2 sm:grid-cols-3"
              aria-label={cat.name}
            >
              {cat.items.map((item, si) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.08, margin: "0px 0px 24px 0px" }}
                  transition={{ duration: 0.35, delay: 0.03 * si + gi * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <span
                    className={`flex min-h-[2rem] w-full items-center justify-center rounded-lg px-2 py-1 text-center text-[11px] font-semibold leading-tight tracking-[-0.01em] text-text-body shadow-[0_1px_0_rgba(255,255,255,0.65),0_1px_2px_rgba(26,26,46,0.06)] ring-1 ring-inset transition-colors sm:text-xs ${chips}`}
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
