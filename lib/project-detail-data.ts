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
    tags: ["AWS S3", "Spring Boot", "Pre-signed URL"],
    problem: [
      "기존 파일 업로드 구조가 클라이언트 → 서버 → S3 순으로 동작했습니다.",
      "대용량 파일 업로드 시 서버 메모리 사용량이 증가하고, 업로드 시간이 길어지는 현상이 있었습니다.",
      "서버 네트워크 트래픽이 늘어나 동시 업로드가 많아질 경우 서버 부하가 커졌습니다.",
      "과제 제출·자료 업로드가 잦은 LMS 환경에서 서버를 반드시 거치는 구조는 비효율적이었습니다.",
    ],
    cause: [
      "파일 전달 흐름이 ‘브라우저 → 서버 → S3’로 이어져, 서버가 단순히 파일을 넘기는 중계(Relay) 역할을 했습니다.",
      "그 과정에서 CPU·메모리 등 서버 자원을 과다하게 사용했습니다.",
      "업로드 속도가 서버의 네트워크 성능에 크게 의존하는 구조였습니다.",
    ],
    solution: [
      "AWS S3의 Pre-signed URL 방식을 도입해, 클라이언트가 S3로 파일을 직접 업로드하도록 구조를 바꿨습니다.",
      "새 프로세스: (1) Client → Server에 Presigned URL 요청, (2) Server에서 AWS SDK로 Presigned URL 생성, (3) Server → Client에 URL 반환, (4) Client → S3에 해당 URL로 직접 업로드.",
      "서버는 S3 SDK로 URL 생성, 허용 HTTP Method·만료 시간 등 보안·정책 관리, 업로드 완료 후 최종 파일 URL 저장 등 최소 역할만 담당하도록 정리했습니다.",
    ],
    result: [
      "서버가 실제 파일 바이너리를 처리하지 않아 자원 사용이 줄고 부하가 감소했습니다.",
      "업로드 속도가 개선되고 서버 네트워크 트래픽이 크게 줄었습니다.",
      "대용량 파일 업로드에서도 안정적으로 동작하도록 개선했습니다.",
    ],
  },
  {
    id: "monaco",
    title: "Monaco Editor 코드 제출 JSON 직렬화 문제",
    tags: ["Monaco", "React", "JSON", "Base64"],
    problem: [
      "LMS에서 학생이 코드를 제출할 때 Monaco Editor로 입력한 코드를 JSON 형식으로 서버에 전송합니다.",
      "따옴표(\"\") 포함, 줄바꿈, 특수 문자 등이 있는 코드에서는 JSON 파싱 오류가 발생해 제출에 실패했습니다.",
    ],
    cause: [
      "코드 문자열이 JSON 직렬화 과정에서 깨지면서 파싱 오류가 났습니다.",
      "예: 제출할 코드가 System.out.println(\"Hello\"); 일 때, JSON 객체에 그대로 넣으면 {\"code\": \"System.out.println(\"Hello\");\"}처럼 문자열 안의 큰따옴표가 JSON 구조를 깨뜨립니다.",
    ],
    solution: [
      "전송 전 코드 문자열을 Base64로 인코딩한 뒤 JSON에 담아내도록 변경했습니다.",
      "흐름: Monaco Editor 코드 → Base64 인코딩 → JSON 전송 → 서버에서 Base64 디코딩 → 정상 코드로 저장.",
      "서버에서는 코드 길이 제한, 유효성 검사, 빈 코드 제출 방지 등 추가 검증을 두었습니다.",
    ],
    result: [
      "JSON 직렬화·파싱 오류를 해결했습니다.",
      "코드 제출 과정의 안정성이 높아졌습니다.",
      "특수 문자·줄바꿈이 포함된 코드도 제출할 수 있게 되었습니다.",
    ],
  },
  {
    id: "cors",
    title: "S3 파일 업로드 CORS 문제",
    tags: ["AWS S3", "CORS", "Pre-signed URL"],
    problem: [
      "Pre-signed URL 방식으로 S3에 직접 업로드할 때 브라우저에서 업로드 요청이 차단되는 문제가 있었습니다.",
      "오류 메시지: Access to XMLHttpRequest has been blocked by CORS policy",
    ],
    cause: [
      "요청 흐름이 Client(예: localhost) → AWS S3로 이어지는 교차 출처 요청입니다.",
      "브라우저는 다른 도메인으로의 요청에 대해 CORS 설정이 없으면 요청을 막습니다.",
      "S3 버킷에 CORS 설정이 없어 브라우저가 업로드를 차단했습니다.",
    ],
    solution: [
      "S3 버킷에 CORS 정책을 설정했습니다.",
      "브라우저 직접 업로드를 허용하도록 PUT, POST, GET 등 필요한 Method를 허용 목록에 포함했습니다.",
      "요청을 허용하도록 Origin·Headers 등을 구성해 Pre-signed URL 업로드가 동작하도록 맞췄습니다.",
    ],
    result: [
      "브라우저에서 S3로 직접 업로드할 수 있게 되었습니다.",
      "파일 업로드 기능이 정상적으로 동작합니다.",
      "Pre-signed URL 방식이 안정적으로 유지됩니다.",
    ],
  },
]

export const erpTroubleshooting: TroubleItem[] = [
  {
    id: "auth",
    title: "로그인하지 않은 사용자의 보호 페이지 접근 문제",
    tags: ["Spring MVC", "Interceptor", "Session"],
    problem: [
      "ERP 시스템에 로그인 기능을 구현했으나, 로그인하지 않은 사용자가 브라우저 주소창에 관리자 페이지나 보호된 페이지의 URL을 직접 입력하여 접근할 수 있는 문제가 발생했습니다.",
      "예를 들어 `/employee/list`, `/attendance/main` 등의 URL을 직접 입력하면 별도의 로그인 검증 없이 페이지가 표시되었습니다.",
    ],
    cause: [
      "초기에는 각 컨트롤러에서 개별적으로 세션을 확인하는 방식으로 로그인 검증을 처리했습니다.",
      "로그인 성공 시 세션에 사용자 정보를 저장하고, 이후 컨트롤러 동작 시 session.getAttribute()로 로그인 여부를 확인하는 구조였습니다.",
      "이 방식의 문제점: (1) 로그인 검증 로직이 여러 컨트롤러에 분산됨, (2) 일부 컨트롤러에 로그인 확인 코드가 누락됨, (3) URL 직접 접근 시 인증 검증이 일관되게 수행되지 않음.",
      "인증 로직이 일관되게 적용되지 않아 보안 취약점으로 이어졌습니다.",
    ],
    solution: [
      "Spring MVC의 HandlerInterceptor 기능을 적용해 해결했습니다.",
      "Interceptor는 컨트롤러가 실행되기 전에 요청을 가로채 처리할 수 있습니다.",
      "(1) HandlerInterceptor 인터페이스를 구현하는 클래스를 작성하고, (2) preHandle() 메서드 안에서 로그인 상태를 확인하며, (3) 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트합니다.",
      "흐름: 사용자 요청 → Interceptor preHandle() → 세션 로그인 여부 확인 → 로그인된 경우(O) 컨트롤러 실행, 로그인되지 않은 경우(X) 로그인 페이지로 이동.",
    ],
    result: [
      "로그인하지 않은 사용자의 보호 페이지 접근을 차단했습니다.",
      "인증 검증 로직을 한곳에서 관리해 보안과 코드 유지보수성을 크게 개선했습니다.",
    ],
  },
  {
    id: "dup",
    title: "근태 관리에서 중복 출근 기록 문제",
    tags: ["Spring", "Transaction", "MyBatis"],
    problem: [
      "근태 관리 기능에서 사용자가 출근 버튼을 여러 번 클릭하면 동일 날짜에 여러 건의 출근 기록이 저장되는 문제가 발생했습니다.",
      "한 사용자가 하루에 여러 번 출근 처리된 것처럼 비정상 데이터가 쌓였습니다.",
    ],
    cause: [
      "출근 기록 저장 로직이 버튼 클릭 시 즉시 데이터를 저장하도록만 구현되어 있었습니다.",
      "(1) 동일 날짜에 이미 출근 기록이 있는지 검증하는 로직이 없었고, (2) 중복 요청이 들어올 경우 중복 저장이 가능했으며, (3) 조회(확인)와 저장 로직이 하나의 트랜잭션으로 묶이지 않았습니다.",
      "조회와 저장이 원자적으로 처리되지 않아 데이터 무결성이 깨질 위험이 있었습니다.",
    ],
    solution: [
      "Spring Transaction Management 기반의 트랜잭션 처리를 적용했습니다.",
      "(1) Service 계층 메서드에 @Transactional을 적용하고, (2) 출근 처리 시 해당 날짜의 근태 기록을 먼저 조회한 뒤, (3) 이미 기록이 있으면 추가 저장을 제한합니다.",
      "출근 버튼 클릭 → 당일 근태 기록 조회 → 기록이 없으면 저장, 있으면 출근 처리를 제한하는 흐름으로 정리했습니다.",
      "조회와 저장을 하나의 트랜잭션으로 묶어 데이터 일관성을 유지하도록 개선했습니다.",
    ],
    result: [
      "동일 날짜 중복 출근 기록 문제를 해결했습니다.",
      "근태 데이터 무결성을 확보하고 시스템 안정성을 높였습니다.",
    ],
  },
]

export type RoadmapRow = {
  title: string
  problem: { bullets: string[] }
  direction: { bullets: string[] }
  effect: { bullets: string[] }
  /** 미지정 시 UI 라벨은 "기대 효과" (ERP 개선점은 "사용 기술 예시") */
  thirdColumnTitle?: string
}

export const lmsRoadmapRows: RoadmapRow[] = [
  {
    title: "AI 기반 학습 추천 기능 (서비스 확장)",
    problem: {
      bullets: [
        "LMS에서 학생의 학습 데이터는 지속적으로 쌓이지만, 현재는 단순 강의 수강 중심 구조로 개인 맞춤 학습 기능이 부족합니다.",
      ],
    },
    direction: {
      bullets: [
        "학생 학습 데이터를 활용한 AI 추천 시스템을 도입합니다.",
        "활용 가능한 데이터 예시: 강의 수강 이력, 과제 제출 패턴, 문제 정답률, 학습 시간 등.",
        "추천 기능 예시: 학생 A가 자료구조 강의를 많이 수강한 경우 → 알고리즘 관련 강의를 추천.",
      ],
    },
    effect: {
      bullets: [
        "개인 맞춤형 학습 경험을 제공할 수 있습니다.",
        "학습 효율을 높일 수 있습니다.",
        "플랫폼 사용률·재방문을 높이는 데 기여할 수 있습니다.",
      ],
    },
  },
  {
    title: "코드 자동 채점 기능 (교육 플랫폼 기능 강화)",
    thirdColumnTitle: "사용 기술 예시",
    problem: {
      bullets: [
        "현재는 코드 제출만 가능하고 자동 채점 기능이 없어, 교수자가 코드를 직접 확인해야 합니다.",
      ],
    },
    direction: {
      bullets: [
        "코드를 실행하고 자동으로 채점하는 시스템을 도입합니다.",
        "기대 효과: 교수자의 채점 부담 감소, 학생에게 실시간 피드백 제공, 코딩 교육 플랫폼으로서의 기능 강화.",
      ],
    },
    effect: {
      bullets: ["Docker Sandbox", "Judge0 API", "컨테이너 기반 코드 실행"],
    },
  },
  {
    title: "실시간 알림 시스템",
    thirdColumnTitle: "사용 기술 예시",
    problem: {
      bullets: [
        "공지사항·과제 등록 후 학생이 직접 시스템에 들어가 확인해야 해, 확인이 누락되기 쉽습니다.",
      ],
    },
    direction: {
      bullets: [
        "WebSocket 기반 실시간 알림 시스템을 도입합니다.",
        "예시 흐름: 교수자가 과제 등록 → 알림 서버 → 학생 브라우저에 실시간 알림 표시.",
        "기대 효과: 사용자 경험(UX) 개선, 과제·공지 확인률 증가.",
      ],
    },
    effect: {
      bullets: ["WebSocket", "Redis Pub/Sub"],
    },
  },
]

export const erpRoadmapRows: RoadmapRow[] = [
  {
    title: "실시간 알림 기능",
    thirdColumnTitle: "사용 기술 예시",
    problem: {
      bullets: [
        "전자결재 요청이나 공지사항 등록 시 사용자가 직접 시스템에 접속해야 확인할 수 있어 업무 처리 속도가 느려질 수 있습니다.",
      ],
    },
    direction: {
      bullets: [
        "실시간 알림 시스템을 도입하여 결재 요청, 승인, 반려 등의 이벤트 발생 시 사용자에게 즉시 알림을 제공합니다.",
      ],
    },
    effect: {
      bullets: ["WebSocket", "STOMP 기반 메시지 처리"],
    },
  },
  {
    title: "데이터 시각화 기능",
    thirdColumnTitle: "사용 기술 예시",
    problem: {
      bullets: [
        "근태 관리나 결재 현황 데이터가 단순 리스트 형태로 제공되어 전체 현황을 한눈에 파악하기 어렵습니다.",
      ],
    },
    direction: {
      bullets: [
        "관리자 대시보드를 구축하여 근태 현황, 결재 진행 상태, 직원 통계를 그래프 형태로 시각화합니다.",
      ],
    },
    effect: {
      bullets: ["Chart.js", "관리자 대시보드 UI"],
    },
  },
  {
    title: "파일 첨부 기능",
    thirdColumnTitle: "사용 기술 예시",
    problem: {
      bullets: [
        "전자결재 문서 작성 시 관련 자료나 문서를 첨부할 수 없어 실제 업무 환경에서 활용도가 제한적입니다.",
      ],
    },
    direction: {
      bullets: [
        "전자결재 문서에 파일 업로드 및 다운로드 기능을 추가하여 다양한 업무 문서를 함께 관리할 수 있도록 확장합니다.",
      ],
    },
    effect: {
      bullets: ["Amazon Web Services S3", "Multipart File Upload"],
    },
  },
]
