import { NextRequest, NextResponse } from "next/server";
// import { BannerRepository } from "@/repositories/bannerRepository";
// import { BannerService } from "@/services/bannerService";

// const bannerRepository = new BannerRepository();
// const bannerService = new BannerService(bannerRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Banner API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Banner API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Banner API temporarily disabled during migration" },
    { status: 503 }
  );
}
