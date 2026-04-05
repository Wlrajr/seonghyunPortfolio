"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  ExternalLink,
  FileSpreadsheet,
  Github,
  Lightbulb,
  Presentation,
  type LucideIcon,
} from "lucide-react"
import { Background3D } from "@/components/background-3d"
import {
  DetailPageTopNav,
  detailFloatingBackTopClass,
  detailPageMainPaddingClass,
} from "@/components/detail-page-top-nav"
import { SectionScrollRail } from "@/components/section-scroll-rail"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Project } from "@/lib/projects"
import {
  erpFeatureBlocks,
  erpRoadmapRows,
  erpRolesPlan,
  erpRolesTech,
  erpTroubleshooting,
  lmsFeatureBlocks,
  lmsRoadmapRows,
  lmsRolesPlan,
  lmsRolesTech,
  lmsTroubleshooting,
  type FeatureBlock,
  type RoleLine,
  type RoadmapRow,
  type TroubleItem,
} from "@/lib/project-detail-data"
import { erpGithubUrl, lmsyncDocsFolderUrl, notionProjectUrl } from "@/lib/project-links"
import { activeSectionIdForScroll, cn } from "@/lib/utils"

const detailSectionNav = [
  { id: "pd-overview", label: "프로젝트 개요" },
  { id: "pd-background", label: "배경 / 문제" },
  { id: "pd-architecture", label: "아키텍처" },
  { id: "pd-features", label: "주요 기능" },
  { id: "pd-roles", label: "맡은 역할" },
  { id: "pd-troubleshooting", label: "트러블슈팅" },
  { id: "pd-results", label: "결과 및 성과" },
  { id: "pd-roadmap", label: "개선 / 확장" },
] as const

/** 본문·히어로·Links 공통: 동일 max-width·가운데 정렬 (좌우 여백은 페이지 래퍼 px와 맞춤) */
const detailContentShell = "mx-auto w-full max-w-4xl"

const detailHero =
  "relative overflow-hidden border-y border-slate-200/80 bg-transparent py-6 shadow-none ring-0 sm:py-8 md:py-10"

function RevealSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setOn(true)
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  )
}

function RevealStagger({
  children,
  index,
  className,
}: {
  children: ReactNode
  index: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setOn(true)
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: on ? `${index * 100}ms` : "0ms" }}
      className={cn(
        "transition-all duration-500 ease-out",
        on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      className="border-l-4 border-sky-700 pl-3 font-display text-[22px] font-bold leading-tight tracking-[-0.03em] text-text-heading text-shadow-crisp"
    >
      {title}
    </h2>
  )
}

function BgProblemBlocks() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200/55 bg-white/85 p-5 shadow-none backdrop-blur-md">
        <p className="text-base font-semibold text-text-heading md:text-lg">
          여러 교육 기관에서 사용할 수 있는 통합 학사 관리 시스템 구축
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-muted">
          <li>기관 등록 기능을 통해 여러 학원을 통합적으로 관리 가능한 구조로 설계</li>
          <li>관리자, 강사, 수강생 권한에 따라 교육과정, 시험, 과제, 평가 기능을 유기적으로 운영</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200/55 bg-white/85 p-5 shadow-none backdrop-blur-md">
        <p className="text-base font-semibold text-text-heading md:text-lg">
          반응형 기반으로 사용자 경험에 맞춘 학사 서비스 제공
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-muted">
          <li>다양한 디바이스에서 접근 가능한 반응형 UI 제공</li>
          <li>직관적인 화면 구성과 메뉴 흐름으로 업무 이해도와 사용성 향상</li>
        </ul>
      </div>
    </div>
  )
}

function ArchitecturePanel({
  imageSrc,
  imageAlt,
  summary,
}: {
  imageSrc: string
  imageAlt: string
  summary: string
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/55 bg-slate-50/25 shadow-none backdrop-blur-md">
      <div className="relative aspect-[16/9] w-full bg-gradient-to-b from-slate-100/40 to-transparent">
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain p-4 md:p-6" priority />
      </div>
      <p className="border-t border-slate-200/80 px-5 py-4 text-sm italic text-text-muted">{summary}</p>
    </div>
  )
}

function FeatureZigzag({ blocks }: { blocks: FeatureBlock[] }) {
  return (
    <div className="relative mt-8">
      <div
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 md:block"
        aria-hidden
      />
      <div className="space-y-12 md:space-y-16">
        {blocks.map((block, i) => {
          const left = i % 2 === 0
          const Icon = block.Icon
          return (
            <RevealStagger key={block.title} index={i} className="relative">
              <div
                className={cn(
                  "flex flex-col gap-6 md:flex-row md:items-start",
                  left ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                <div className="flex-1 md:w-[calc(50%-2rem)]">
                  <div
                    className={cn(
                      "rounded-xl border-0 border-l-[3px] border-solid bg-white/82 py-4 pl-4 pr-4 shadow-none backdrop-blur-md transition-all duration-300 md:py-5 md:pl-5",
                      block.borderClass,
                    )}
                  >
                    <h3 className="font-display text-lg font-bold text-text-heading">{block.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {block.items.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-sky-800">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="relative z-10 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-sm md:absolute md:left-1/2 md:top-6 md:-translate-x-1/2"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-text-muted" />
                </div>
                <div className="hidden flex-1 md:block md:w-[calc(50%-2rem)]" aria-hidden />
              </div>
            </RevealStagger>
          )
        })}
      </div>
    </div>
  )
}

function RolesBlock({ tech, plan }: { tech: RoleLine[]; plan: RoleLine[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200/45 bg-white/78 p-6 shadow-none backdrop-blur-md md:p-10">
      <div className="mb-8">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold text-blue-600">
          <Code2 className="h-5 w-5" />
          기술 / 구현
        </p>
        <ul className="divide-y divide-[#E5E7EB]">
          {tech.map((row) => (
            <li key={row.num} className="py-4 text-sm leading-relaxed text-text-body md:text-base">
              <span className="font-mono text-text-subtle">{row.num}</span>{" "}
              <span className="font-bold text-text-heading">{row.keyword}</span>{" "}
              <span className="text-text-muted">{row.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm font-bold text-violet-600">
          <Lightbulb className="h-5 w-5" />
          설계 / 기획
        </p>
        <ul className="divide-y divide-[#E5E7EB]">
          {plan.map((row) => (
            <li key={row.num} className="py-4 text-sm leading-relaxed text-text-body md:text-base">
              <span className="font-mono text-text-subtle">{row.num}</span>{" "}
              <span className="font-bold text-text-heading">{row.keyword}</span>{" "}
              <span className="text-text-muted">{row.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StepBlock({
  emoji,
  label,
  borderClass,
  children,
}: {
  emoji: string
  label: string
  borderClass: string
  children: ReactNode
}) {
  return (
    <div className={cn("rounded-lg border-l-4 bg-slate-50/35 py-3 pl-4 pr-3 backdrop-blur-sm", borderClass)}>
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-body">
        <span aria-hidden>{emoji}</span>
        {label}
      </p>
      <div className="text-sm text-text-muted">{children}</div>
    </div>
  )
}

function TroubleList({ lines }: { lines: string[] }) {
  if (lines.length === 1 && !lines[0].includes("→")) {
    return <p>{lines[0]}</p>
  }
  return (
    <ul className="list-disc space-y-1 pl-4">
      {lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
  )
}

function TroubleshootingAccordion({ items }: { items: TroubleItem[] }) {
  return (
    <Accordion type="single" collapsible className="mt-6 w-full space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="overflow-hidden rounded-xl border border-slate-200/55 bg-white/85 px-4 shadow-none backdrop-blur-md"
        >
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex flex-1 flex-col items-start gap-2 text-left sm:flex-row sm:items-center sm:gap-3">
              <span className="font-semibold text-text-heading">{item.title}</span>
              <span className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-text-body"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pb-4">
              <StepBlock emoji="🔴" label="문제" borderClass="border-red-500">
                <TroubleList lines={item.problem} />
              </StepBlock>
              <StepBlock emoji="🟠" label="원인" borderClass="border-orange-500">
                <TroubleList lines={item.cause} />
              </StepBlock>
              <StepBlock emoji="🔵" label="해결" borderClass="border-blue-500">
                <TroubleList lines={item.solution} />
              </StepBlock>
              <StepBlock emoji="🟢" label="결과" borderClass="border-sky-500">
                <TroubleList lines={item.result} />
              </StepBlock>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function RoadmapRowCard({ row }: { row: RoadmapRow }) {
  const Arrow = () => (
    <div className="hidden shrink-0 items-center justify-center px-1 md:flex" aria-hidden>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-300/70 bg-sky-100/80 text-sky-800 shadow-sm backdrop-blur-sm">
        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
      </span>
    </div>
  )
  const Cell = ({
    step,
    title,
    accent,
    bullets,
  }: {
    step: string
    title: string
    accent: "slate" | "sky" | "cyan"
    bullets: string[]
  }) => {
    const accentBar = {
      slate: "border-l-slate-400",
      sky: "border-l-sky-500",
      cyan: "border-l-cyan-500",
    }
    const stepTone = {
      slate: "text-text-subtle",
      sky: "text-sky-900",
      cyan: "text-cyan-700",
    }
    return (
      <div
        className={cn(
          "flex-1 rounded-2xl border border-slate-200/55 border-l-[3px] bg-white/85 p-5 shadow-none backdrop-blur-md",
          accentBar[accent],
        )}
      >
        <p className={cn("text-xs font-bold uppercase tracking-wider", stepTone[accent])}>{step}</p>
        <h4 className="mt-2 font-display text-lg font-bold text-text-heading">{title}</h4>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="shrink-0 font-semibold text-sky-900 tabular-nums" aria-hidden>
                →
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className="mb-10 last:mb-0">
      <p className="mb-4 font-display text-base font-semibold text-text-body">{row.title}</p>
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <Cell step="01" title="현재 문제" accent="slate" bullets={row.problem.bullets} />
        <Arrow />
        <Cell step="02" title="개선 방향" accent="sky" bullets={row.direction.bullets} />
        <Arrow />
        <Cell
          step="03"
          title={row.thirdColumnTitle ?? "기대 효과"}
          accent="cyan"
          bullets={row.effect.bullets}
        />
      </div>
    </div>
  )
}

function LinkCard({
  href,
  title,
  icon: Icon,
  iconClass,
}: {
  href: string
  title: string
  icon: LucideIcon
  iconClass: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/60 bg-white/86 px-4 py-3.5 text-sm font-medium text-text-body shadow-none backdrop-blur-md transition-all hover:border-[#3B82F6] hover:bg-white/88"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", iconClass)}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="truncate">{title}</span>
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3B82F6]" />
    </a>
  )
}

function DetailSection({
  id,
  first,
  children,
}: {
  id: string
  first?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-slate-200/35 py-14 md:scroll-mt-32 md:py-20",
        first && "border-t-0 pt-2",
      )}
    >
      {children}
    </section>
  )
}

const backLinkFloatingClass =
  `fixed left-[max(1rem,env(safe-area-inset-left))] ${detailFloatingBackTopClass} z-[45] inline-flex max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-full border border-slate-200/70 bg-white/88 px-3.5 py-2 text-sm font-medium text-text-body shadow-sm backdrop-blur-xl transition-[opacity,transform] duration-200 hover:border-sky-300/80 hover:bg-white/80 hover:text-sky-900`

export function ProjectDetailView({ project }: { project: Project }) {
  const [activeSection, setActiveSection] = useState("")
  const [backLinkPinned, setBackLinkPinned] = useState(false)
  const backLinkAnchorRef = useRef<HTMLDivElement>(null)
  const projectName = project.title.includes("(") ? project.title.split("(")[0].trim() : project.title
  const isLms = project.id === "01"

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
    const ids = detailSectionNav.map((s) => s.id)
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
  }, [])

  const kpiLms = [
    { value: "3+", unit: "이슈", desc: "S3·Monaco·CORS 트러블슈팅 완료" },
    { value: "직접", unit: "업로드", desc: "Pre-signed URL로 브라우저→S3 안정화" },
    { value: "통합", unit: "학사", desc: "기관·과제·시험·학적 흐름 연결" },
  ]

  const kpiErp = [
    {
      value: "인증",
      unit: "일관",
      desc: "Spring Interceptor로 보호 URL 접근을 일원화해 세션 검증 누락·URL 직접 접근을 방지했습니다.",
    },
    {
      value: "중복",
      unit: "방지",
      desc: "근태 출근 처리에 트랜잭션·당일 기록 조회를 적용해 동일 일자 중복 저장을 막고 정합성을 확보했습니다.",
    },
    {
      value: "모듈",
      unit: "ERP",
      desc: "회원·직원·근태·게시·전자결재를 한 웹 시스템에 묶어 업무 흐름이 끊기지 않도록 구현했습니다.",
    },
  ]

  const resultsLmsLeft = [
    "Pre-signed URL로 업로드 구조를 개선해 서버 부하를 줄이고 대용량 업로드 안정성을 높였습니다.",
    "Monaco Editor 제출 데이터 직렬화 이슈를 해결해 코드 제출 실패 케이스를 줄였습니다.",
    "S3 CORS 설정을 정리해 브라우저 직접 업로드 흐름을 안정화했습니다.",
  ]
  const resultsLmsRight = [
    "기관/권한 기반으로 여러 교육기관이 사용할 수 있는 통합 학사 운영 구조를 구현했습니다.",
    "강의·과제·시험·학적부 등 운영 기능을 중심으로 학습/관리 흐름을 끊김 없이 연결했습니다.",
    "통계 시각화와 채점(루브릭) 기능을 통해 운영자가 현황을 빠르게 파악할 수 있게 했습니다.",
  ]
  const resultsLmsWide = [
    "요구사항 분석 → 설계 → 구현 → 발표 자료 제작까지 전 과정을 책임감 있게 수행했습니다.",
    "DTO–Entity 분리, Validation, 예외처리 중심으로 REST API 품질을 정리했습니다.",
    "Git/GitHub 브랜치 전략 기반으로 변경 이력을 관리하고 협업 충돌을 최소화했습니다.",
    "DB 모델링/ERD 기반으로 테이블 구조를 정리해 기능 확장에 대응 가능한 기반을 마련했습니다.",
  ]

  const resultsErpLeft = [
    "Interceptor를 도입해 로그인하지 않은 사용자의 보호 페이지 접근을 차단하고, 인증 검증을 한곳에서 관리할 수 있게 했습니다.",
    "근태 관리에서 중복 출근 기록 문제를 트랜잭션과 사전 조회 로직으로 해결해 데이터 무결성과 안정성을 높였습니다.",
    "JSP 화면과 Spring MVC·MyBatis 백엔드를 맞춰 로그인·회원·공지·근태 등 핵심 기능을 일관된 구조로 구현했습니다.",
  ]
  const resultsErpRight = [
    "엑셀·개별 도구에 흩어지기 쉬운 인사·근태·공지·결재를 하나의 ERP 웹 시스템에서 연속된 흐름으로 다룰 수 있게 했습니다.",
    "회원·직원 정보와 근태 기록을 연계해 관리자가 조직 단위로 현황을 파악하기 쉬운 구조를 마련했습니다.",
    "게시판과 전자결재로 사내 소통과 휴가·결재 요청·승인·반려 처리를 웹 기반으로 표준화했습니다.",
  ]
  const resultsErpWide = [
    "화면단 기획과 스토리보드 총괄을 포함해 요구사항 정리부터 구현·발표까지 프로젝트 전 과정에 참여했습니다.",
    "게시글 CRUD, 유효성 검사, 예외 처리로 잘못된 입력과 오류 상황을 줄이고 코드 가독성·유지보수성을 높였습니다.",
    "Google 지도·메일 API 연동으로 이메일 인증 등 실무에 가까운 외부 연동 경험을 쌓았습니다.",
    "Git/GitHub 형상관리로 변경 이력을 관리하고 협업 시 충돌을 줄이는 방식을 익혔습니다.",
  ]

  return (
    <div className="relative min-h-screen isolate overflow-x-hidden text-text-heading">
      <Background3D />
      <DetailPageTopNav
        items={[...detailSectionNav]}
        drawerTitle="프로젝트 섹션"
        rightLabel={
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-subtle">
            Project {project.id}
          </span>
        }
        menuId="project-detail-mobile-nav"
      />
      <SectionScrollRail items={[...detailSectionNav]} activeId={activeSection} ariaLabel="프로젝트 섹션 이동" />
      <Link
        href="/"
        tabIndex={backLinkPinned ? 0 : -1}
        aria-hidden={!backLinkPinned}
        className={cn(
          backLinkFloatingClass,
          backLinkPinned ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate sm:whitespace-nowrap">포트폴리오로 돌아가기</span>
      </Link>
      <div
        className={cn(
          "relative px-4 sm:px-5 md:px-8 lg:px-10 xl:px-12",
          detailPageMainPaddingClass,
        )}
      >
        <div className="mx-auto w-full max-w-6xl min-w-0">
          <RevealSection>
            <div
              className={cn(
                detailContentShell,
                "mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
              )}
            >
              <div ref={backLinkAnchorRef} className="min-w-0">
                <Link
                  href="/"
                  tabIndex={backLinkPinned ? -1 : undefined}
                  className="inline-flex max-w-full items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-sky-900"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  포트폴리오로 돌아가기
                </Link>
              </div>
              <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-text-subtle sm:text-xs sm:tracking-[0.16em]">
                Project {project.id}
              </div>
            </div>
          </RevealSection>

          <div className="grid gap-10 lg:grid-cols-[1.55fr,0.85fr] lg:gap-12">
            <div>
              <header className={detailHero}>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.12),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]"
                />
                <div className="relative z-10">
                  <div className={detailContentShell}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900 ring-1 ring-sky-200/70">
                        {projectName}
                      </span>
                      <span className="text-xs font-medium text-text-subtle">Project</span>
                    </div>

                    {isLms ? (
                      <>
                        <h1 className="font-display mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:mt-6 sm:text-3xl sm:leading-snug md:text-4xl lg:text-5xl">
                          무중단 통합 교육관 관리 시스템
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-5 sm:text-base md:text-lg">
                          통합 학사운영을 위한, 클라우드 기반 교육관 관리 프로그램
                        </p>
                      </>
                    ) : (
                      <>
                        <h1 className="font-display mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:mt-6 sm:text-3xl sm:leading-snug md:text-4xl lg:text-5xl">
                          {project.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-5 sm:text-base md:text-lg">
                          기업의 핵심 업무 프로세스를 통합 관리 플랫폼
                        </p>
                      </>
                    )}

                    <div className="relative mt-5 w-full sm:mt-6">
                      <div className="relative aspect-[2/1] w-full min-h-[11rem] overflow-hidden rounded-2xl border border-sky-200/50 bg-slate-200/40 shadow-none ring-1 ring-sky-100/40 sm:min-h-[13rem] md:aspect-[2.2/1] md:min-h-[15rem]">
                        {isLms ? (
                          <Image
                            src="/lmsync-logo.png"
                            alt="LMSync Logo"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) min(100vw, 896px), 896px"
                          />
                        ) : (
                          <Image
                            src="/erp-main.png"
                            alt="ERP 통합 업무 시스템 개념 일러스트"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) min(100vw, 896px), 896px"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <div className="mt-4 space-y-0">
                <DetailSection id="pd-overview" first>
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="프로젝트 개요" />
                    <p className="mt-6 max-w-3xl text-sm leading-7 text-text-muted md:text-base">{project.overview}</p>
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-background">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="프로젝트 배경 / 문제" />
                    {isLms ? (
                      <BgProblemBlocks />
                    ) : (
                      <div className="mt-6 rounded-2xl border border-slate-200/55 bg-white/85 p-6 shadow-none backdrop-blur-md">
                        <p className="text-sm leading-7 text-text-muted md:text-base">
                          기업에서는 인사정보, 근태관리, 공지사항 등 다양한 업무가 여러 시스템이나 엑셀로 분산 관리되는
                          경우가 많습니다. 이런 경우 데이터 관리가 비효율적이고 업무 처리 속도가 느려지는 문제가
                          있습니다. 이러한 문제를 해결하기 위해 업무 시스템을 통합 관리할 수 있는 ERP 시스템을 구현하게
                          되었습니다.
                        </p>
                      </div>
                    )}
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-architecture">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="시스템 아키텍처" />
                    {isLms ? (
                      <ArchitecturePanel
                        imageSrc="/lmsync-architecture.png"
                        imageAlt="LMSync 시스템 아키텍처 다이어그램"
                        summary="Front-End / Main-Back / File-Back로 역할을 분리해 확장성을 확보하고, 파일 업로드는 Amazon S3를 통해 처리합니다."
                      />
                    ) : (
                      <ArchitecturePanel
                        imageSrc="/erp-architecture.png"
                        imageAlt="ERP 시스템 아키텍처 다이어그램"
                        summary="JSP 기반 Front-End와 Spring MVC/MyBatis Back-End를 세션/JSON 통신으로 연결하고, MySQL을 중심으로 기업 업무 데이터를 통합 관리하는 구조입니다."
                      />
                    )}
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-features">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="주요 기능" />
                    <FeatureZigzag blocks={isLms ? lmsFeatureBlocks : erpFeatureBlocks} />
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-roles">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="내가 맡은 역할" />
                    <RolesBlock
                      tech={isLms ? lmsRolesTech : erpRolesTech}
                      plan={isLms ? lmsRolesPlan : erpRolesPlan}
                    />
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-troubleshooting">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="트러블슈팅" />
                    <TroubleshootingAccordion items={isLms ? lmsTroubleshooting : erpTroubleshooting} />
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-results">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="결과 및 성과" />
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-5 sm:items-stretch">
                      {(isLms ? kpiLms : kpiErp).map((k) => (
                        <div
                          key={k.desc}
                          className="flex h-full min-h-0 min-w-0 flex-col rounded-2xl border border-sky-200/50 bg-white/85 px-5 py-5 text-center shadow-none backdrop-blur-md sm:px-5 sm:py-6"
                        >
                          <p className="font-display text-2xl font-bold leading-tight tracking-tight text-text-heading sm:text-[1.625rem] md:text-[1.75rem]">
                            {k.value}
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-snug text-sky-800 md:text-[0.9375rem]">
                            {k.unit}
                          </p>
                          <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted md:text-[0.9375rem] md:leading-7">
                            {k.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    {isLms ? (
                      <div className="mt-10 grid gap-8 border-t border-blue-100/80 pt-10 md:grid-cols-2">
                        <div className="md:border-r md:border-blue-100/80 md:pr-8">
                          <ul className="space-y-3 text-sm leading-relaxed text-[#475569] md:text-base">
                            {resultsLmsLeft.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="shrink-0 text-sky-600">✓</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:pl-8">
                          <ul className="space-y-3 text-sm leading-relaxed text-[#475569] md:text-base">
                            {resultsLmsRight.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="shrink-0 text-sky-600">✓</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10 grid gap-8 border-t border-blue-100/80 pt-10 md:grid-cols-2">
                        <div className="md:border-r md:border-blue-100/80 md:pr-8">
                          <ul className="space-y-3 text-sm leading-relaxed text-[#475569] md:text-base">
                            {resultsErpLeft.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="shrink-0 text-sky-600">✓</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:pl-8">
                          <ul className="space-y-3 text-sm leading-relaxed text-[#475569] md:text-base">
                            {resultsErpRight.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="shrink-0 text-sky-600">✓</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {isLms ? (
                      <ul className="mt-8 grid gap-2 border-t border-blue-100/80 pt-8 text-sm leading-relaxed text-[#475569] md:grid-cols-2 md:text-base">
                        {resultsLmsWide.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="shrink-0 text-sky-600">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="mt-8 grid gap-2 border-t border-blue-100/80 pt-8 text-sm leading-relaxed text-[#475569] md:grid-cols-2 md:text-base">
                        {resultsErpWide.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="shrink-0 text-sky-600">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </RevealSection>
                </DetailSection>

                <DetailSection id="pd-roadmap">
                  <RevealSection className={detailContentShell}>
                    <SectionTitle title="개선점/확장 방향" />
                    <div className="mt-8">
                      {(isLms ? lmsRoadmapRows : erpRoadmapRows).map((row) => (
                        <RoadmapRowCard key={row.title} row={row} />
                      ))}
                    </div>
                  </RevealSection>
                </DetailSection>
              </div>
            </div>

            <aside className={cn("self-start", detailContentShell, "lg:sticky lg:top-28")}>
              <RevealSection>
                <div className="rounded-2xl border border-slate-200/55 bg-white/86 p-6 shadow-none backdrop-blur-md">
                  <h3 className="border-l-4 border-[#3B82F6] pl-3 font-display text-[22px] font-bold text-text-heading">
                    Links
                  </h3>
                  <div className="mt-6 space-y-3">
                    <LinkCard
                      href={project.presentationUrl}
                      title="발표 자료 (PPT)"
                      icon={Presentation}
                      iconClass="bg-red-50 text-red-600"
                    />
                    {isLms ? (
                      <LinkCard
                        href={lmsyncDocsFolderUrl}
                        title="문서 (Google Drive)"
                        icon={FileSpreadsheet}
                        iconClass="bg-sky-50 text-sky-800"
                      />
                    ) : null}
                    <LinkCard
                      href={isLms ? notionProjectUrl : erpGithubUrl}
                      title={isLms ? "Notion" : "GitHub"}
                      icon={isLms ? BookOpen : Github}
                      iconClass={
                        isLms ? "bg-violet-100 text-violet-900" : "bg-slate-900 text-white"
                      }
                    />
                  </div>
                </div>
              </RevealSection>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
