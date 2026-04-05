import type { IntroductionSection } from "@/lib/resume"

export const introductionCardClass =
  "rounded-2xl border border-slate-200/85 bg-white/95 p-6 shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm md:p-8"

/** 자기소개 상세 섹션 앵커·사이드 레일용 (순서는 `introductionDetail.sections`와 동일) */
export function getIntroductionSectionNav(sections: IntroductionSection[]) {
  return sections.map((s, i) => ({
    id: `intro-${i}`,
    label: s.heading,
  }))
}
