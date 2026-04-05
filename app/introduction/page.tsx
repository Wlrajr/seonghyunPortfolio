import type { Metadata } from "next"
import { Background3D } from "@/components/background-3d"
import { IntroductionScrollBackLayout } from "@/components/introduction-scroll-back-layout"
import { getIntroductionSectionNav, introductionCardClass } from "@/lib/introduction-ui"
import { introductionDetail, introductionPreview } from "@/lib/resume"

export const metadata: Metadata = {
  title: "자기소개서 | 최성현 포트폴리오",
  description: introductionPreview.slice(0, 120),
}

export default function IntroductionPage() {
  const sectionNav = getIntroductionSectionNav(introductionDetail.sections)

  return (
    <div className="relative min-h-screen isolate overflow-x-hidden text-slate-900">
      <Background3D />
      <IntroductionScrollBackLayout title={introductionDetail.title} sectionNav={sectionNav}>
        {introductionDetail.sections.map((section, idx) => (
          <article
            key={`${section.heading}-${idx}`}
            id={sectionNav[idx].id}
            className={`${introductionCardClass} scroll-mt-28 md:scroll-mt-32`}
          >
            <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-slate-900 md:text-xl">
              {section.heading}
            </h2>
            {section.lead ? (
              <p className="mt-4 border-l-[3px] border-sky-500 pl-4 text-base font-medium leading-8 text-slate-700 md:leading-8">
                {section.lead}
              </p>
            ) : null}
            <div
              className={`space-y-4 text-sm leading-8 text-slate-600 md:text-base md:leading-8 ${section.lead ? "mt-5" : "mt-4"}`}
            >
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </IntroductionScrollBackLayout>
    </div>
  )
}
