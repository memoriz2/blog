import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}
