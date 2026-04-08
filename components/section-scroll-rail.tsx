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
            <ul className="relative space-y-1">
              <span
                className="pointer-events-none absolute bottom-[18px] left-[22px] top-[18px] w-px bg-sky-600/85"
                aria-hidden
              />
              {items.map(({ id, label }, index) => {
                const active = activeId === id
                return (
                  <li key={id} className="relative">
                    <Link
                      href={`#${id}`}
                      className="group relative flex items-center gap-3 py-2 pl-1 pr-1.5 transition-colors"
                    >
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition ${
                          active
                            ? "border-sky-800 bg-sky-700 text-white shadow-[0_1px_3px_rgba(15,23,42,0.25)]"
                            : "border-slate-300 bg-white text-text-subtle shadow-[0_1px_2px_rgba(15,23,42,0.08)] group-hover:border-sky-500 group-hover:text-sky-900"
                        }`}
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`min-w-0 text-[15px] leading-snug tracking-[-0.02em] xl:text-base ${
                          active
                            ? "font-bold text-text-heading text-shadow-crisp"
                            : "font-medium text-text-muted group-hover:text-text-heading"
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
