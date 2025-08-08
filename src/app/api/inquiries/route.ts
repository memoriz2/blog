import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}
