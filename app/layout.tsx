import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
})

/** OG·canonical 등 메타데이터 절대 URL 기준 (프로덕션 배포 도메인) */
const metadataBase = new URL('https://seonghyun-portfolio-two.vercel.app')

const ogImageAbsoluteUrl = new URL('/og-image.png', metadataBase).toString()

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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '최성현 포트폴리오',
    description: '신입 풀스택 개발자 최성현의 포트폴리오입니다.',
    images: [ogImageAbsoluteUrl],
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
