import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

/**
 * OG 이미지 등 절대 URL의 호스트.
 * `VERCEL_URL`만 쓰면 배포별 임시 도메인(…-projects.vercel.app)이 들어가고,
 * 그 URL은 비공개 배포에서 401이 나와 카카오 등 미리보기가 비게 됩니다.
 * 프로덕션 고정 도메인은 `VERCEL_PROJECT_PRODUCTION_URL` 또는 `NEXT_PUBLIC_SITE_URL`을 씁니다.
 */
function siteMetadataBase(): URL {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (site) {
    return new URL(site)
  }
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (productionHost) {
    const origin = productionHost.startsWith('http')
      ? productionHost
      : `https://${productionHost}`
    return new URL(origin)
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }
  return new URL('http://localhost:3000')
}

const metadataBase = siteMetadataBase()
/** 스크래퍼 호환을 위해 OG·Twitter 이미지는 항상 절대 URL */
const siteUrl = metadataBase.origin
const ogImageUrl = `${siteUrl}/og-image.png`

/** 링크 미리보기(OG) — `public/og-image.png` */
const ogImage = {
  url: ogImageUrl,
  width: 394,
  height: 254,
  type: 'image/png',
} as const

export const metadata: Metadata = {
  metadataBase,
  title: '최성현 포트폴리오',
  description: '신입 풀스택 개발자 최성현의 포트폴리오입니다.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '최성현 포트폴리오',
    title: '최성현 포트폴리오',
    description: '신입 풀스택 개발자 최성현의 포트폴리오입니다.',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: '최성현 포트폴리오',
    description: '신입 풀스택 개발자 최성현의 포트폴리오입니다.',
    images: [ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
