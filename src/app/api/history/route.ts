import { NextRequest, NextResponse } from "next/server";
import { HistoryService } from "@/services/historyService";
import { CreateHistoryRequest } from "@/types/history";

const historyService = new HistoryService();

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "History API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "History API temporarily disabled during migration" },
    { status: 503 }
  );
}
