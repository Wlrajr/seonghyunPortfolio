"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import type { SectionNavItem } from "@/components/section-scroll-rail"
import { cn } from "@/lib/utils"

export function DetailPageTopNav({
  items,
  drawerTitle,
  rightLabel,
  menuId = "detail-mobile-section-nav",
}: {
  items: SectionNavItem[]
  drawerTitle: string
  rightLabel?: ReactNode
  menuId?: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-300/80 bg-white/40 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-8 md:py-3.5">
          <Link
            href="/"
            className="font-display min-w-0 shrink truncate text-sm font-semibold tracking-[-0.03em] text-slate-900 outline-none ring-sky-400/0 transition hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-500/80 sm:text-base"
          >
            포트폴리오
          </Link>
          {rightLabel ? (
            <div className="hidden min-w-0 flex-1 justify-end lg:flex">{rightLabel}</div>
          ) : null}
          {items.length > 0 ? (
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white/70 text-slate-800 shadow-sm backdrop-blur-md transition hover:border-sky-300/80 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "메뉴 닫기" : "섹션 메뉴 열기"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          ) : null}
        </div>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label={drawerTitle}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,19rem)] flex-col border-l border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/90">
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
              <span className="font-display text-sm font-semibold text-slate-900">{drawerTitle}</span>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="메뉴 닫기"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-4" aria-label={drawerTitle}>
              {items.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-[15px] font-medium text-slate-800 transition",
                    "hover:bg-gradient-to-r hover:from-sky-50 hover:to-violet-50 hover:text-sky-900",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}

/** 고정 상단 바 높이에 맞춘 본문 세로 패딩 */
export const detailPageMainPaddingClass =
  "pt-[4.25rem] pb-10 sm:pt-20 sm:pb-12 md:pb-14 md:pt-24 lg:pb-16"

/** 플로팅 뒤로가기 버튼이 상단 네비 아래에 오도록 */
export const detailFloatingBackTopClass =
  "top-[max(4.5rem,calc(env(safe-area-inset-top,0px)+3.25rem))]"
