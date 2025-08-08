import { NextRequest, NextResponse } from "next/server";
import { TodoService } from "@/services/todoService";

export async function GET(request: NextRequest) {
  try {
    const todoService = new TodoService();
    const result = await todoService.getAllTodos();

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Todo 목록 조회 오류:", error);
    return NextResponse.json(
      { error: "Todo 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const todoService = new TodoService();
    const result = await todoService.createTodo(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Todo 생성 오류:", error);
    return NextResponse.json(
      { error: "Todo를 생성하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
