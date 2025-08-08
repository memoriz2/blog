import { NextRequest, NextResponse } from "next/server";
import { NoticeService } from "@/services/noticeService";

const noticeService = new NoticeService();

// GET: 공지사항 목록 조회
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Notice API temporarily disabled during migration" },
    { status: 503 }
  );
}

// POST: 공지사항 생성 (관리자만)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Notice API temporarily disabled during migration" },
    { status: 503 }
  );
}
