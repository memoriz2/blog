import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 데이터베이스 시드 시작...");

  // Todo 샘플 데이터
  await prisma.todo.createMany({
    data: [
      {
        title: "프로젝트 기획서 작성",
        description: "Q1 프로젝트 기획서 완성",
        completed: false,
      },
      {
        title: "데이터베이스 설계",
        description: "새로운 기능을 위한 DB 스키마 설계",
        completed: true,
      },
      {
        title: "API 문서 작성",
        description: "REST API 문서 업데이트",
        completed: false,
      },
    ],
    skipDuplicates: true,
  });

  // 조직도 샘플 데이터 (로컬 이미지 파일 사용)
  await prisma.organizationChart.createMany({
    data: [
      {
        imageUrl: "/organization-charts/1753300508151_jzi5joe6ht.png",
        isActive: true,
      },
      {
        imageUrl: "/organization-charts/1753300613828_byl2zm1anff.png",
        isActive: false,
      },
      {
        imageUrl: "/organization-charts/1753300622563_h8lndpn9xao.png",
        isActive: false,
      },
    ],
    skipDuplicates: true,
  });

  // 히스토리 샘플 데이터
  await prisma.history.createMany({
    data: [
      {
        title: "회사 설립",
        content: "JSEO 회사 설립",
        year: 2020,
      },
      {
        title: "시리즈 A 투자",
        content: "10억원 시리즈 A 투자 유치",
        year: 2022,
      },
      {
        title: "해외 진출",
        content: "동남아시아 시장 진출",
        year: 2023,
      },
    ],
    skipDuplicates: true,
  });

  // 배너뉴스 샘플 데이터 (로컬 이미지 파일 사용)
  await prisma.bannerNews.createMany({
    data: [
      {
        title: "새로운 서비스 출시",
        content: "AI 기반 분석 서비스가 출시되었습니다.",
        imageUrl: "/organization-charts/1753300627007_csgmkkq317e.png",
        isActive: true,
      },
      {
        title: "채용 공고",
        content: "우수한 개발자를 모집합니다.",
        imageUrl: "/organization-charts/1753304682482_1bxy4buexz8.png",
        isActive: true,
      },
      {
        title: "연말 이벤트",
        content: "연말 감사 이벤트를 진행합니다.",
        imageUrl: "/organization-charts/1753304690335_9a2o9nyue7.png",
        isActive: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ 시드 데이터 생성 완료!");
}

main()
  .catch((e) => {
    console.error("❌ 시드 데이터 생성 실패:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
