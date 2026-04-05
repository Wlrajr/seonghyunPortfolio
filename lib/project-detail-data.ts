import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Building2,
  ClipboardList,
  FileQuestion,
  GraduationCap,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react"

export type FeatureBlock = {
  title: string
  borderClass: string
  Icon: LucideIcon
  items: string[]
}

export const lmsFeatureBlocks: FeatureBlock[] = [
  {
    title: "기관관리",
    borderClass: "border-l-blue-500",
    Icon: Building2,
    items: ["기관 등록 및 기관별 사용자 분리 관리", "다수 학원이 사용할 수 있는 구조 지원"],
  },
  {
    title: "회원관리",
    borderClass: "border-l-emerald-500",
    Icon: Users,
    items: ["기관 관리", "회원 등록, 로그인", "내 정보 수정 및 비밀번호 변경"],
  },
  {
    title: "권한관리",
    borderClass: "border-l-violet-500",
    Icon: Shield,
    items: ["사용자별 권한 설정 및 변경", "기능 접근 제어 (Spring Security 기반)"],
  },
  {
    title: "채팅",
    borderClass: "border-l-orange-500",
    Icon: MessageSquare,
    items: ["실시간 채팅 기능", "기관 내부 및 기관 간 권한 기반 커뮤니케이션"],
  },
  {
    title: "학적부",
    borderClass: "border-l-teal-500",
    Icon: BookOpen,
    items: ["과목별 학생 리스트 및 학습 데이터 확인", "진도 현황 및 수강 이력 확인"],
  },
  {
    title: "과정관리",
    borderClass: "border-l-pink-500",
    Icon: GraduationCap,
    items: ["신규 과목/과정 등록 흐름 구현", "강사 변경, 강의 관리, 수강 인원 등 운영 정보 관리"],
  },
  {
    title: "과제관리",
    borderClass: "border-l-yellow-500",
    Icon: ClipboardList,
    items: ["과제 등록 및 제출", "채점 및 피드백 기능", "점수 관리 및 과제 통계 확인"],
  },
  {
    title: "시험관리",
    borderClass: "border-l-red-500",
    Icon: FileQuestion,
    items: ["시험 출제/응시/채점 기능", "과목별 시험 결과 통계 제공", "문제 은행 관리"],
  },
]

export const erpFeatureBlocks: FeatureBlock[] = [
  {
    title: "회원 관리",
    borderClass: "border-l-blue-500",
    Icon: Users,
    items: ["회원가입/로그인을 통해 시스템 접근", "로그인 후 내 정보 확인 및 수정 기능 제공"],
  },
  {
    title: "직원 관리",
    borderClass: "border-l-emerald-500",
    Icon: Building2,
    items: ["관리자/담당자가 직원 정보 등록 및 조회", "조직 인력 정보를 효율적으로 관리"],
  },
  {
    title: "근태 관리",
    borderClass: "border-l-orange-500",
    Icon: ClipboardList,
    items: ["출근/퇴근 시간 기록", "개인 근무 기록 및 전체 근태 현황 확인"],
  },
  {
    title: "게시판 기능",
    borderClass: "border-l-violet-500",
    Icon: MessageSquare,
    items: ["게시글 작성 및 정보 공유", "조직 내 커뮤니케이션 기능 제공"],
  },
  {
    title: "전자 결재",
    borderClass: "border-l-pink-500",
    Icon: FileQuestion,
    items: ["휴가 신청/결재 문서 작성 및 결재 요청", "관리자 승인/반려 및 상태 처리 기능"],
  },
]

export type RoleLine = { num: string; keyword: string; desc: string }

export const lmsRolesTech: RoleLine[] = [
  { num: "01", keyword: "과제·강의 CRUD", desc: "학생·강사 과제 및 강의 계획서 전반 기능 구현" },
  { num: "02", keyword: "통계 시각화", desc: "학생·강사 과제·강의 통계 시각화 기능 구현" },
  { num: "03", keyword: "루브릭 채점", desc: "루브릭 기반 채점 시스템 기능 구현" },
  { num: "04", keyword: "AWS S3", desc: "plainclient 연동 과제·강의자료 업로드/다운로드 구현" },
  { num: "05", keyword: "Monaco Editor", desc: "실시간 코드 제출 UI 구현" },
  { num: "06", keyword: "연동·보안", desc: "보안성 및 편의성을 고려한 백엔드–프론트엔드 연동" },
  { num: "07", keyword: "REST API", desc: "DTO–Entity 분리, Validation, 예외처리 설계 및 구현" },
  { num: "08", keyword: "DB 모델링", desc: "ERD 작성, MySQL 기반 테이블 생성" },
  { num: "09", keyword: "형상 관리", desc: "Git/GitHub 브랜치 전략으로 변경 이력 관리" },
]

export const lmsRolesPlan: RoleLine[] = [
  { num: "10", keyword: "요구사항·아키텍처", desc: "프로젝트 요구사항 분석 및 전체 아키텍처 설계" },
  { num: "11", keyword: "UX/UI", desc: "화면 설계 및 레이아웃 구성" },
  { num: "12", keyword: "문서·발표", desc: "최종 발표 자료 및 프로젝트 설명서 제작" },
]

export const erpRolesTech: RoleLine[] = [
  { num: "01", keyword: "인터셉터", desc: "메인 인터셉터 구현" },
  { num: "02", keyword: "JSP 화면", desc: "메인, 로그인, 공지사항, 근태관리 화면 구현" },
  { num: "03", keyword: "Spring 백엔드", desc: "로그인, 회원가입, 공지, 근태, 이메일 인증 기능 구현" },
  { num: "04", keyword: "MySQL", desc: "데이터베이스 설계 및 구축" },
  { num: "05", keyword: "CRUD·검증", desc: "게시글 CRUD, 예외 처리 및 유효성 검사" },
  { num: "06", keyword: "외부 API", desc: "Google 지도, 메일 API 이메일 인증 코드" },
  { num: "07", keyword: "Git/GitHub", desc: "형상관리" },
]

export const erpRolesPlan: RoleLine[] = [
  { num: "08", keyword: "기획", desc: "화면단 기획, 스토리보드 총괄 관리" },
]

export type TroubleItem = {
  id: string
  title: string
  tags: string[]
  problem: string[]
  cause: string[]
  solution: string[]
  result: string[]
}

export const lmsTroubleshooting: TroubleItem[] = [
  {
    id: "s3",
    title: "AWS S3 Pre-signed URL 파일 업로드 개선",
    tags: ["AWS S3", "Spring Boot"],
    problem: [
      "기존 업로드가 클라이언트 → 서버 → S3 구조로 동작",
      "대용량 업로드 시 서버 메모리·네트워크 부하 증가",
      "동시 업로드 증가 시 서버 병목",
    ],
    cause: ["서버가 파일 중계 역할을 수행", "업로드 속도가 서버 네트워크에 의존"],
    solution: [
      "Pre-signed URL 방식으로 구조 변경",
      "Client → Server (Pre-signed URL 요청) → S3 URL 생성 → Client → S3 직접 업로드",
    ],
    result: ["서버 부하 감소, 업로드 속도 개선", "대용량 파일 안정성 향상"],
  },
  {
    id: "monaco",
    title: "Monaco Editor 코드 제출 JSON 직렬화 문제",
    tags: ["Monaco", "React"],
    problem: ["특정 입력에서 JSON 파싱 오류로 제출 실패", "따옴표·줄바꿈·특수 문자 포함 시"],
    cause: ["코드 문자열이 JSON 직렬화 과정에서 손상되어 파싱 오류 발생"],
    solution: [
      "코드 문자열을 Base64 인코딩하여 전송",
      "서버에서 디코딩 후 저장·검증",
      "Validation 및 예외처리 강화",
    ],
    result: ["직렬화 오류 해결, 제출 안정성 향상"],
  },
  {
    id: "cors",
    title: "S3 파일 업로드 CORS 문제",
    tags: ["AWS S3", "CORS"],
    problem: [
      "브라우저에서 S3로 직접 업로드 시 CORS로 요청 차단 (Access to XMLHttpRequest has been blocked by CORS policy)",
    ],
    cause: ["S3 버킷에 CORS 설정이 없어 교차 출처 업로드가 막힘"],
    solution: ["버킷 CORS 정책 설정", "허용 Method: PUT, POST, GET", "허용 Origin/Headers 구성"],
    result: ["브라우저 직접 업로드 정상화", "Pre-signed URL 흐름 안정화"],
  },
]

export const erpTroubleshooting: TroubleItem[] = [
  {
    id: "auth",
    title: "로그인하지 않은 사용자의 보호 페이지 접근",
    tags: ["Spring MVC", "Interceptor"],
    problem: ["비로그인 상태에서 보호 페이지 URL 직접 입력 시 접근되는 이슈"],
    cause: ["일부 컨트롤러에만 세션 검증이 적용되어 공통 인증 체계가 불일치"],
    solution: ["Spring MVC HandlerInterceptor로 요청 전 단계에서 세션 로그인 여부를 공통 검증하도록 변경"],
    result: ["비로그인 접근 차단", "인증 흐름 일관성 확보"],
  },
  {
    id: "dup",
    title: "근태 관리 중복 출근 기록",
    tags: ["MyBatis", "Transaction"],
    problem: ["출근 버튼 반복 클릭 시 동일 날짜 출근 기록 중복 저장"],
    cause: ["조회·저장이 단일 트랜잭션으로 묶이지 않아 동시 요청 시 중복 저장"],
    solution: ["Service 계층에 트랜잭션 적용", "당일 출근 기록 존재 시 저장 제한"],
    result: ["중복 방지로 데이터 일관성·근태 신뢰도 향상"],
  },
]

export type RoadmapRow = {
  title: string
  problem: { bullets: string[] }
  direction: { bullets: string[] }
  effect: { bullets: string[] }
}

export const lmsRoadmapRows: RoadmapRow[] = [
  {
    title: "AI 기반 학습 추천",
    problem: { bullets: ["학습 데이터는 누적되나 개인 맞춤 추천이 부족"] },
    direction: { bullets: ["학습 데이터 기반 AI 추천 도입 (수강·과제·정답률·학습시간 등)"] },
    effect: { bullets: ["맞춤 학습", "효율 향상", "플랫폼 사용률 증가"] },
  },
  {
    title: "코드 자동 채점",
    problem: { bullets: ["코드 제출은 가능하나 자동 채점 부재로 교수자 부담"] },
    direction: { bullets: ["Docker Sandbox, Judge0 등으로 자동 채점 시스템 도입"] },
    effect: { bullets: ["채점 부담 감소", "실시간 피드백", "코딩 교육 기능 강화"] },
  },
  {
    title: "실시간 알림",
    problem: { bullets: ["공지·과제 등록 시 학생이 직접 확인해야 해 누락 가능"] },
    direction: { bullets: ["WebSocket·Redis Pub/Sub 기반 실시간 알림"] },
    effect: { bullets: ["UX 개선", "확인율 증가"] },
  },
]

export const erpRoadmapRows: RoadmapRow[] = [
  {
    title: "실시간 알림",
    problem: { bullets: ["전자결재·공지 시 사용자가 직접 접속해 확인해야 함"] },
    direction: { bullets: ["WebSocket·STOMP 기반 즉시 알림"] },
    effect: { bullets: ["업무 지연 감소", "응답 속도 향상"] },
  },
  {
    title: "데이터 시각화",
    problem: { bullets: ["근태·결재 현황이 리스트 중심이라 파악이 어려움"] },
    direction: { bullets: ["Chart.js 등으로 관리자 대시보드 시각화"] },
    effect: { bullets: ["의사결정 속도 향상"] },
  },
  {
    title: "파일 첨부",
    problem: { bullets: ["전자결재 시 자료 첨부 불가로 활용도 제한"] },
    direction: { bullets: ["S3·Multipart로 문서·파일 함께 관리"] },
    effect: { bullets: ["실무 활용도 향상"] },
  },
]
