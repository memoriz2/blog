import { NextRequest, NextResponse } from "next/server";
import { BannerNewsService } from "@/services/bannerNewsService";
import { CreateBannerNewsRequest } from "@/types/bannerNews";

const bannerNewsService = new BannerNewsService();

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Banner News API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Banner News API temporarily disabled during migration" },
    { status: 503 }
  );
}
