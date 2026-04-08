"use client"

import { type ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowUpRight,
  Calendar,
  Github,
  Home,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react"
import { Background3D } from "@/components/background-3d"
import { Reveal, RevealItem, RevealStagger } from "@/components/reveal"
import { SectionScrollRail } from "@/components/section-scroll-rail"
import { SectionDivider } from "@/components/section-divider"
import { TechStackShowcase } from "@/components/tech-stack-showcase"
import { projects } from "@/lib/projects"
import { activeSectionIdForScroll, cn } from "@/lib/utils"
import {
  educationHistory,
  introductionPreview,
  techStackCategories,
  trainingHistory,
  workHistory,
} from "@/lib/resume"

const profile = {
  name: "최성현",
  role: "Fullstack Developer Choi Seonghyeon",
  bio:
    "빠르게 구현해야 하는 순간에도 구조를 지키며 구현합니다.\n기능을 빠르게 만들더라도 확장 가능한 흐름을 먼저 설계합니다.\n사용자 경험 전체를 기준으로 화면과 동선을 다듬습니다.",
  address: "서울특별시 마포구 용강동 대흥로 6길 12 502호",
  birthDateLabel: "2003.02.05 (만 23세)",
  phone: "010-8665-7363",
  links: {
    github: "https://github.com/Wlrajr",
    email: "bri0205@naver.com",
  },
}
const heroDisplayName = "Seonghyun Choi"

const navTopLinkClass =
  "shrink-0 text-sm font-medium text-text-muted transition-colors hover:text-sky-900 md:text-[15px]"

const MotionLink = motion.create(Link)

/** Cover Letter 섹션 요약 하단 키워드 */
const coverLetterKeywordTags = [
  "도전정신",
  "Java/Spring",
  "풀스택",
] as const

const sectionRailNav: { id: string; label: string }[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "training", label: "Training" },
  { id: "introduction", label: "Cover Letter" },
]

const headerQuickNav = sectionRailNav.filter((s) =>
  ["skills", "projects", "introduction"].includes(s.id),
)

const sectionInner = "mx-auto w-full max-w-[1040px]"
const sectionY =
  "scroll-mt-[4.75rem] px-4 py-14 sm:scroll-mt-[5.25rem] sm:px-5 sm:py-20 md:scroll-mt-24 md:px-8 md:py-24 lg:px-10 lg:py-28"
const sectionLineClass =
  "mx-auto mt-4 h-px max-w-md bg-gradient-to-r from-transparent via-sky-700/80 to-cyan-600/50 to-transparent"

const timelineRailClass =
  "pointer-events-none absolute bottom-0 right-3 top-0 hidden w-px translate-x-1/2 bg-slate-200 sm:right-5 sm:block md:right-8 lg:right-10 xl:right-12"
const timelineDotClass =
  "absolute right-3 top-28 z-10 hidden h-3 w-3 translate-x-1/2 rounded-full border-2 border-white bg-sky-500 shadow-[0_0_0_3px_rgba(125,211,252,0.35)] sm:right-5 sm:top-32 sm:block sm:h-3.5 sm:w-3.5 sm:shadow-[0_0_0_4px_rgba(125,211,252,0.35)] md:right-8 lg:right-10 xl:right-12"
const sectionInnerTimeline = `${sectionInner} relative px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16`

function splitDetailLines(detail?: string): string[] {
  if (!detail?.trim()) return []
  const parts = detail.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
  return parts.length ? parts : [detail.trim()]
}

/** 경력·학력 공통 타임라인 궤도 (왼쪽 세로선) */
const resumeTimelineTrackClass =
  "pointer-events-none absolute left-3 top-2 bottom-2 w-px rounded-full bg-gradient-to-b from-sky-400 via-violet-400 to-slate-300/70 sm:left-4 md:left-5"

/** 타임라인 노드 점 (그라데이션) */
const resumeTimelineDotClass =
  "absolute left-3 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-br from-sky-500 to-violet-600 shadow-[0_0_0_3px_rgba(125,211,252,0.28)] sm:left-4 sm:top-7 sm:h-3.5 sm:w-3.5 sm:shadow-[0_0_0_4px_rgba(125,211,252,0.28)] md:left-5 md:top-8"

const resumeTimelineCardClass =
  "rounded-xl border border-slate-200/70 bg-white/88 p-4 shadow-sm ring-1 ring-sky-100/45 backdrop-blur-md sm:rounded-2xl sm:p-5 md:p-6"

const resumeTypeBadgeClass =
  "mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-sky-600/18 via-violet-600/14 to-sky-600/12 px-3 py-1 text-xs font-semibold tracking-wide text-sky-950 ring-1 ring-sky-300/55"

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.04em] text-text-heading text-shadow-crisp sm:text-2xl md:text-[clamp(1.5rem,2.8vw,2rem)] md:leading-tight">
      {children}
    </h2>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const footerYear = new Date().getFullYear()
  const githubLabel = profile.links.github.replace(/^https?:\/\//, "").replace(/^www\./, "")

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const ids = sectionRailNav.map((s) => s.id)
    const updateActive = () => {
      const next = activeSectionIdForScroll(ids, { beforeFirstPadding: 96 })
      setActiveSection((prev) => (prev === next ? prev : next))
    }
    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [])

  return (
    <div className="min-h-screen isolate overflow-x-hidden text-foreground">
      <Background3D />

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-300/80 bg-white/40 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${sectionInner} flex items-center justify-between gap-3 px-4 py-2.5 md:px-8 md:py-3.5`}
        >
          <motion.div whileHover={{ opacity: 0.92 }} whileTap={{ scale: 0.99 }} className="min-w-0 shrink">
            <Link
              href="/"
              className="inline-flex min-w-0 flex-wrap items-baseline gap-x-0 gap-y-0.5 rounded-lg font-display text-sm font-semibold tracking-[-0.03em] text-text-heading outline-none ring-sky-400/0 transition focus-visible:ring-2 focus-visible:ring-sky-500/80 sm:text-base md:text-lg"
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(false)
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.history.replaceState(null, "", "/")
              }}
            >
              <span className="truncate">{profile.name}</span>
              <span className="mx-1.5 text-slate-300 sm:mx-2" aria-hidden>
                ·
              </span>
              <span className="font-normal text-text-subtle">Portfolio</span>
            </Link>
          </motion.div>
          <div className="hidden items-center gap-5 lg:flex lg:gap-7">
            {headerQuickNav.map(({ id, label }) => (
              <motion.span key={id} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Link href={`#${id}`} className={navTopLinkClass}>
                  {label}
                </Link>
              </motion.span>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white/70 text-text-body shadow-sm backdrop-blur-md transition hover:border-sky-300/80 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 lg:hidden"
            aria-expanded={mobileNavOpen}
            aria-controls="site-mobile-nav"
            aria-label={mobileNavOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            {mobileNavOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </motion.div>
      </nav>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden" id="site-mobile-nav" role="dialog" aria-modal="true" aria-label="사이트 메뉴">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            aria-label="메뉴 닫기"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,19rem)] flex-col border-l border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/90">
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
              <span className="font-display text-sm font-semibold text-text-heading">섹션 이동</span>
              <button
                type="button"
                className="rounded-lg p-2 text-text-muted transition hover:bg-slate-100 hover:text-text-heading"
                aria-label="메뉴 닫기"
                onClick={() => setMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-4" aria-label="페이지 섹션">
              {sectionRailNav.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className="rounded-xl px-4 py-3.5 text-[15px] font-medium text-text-body transition hover:bg-gradient-to-r hover:from-sky-50 hover:to-violet-50 hover:text-sky-900"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div className="relative w-full min-w-0">
        <SectionScrollRail items={sectionRailNav} activeId={activeSection} />
        <div className="w-full min-w-0">
      <section className="relative flex min-h-[88svh] min-h-[88vh] flex-col justify-center px-4 pb-24 pt-[4.25rem] sm:px-6 sm:pb-28 sm:pt-20 md:px-10 md:pb-32 md:pt-24 lg:px-12">
        <div className={sectionInner}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
            }}
            className="mx-auto w-full max-w-[900px]"
          >
            <div className="bg-transparent">
              <div className="px-4 py-[80px] sm:px-8 sm:py-[90px] lg:px-[80px] lg:py-[100px]">
                {/* Left: text + actions */}
                <div className="mx-auto min-w-0 max-w-[680px] text-center">
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="font-display text-[clamp(2.25rem,4.2vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#4F6EF7]"
                  >
                    Full Stack Developer
                  </motion.p>

                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="mt-5 font-display text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#1e293b] sm:text-[22px]"
                  >
                    {heroDisplayName}
                  </motion.h1>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="mt-7 max-w-[680px] whitespace-pre-line text-[14px] font-medium leading-[1.8] text-[#334155] sm:text-[15px]"
                  >
                    {profile.bio}
                  </motion.p>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="mt-12 flex flex-col items-center gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6"
                  >
                    <Link
                      href={profile.links.github}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4F6EF7] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_-18px_rgba(79,110,247,0.55)] transition hover:brightness-110"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      GitHub
                    </Link>
                    <Link
                      href={`mailto:${profile.links.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F6EF7] underline decoration-[#4F6EF7]/40 underline-offset-4 transition hover:decoration-[#4F6EF7]/80"
                    >
                      <Mail className="h-4 w-4" aria-hidden />
                      Email
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator: flow layout (no overlap) */}
        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-subtle">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="h-4 w-4 text-text-subtle" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <SectionDivider />

      <section id="about" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>About Me</SectionTitle>
              <div className={sectionLineClass} />
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 text-center sm:mt-12 md:mt-14 md:grid-cols-[minmax(180px,220px)_1fr] md:items-start md:gap-8 md:text-left lg:grid-cols-[minmax(200px,240px)_1fr] lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md ring-1 ring-slate-100 sm:max-w-[236px]">
                  <Image
                    src="/about-profile.png"
                    alt={`${profile.name} 프로필 사진`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 220px, 236px"
                    priority
                  />
                </div>
              </motion.div>
              <div className="min-w-0 pt-0.5 md:text-left">
                <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-text-heading sm:text-2xl">{profile.name}</h3>
                <ul className="mt-5 space-y-3.5 text-left text-[14px] leading-relaxed text-text-body sm:mt-6 sm:space-y-3.5 sm:text-[15px] sm:leading-relaxed md:text-base">
                  <li className="flex justify-start gap-2.5 sm:gap-3 md:justify-start">
                    <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-800 sm:h-5 sm:w-5" aria-hidden />
                    <a
                      href={`mailto:${profile.links.email}`}
                      className="min-w-0 break-all text-text-body underline decoration-slate-300 underline-offset-4 transition hover:text-sky-900 hover:decoration-sky-400 sm:break-normal"
                    >
                      {profile.links.email}
                    </a>
                  </li>
                  <li className="flex justify-start gap-2.5 sm:gap-3 md:justify-start">
                    <Home className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-800 sm:h-5 sm:w-5" aria-hidden />
                    <span className="break-words">{profile.address}</span>
                  </li>
                  <li className="flex justify-start gap-2.5 sm:gap-3 md:justify-start">
                    <Calendar className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-800 sm:h-5 sm:w-5" aria-hidden />
                    <span>{profile.birthDateLabel}</span>
                  </li>
                  <li className="flex justify-start gap-2.5 sm:gap-3 md:justify-start">
                    <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-800 sm:h-5 sm:w-5" aria-hidden />
                    <a href={`tel:${profile.phone.replace(/-/g, "")}`} className="text-text-body underline decoration-slate-300 underline-offset-4 transition hover:text-sky-900 hover:decoration-sky-400">
                      {profile.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section id="skills" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>Tech Stack</SectionTitle>
              <div className={sectionLineClass} />
            </div>
          </Reveal>
          <Reveal delay={0.06} className="mx-auto block max-w-5xl">
            <TechStackShowcase categories={techStackCategories} />
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section id="projects" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal className="text-center">
            <SectionTitle>Projects</SectionTitle>
            <div className={sectionLineClass} />
            <p className="mt-4 font-mono text-sm text-text-subtle">총 {projects.length}개</p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-10 md:mt-12 md:space-y-12">
            {projects.map((project, index) => {
              const archLine = project.tech.join(" → ")
              const cardHeading = project.listingTitle ?? project.title

              return (
                <Reveal key={project.id}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="mx-auto w-full overflow-hidden rounded-xl border border-slate-200/90 bg-white/90 shadow-sm ring-1 ring-slate-100/85 backdrop-blur-sm"
                  >
                    <div className="flex flex-col">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group relative block aspect-video w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50/50 ring-1 ring-inset ring-slate-200/40 transition hover:ring-sky-200/60"
                      >
                        <span className="sr-only">{cardHeading} 상세 보기</span>
                        <Image
                          src={project.heroImage}
                          alt={project.heroImageAlt}
                          fill
                          className="object-contain object-center p-3 transition duration-300 group-hover:scale-[1.02] sm:p-4 md:p-5"
                          sizes="(max-width: 768px) 100vw, 720px"
                          priority={index === 0}
                        />
                      </Link>

                      <div className="flex flex-col px-5 py-4 text-center sm:px-6 sm:py-4 md:text-left">
                        <p className="font-mono text-xs font-medium tracking-widest text-text-subtle sm:text-sm">
                          Project {project.id}
                        </p>
                        <h3 className="font-display mt-2 text-lg font-bold tracking-[-0.03em] text-text-heading sm:text-xl">
                          {cardHeading}
                        </h3>
                        <p className="mt-3 text-[15px] leading-snug text-text-muted sm:text-[16px] sm:leading-relaxed">
                          {project.summary}
                        </p>

                        <div className="mt-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-subtle">Architecture</p>
                          <p className="mt-1.5 font-mono text-xs leading-relaxed text-text-body sm:text-sm">{archLine}</p>
                        </div>

                        <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:py-2"
                          >
                            상세 보기
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                          <a
                            href={project.presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-text-body transition hover:border-sky-400 hover:text-sky-900 sm:w-auto sm:py-2"
                          >
                            발표 자료 (PPT)
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="experience" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>Work Experience</SectionTitle>
              <div className={sectionLineClass} />
            </div>
          </Reveal>

          {workHistory.length === 0 ? (
            <Reveal>
              <p className="mx-auto mt-12 max-w-xl text-center text-[18px] leading-relaxed text-text-muted">
                직장 경력은 아직 없습니다. 교육과 프로젝트 섹션에서 준비 과정을 확인하실 수 있습니다.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <div className="relative mx-auto mt-8 max-w-2xl sm:mt-10 md:mt-12 md:max-w-3xl">
                <div className={resumeTimelineTrackClass} aria-hidden />
                <ul className="relative m-0 list-none space-y-6 p-0 sm:space-y-8 md:space-y-10">
                  {workHistory.map((row) => (
                    <li key={`${row.company}-${row.period}`} className="relative pl-8 sm:pl-10 md:pl-12">
                      <span className={resumeTimelineDotClass} aria-hidden />
                      <motion.div
                        whileHover={{
                          y: -6,
                          boxShadow:
                            "0 22px 48px -14px rgba(56, 189, 248, 0.14), 0 12px 28px -12px rgba(139, 92, 246, 0.1)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className={resumeTimelineCardClass}
                      >
                        <p className="font-mono text-[13px] font-medium tracking-wide text-text-subtle md:text-sm">
                          {row.period}
                        </p>
                        <h3 className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em] text-text-heading md:text-xl">
                          {row.company}
                        </h3>
                        <span className={resumeTypeBadgeClass}>{row.position}</span>
                        {row.detail ? (
                          <div className="mt-4 border-t border-slate-200/60 pt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-800">
                              업무 내용
                            </p>
                            <ul className="list-none space-y-2 text-[15px] leading-relaxed text-text-muted md:text-base">
                              {splitDetailLines(row.detail).map((line) => (
                                <li key={line} className="flex gap-2.5">
                                  <span
                                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-violet-500"
                                    aria-hidden
                                  />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <SectionDivider />

      <section id="education" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>Education</SectionTitle>
              <div className={sectionLineClass} />
            </div>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto mt-8 max-w-2xl sm:mt-10 md:mt-12 md:max-w-3xl">
              <div className={resumeTimelineTrackClass} aria-hidden />
              <ul className="relative m-0 list-none space-y-6 p-0 sm:space-y-8 md:space-y-10">
                {educationHistory.map((row) => (
                  <li key={`${row.school}-${row.period}`} className="relative pl-8 sm:pl-10 md:pl-12">
                    <span className={resumeTimelineDotClass} aria-hidden />
                    <motion.div
                      whileHover={{
                        y: -6,
                        boxShadow:
                          "0 22px 48px -14px rgba(56, 189, 248, 0.14), 0 12px 28px -12px rgba(139, 92, 246, 0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      className={resumeTimelineCardClass}
                    >
                      <p className="font-mono text-[13px] font-medium tracking-wide text-text-subtle md:text-sm">
                        {row.period}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em] text-text-heading md:text-xl">
                        {row.school}
                      </h3>
                      <p className="mt-3 bg-gradient-to-r from-sky-800 via-violet-800 to-sky-800 bg-clip-text text-[15px] font-semibold leading-snug text-transparent md:text-base">
                        {row.major}
                      </p>
                      {row.detail ? (
                        <p className="mt-4 border-t border-slate-200/60 pt-4 text-[15px] leading-relaxed text-text-muted md:text-base">
                          {row.detail}
                        </p>
                      ) : null}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section id="training" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>Training</SectionTitle>
              <div className={sectionLineClass} />
            </div>
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:grid-cols-2">
            {trainingHistory.map((row) => (
              <Reveal key={`${row.organization}-${row.period}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="flex h-full flex-col items-center gap-5 rounded-2xl border border-slate-200/90 bg-white/80 p-6 text-center shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm md:p-8"
                >
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-slate-200/70 ${
                      row.logoSrc ? "bg-white" : "bg-gradient-to-br from-sky-100 to-cyan-50 text-lg font-bold text-sky-950 ring-sky-300/70"
                    }`}
                  >
                    {row.logoSrc ? (
                      <Image
                        src={row.logoSrc}
                        alt=""
                        width={56}
                        height={56}
                        className="object-contain p-1.5"
                        sizes="56px"
                      />
                    ) : (
                      row.organization.slice(0, 1)
                    )}
                  </div>
                  <div className="mx-auto min-w-0 w-full max-w-md">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text-heading">{row.organization}</h3>
                    <p className="mt-2 text-[15px] leading-snug text-text-muted">{row.course}</p>
                    <p className="mt-4 font-mono text-sm text-text-subtle">{row.period}</p>
                    {row.detail ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-text-muted sm:text-[16px] md:text-[17px]">{row.detail}</p>
                    ) : null}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="introduction" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <SectionTitle>Cover Letter</SectionTitle>
              <div className={sectionLineClass} />
            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-10 md:mt-14">
              <div className="space-y-6 text-center text-[16px] font-normal leading-[1.8] tracking-[0.01em] text-[#444] sm:text-[17px] md:text-[18px]">
                {introductionPreview.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul
                className="mt-6 flex list-none flex-wrap justify-center gap-2 p-0"
                role="list"
                aria-label="자기소개 키워드"
              >
                {coverLetterKeywordTags.map((tag, i) => (
                  <li key={tag}>
                    <span
                      className={cn(
                        "inline-block rounded-full px-4 py-1.5 text-sm font-medium",
                        i % 2 === 0
                          ? "border border-sky-400/55 bg-sky-500/[0.14] text-sky-900"
                          : "border border-violet-400/55 bg-violet-500/[0.14] text-violet-900",
                      )}
                    >
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center sm:mt-10">
              <MotionLink
                href="/introduction"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-text-heading sm:gap-3 sm:text-base"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <span className="relative">
                  전체 자기소개 보러가기
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-100 bg-gradient-to-r from-sky-700 to-cyan-600 transition-transform duration-300 group-hover:scale-x-110" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-sky-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MotionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section id="contact" className={`${sectionY} relative`}>
        <div className={timelineRailClass} aria-hidden />
        <div className={timelineDotClass} aria-hidden />
        <div className={sectionInnerTimeline}>
          <Reveal>
            <div className="text-center">
              <h2 className="font-display mx-auto max-w-2xl text-lg font-medium leading-snug tracking-[-0.04em] text-text-heading text-shadow-crisp sm:text-xl md:text-[clamp(1.35rem,3.2vw,2rem)] md:leading-tight">
                함께 이야기를 나누고 싶다면
                <br />
                <span className="font-bold">편하게 연락 주세요</span>
              </h2>
              <div className={sectionLineClass} />
            </div>
            <div className="mt-8 flex w-full max-w-lg flex-col items-center space-y-6 px-1 text-center sm:mt-10 sm:space-y-7 md:mt-12 md:max-w-none md:px-0">
              <Link
                href={`mailto:${profile.links.email}`}
                className="group inline-block max-w-full break-words px-1 font-display text-lg font-medium tracking-[-0.03em] text-text-heading transition-colors hover:text-sky-900 sm:text-xl md:text-2xl lg:text-3xl"
              >
                {profile.links.email}
                <span className="mx-auto mt-2 block h-px max-w-xs origin-center scale-x-0 bg-gradient-to-r from-sky-700 to-cyan-600 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              <a
                href={`tel:${profile.phone.replace(/-/g, "")}`}
                className="group flex max-w-full flex-col items-center font-display text-lg font-medium tracking-[-0.03em] text-text-heading transition-colors hover:text-sky-900 sm:text-xl md:text-2xl lg:text-3xl"
              >
                <span className="inline-flex flex-wrap items-center justify-center gap-2.5">
                  <Phone className="h-5 w-5 shrink-0 text-sky-800 sm:h-6 sm:w-6 md:h-7 md:w-7" aria-hidden />
                  {profile.phone}
                </span>
                <span className="mt-2 block h-px max-w-xs origin-center scale-x-0 bg-gradient-to-r from-sky-700 to-cyan-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
              <Link
                href={profile.links.github}
                target="_blank"
                className="group inline-flex max-w-full items-center gap-2 break-all text-sm text-text-subtle transition hover:text-text-heading sm:text-base md:text-[17px]"
              >
                {githubLabel}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-300/80 px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12">
        <Reveal y={10}>
          <div className={`${sectionInner} flex flex-col items-center justify-center gap-2 text-center text-xs text-text-subtle sm:gap-3 sm:text-sm md:flex-row md:gap-8`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]">
              &copy; {footerYear} {profile.name}
            </p>
            <p className="font-display max-w-[min(100%,20rem)] text-sm leading-snug text-text-body sm:max-w-none sm:text-base">
              Seoul · {profile.role.split(" ").slice(0, 2).join(" ")}
            </p>
          </div>
        </Reveal>
      </footer>
        </div>
      </div>
    </div>
  )
}
