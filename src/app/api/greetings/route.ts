import { NextRequest, NextResponse } from "next/server";
import { GreetingRepository } from "@/repositories/greetingRepository";
import { GreetingService } from "@/services/greetingService";

const greetingRepository = new GreetingRepository();
const greetingService = new GreetingService(greetingRepository);

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Greeting API temporarily disabled during migration" },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Greeting API temporarily disabled during migration" },
    { status: 503 }
  );
}
