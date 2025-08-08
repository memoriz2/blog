import { NextRequest, NextResponse } from "next/server";
import { BannerRepository } from "@/repositories/bannerRepository";
import { BannerService } from "@/services/bannerService";

const bannerRepository = new BannerRepository();
const bannerService = new BannerService(bannerRepository);

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Banner API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Banner API temporarily disabled during migration" },
    { status: 503 }
  );
}
