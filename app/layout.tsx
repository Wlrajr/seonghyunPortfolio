import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

function siteMetadataBase(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL)
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
