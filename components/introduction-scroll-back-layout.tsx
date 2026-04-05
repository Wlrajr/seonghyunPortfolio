"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  DetailPageTopNav,
  detailFloatingBackTopClass,
  detailPageMainPaddingClass,
} from "@/components/detail-page-top-nav"
import { introductionCardClass } from "@/lib/introduction-ui"
import { SectionScrollRail, type SectionNavItem } from "@/components/section-scroll-rail"
import { activeSectionIdForScroll, cn } from "@/lib/utils"

const floatingBackClass =
  `fixed left-[max(1rem,env(safe-area-inset-left))] ${detailFloatingBackTopClass} z-[45] inline-flex max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-full border border-slate-200/70 bg-white/55 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition-[opacity,transform] duration-200 hover:border-sky-300/80 hover:bg-white/80 hover:text-sky-900`

export function IntroductionScrollBackLayout({
  title,
  sectionNav,
  children,
}: {
  title: string
  sectionNav: SectionNavItem[]
  children: ReactNode
}) {
  const [backLinkPinned, setBackLinkPinned] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const backLinkAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = backLinkAnchorRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setBackLinkPinned(false)
        } else {
          setBackLinkPinned(entry.boundingClientRect.top < 0)
        }
      },
      { threshold: 0, rootMargin: "0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const ids = sectionNav.map((s) => s.id)
    if (ids.length === 0) return

    const updateActive = () => {
      const next = activeSectionIdForScroll(ids, { beforeFirstPadding: 140 })
      setActiveSection((prev) => (prev === next ? prev : next))
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [sectionNav])

  return (
    <>
      <DetailPageTopNav
        items={sectionNav}
        drawerTitle="자기소개 목차"
        menuId="introduction-mobile-section-nav"
      />
      <Link
        href="/"
        tabIndex={backLinkPinned ? 0 : -1}
        aria-hidden={!backLinkPinned}
        className={cn(
          floatingBackClass,
          backLinkPinned
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate sm:whitespace-nowrap">포트폴리오로 돌아가기</span>
      </Link>
      {sectionNav.length > 0 ? (
        <SectionScrollRail items={sectionNav} activeId={activeSection} ariaLabel="자기소개 섹션 이동" />
      ) : null}
      <div
        className={cn(
          "relative px-4 sm:px-5 md:px-10 lg:px-12",
          detailPageMainPaddingClass,
        )}
      >
        <div className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6 md:space-y-8">
          <header className={introductionCardClass}>
            <div ref={backLinkAnchorRef}>
              <Link
                href="/"
                tabIndex={backLinkPinned ? -1 : undefined}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-sky-800"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                포트폴리오로 돌아가기
              </Link>
            </div>
            <h1 className="font-display mt-6 text-2xl font-semibold leading-snug tracking-[-0.03em] text-slate-900 sm:mt-8 sm:text-3xl md:mt-10 md:text-4xl">
              {title}
            </h1>
          </header>
          {children}
        </div>
      </div>
    </>
  )
}
