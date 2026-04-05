import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 요소의 문서 기준 top (스크롤 Y와 비교용). `offsetTop`은 offsetParent 기준이라 레이아웃에 따라 어긋남 */
export function documentOffsetTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

/**
 * 섹션 레일용 스크롤 스파이. 마지막 섹션이 짧을 때도 하단에서 활성화되도록 처리.
 */
export function activeSectionIdForScroll(
  ids: string[],
  opts: {
    beforeFirstPadding: number
    markerRatio?: number
    endOfPageSlack?: number
  },
): string {
  const markerRatio = opts.markerRatio ?? 0.32
  const endSlack = opts.endOfPageSlack ?? 80

  if (ids.length === 0) return ''
  const first = document.getElementById(ids[0])
  if (!first) return ''

  if (window.scrollY < documentOffsetTop(first) - opts.beforeFirstPadding) return ''

  const lastId = ids[ids.length - 1]
  const last = document.getElementById(lastId)
  const scrollBottom = window.scrollY + window.innerHeight
  const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  if (last && scrollBottom >= docHeight - endSlack) return lastId

  const marker = window.scrollY + window.innerHeight * markerRatio
  let current = ids[0]
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue
    if (documentOffsetTop(el) <= marker) current = id
  }
  return current
}
