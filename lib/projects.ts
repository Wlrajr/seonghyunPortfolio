export type Project = {
  id: string
  slug: string
  heroImage: string
  heroImageAlt: string
  /** 상세·메타용 제목 */
  title: string
  /** 메인 Projects 카드 제목 (없으면 title 사용) */
  listingTitle?: string
  summary: string
  presentationUrl: string
  tech: string[]
  overview: string
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "lmsync",
    heroImage: "/lmsync-logo.png",
    heroImageAlt: "LMSync 로고",
    title: "LMSync (무중단 통합 교육관 관리 시스템)",
    summary:
      "React 기반 LMS 웹사이트 개발. 강의계획서/과제 CRUD, 통계 시각화, 실시간 코드 제출 UI, 루브릭 기반 채점 기능, AWS S3 파일 업로드 기능을 구현했습니다.",
    presentationUrl:
      "https://docs.google.com/presentation/d/16CwrsuYhUFW8FrK3T9VJVvpeG7_8eMGlS0YaRR1ctiI/edit?slide=id.p1#slide=id.p1",
    tech: [
      "React",
      "Nginx",
      "API Gateway",
      "Spring Boot Microservices",
      "JPA",
      "MySQL (RDBMS), AWS S3 (File Storage)",
    ],
    overview:
      "효율적인 학원 운영을 위한 React 기반 LMS 웹사이트입니다. 기존 LMS는 시스템이 통합이 되지 않고 각 학원마다 별도로 운영되어 사이트를 구축함에 있어 많은 비용과 시간이 듭니다. 하지만 LMSync를 통해 보다 빠르고 저렴하게 사이트를 구축할 수 있고 효율적인 운영을 가능하게 합니다.",
  },
  {
    id: "02",
    slug: "erp",
    heroImage: "/erp-main.png",
    heroImageAlt: "ERP 통합 업무 시스템 개념 일러스트",
    title: "3부상조 ERP",
    listingTitle: "3부상조 ERP (기업의 핵심 업무 프로세스를 통합 관리 플랫폼)",
    summary:
      "중소기업용 ERP 플랫폼 개발. 로그인/회원가입/이메일 인증 구현, 게시판 CRUD, 근태관리 기능을 담당했습니다.",
    presentationUrl:
      "https://docs.google.com/presentation/d/1zXo-Xgi_Rb43hI6E-sIIh2krU4U6NbAv/edit?slide=id.p1#slide=id.p1",
    tech: ["JSP", "Spring MVC", "Service Layer", "MyBatis", "MySQL"],
    overview:
      "인사 관리 시스템이 없는 중소기업을 위한 ERP 프로젝트입니다. 로그인, 공지, 게시판 등 핵심 업무 기능을 빠르게 사용할 수 있도록 구현했습니다.",
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null
}
