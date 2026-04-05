"use client"

import Link from "next/link"

export type SectionNavItem = { id: string; label: string }

export function SectionScrollRail({
  items,
  activeId,
  ariaLabel = "섹션 이동",
}: {
  items: SectionNavItem[]
  activeId: string
  ariaLabel?: string
}) {
  return (
    <aside
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block lg:w-56 xl:left-5 xl:w-64"
      aria-label={ariaLabel}
    >
      <div className="max-h-[min(560px,82vh)] overflow-y-auto overflow-x-hidden px-0.5 py-1 [scrollbar-width:thin]">
        <nav aria-label="페이지 섹션">
          <div className="relative pl-0.5">
            <div
              className="absolute left-[11px] top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-sky-300/90 via-slate-200 to-slate-200/90"
              aria-hidden
            />
            <ul className="space-y-1">
              {items.map(({ id, label }, index) => {
                const active = activeId === id
                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="group relative flex items-center gap-3 py-2 pl-1 pr-1.5 transition-colors"
                    >
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition ${
                          active
                            ? "border-sky-600 bg-sky-500 text-white"
                            : "border-slate-200 bg-transparent text-slate-400 group-hover:border-sky-400 group-hover:text-sky-700"
                        }`}
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`min-w-0 text-[15px] leading-snug tracking-[-0.02em] xl:text-base ${
                          active
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
