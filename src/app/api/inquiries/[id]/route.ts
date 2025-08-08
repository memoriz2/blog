import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Inquiry API temporarily disabled during migration" },
    { status: 503 }
  );
}
