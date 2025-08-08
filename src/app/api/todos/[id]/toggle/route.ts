import { NextRequest, NextResponse } from "next/server";
import { TodoService } from "@/services/todoService";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "올바른 Todo ID가 아닙니다." },
        { status: 400 }
      );
    }

    const todoService = new TodoService();
    const result = await todoService.toggleTodoComplete(id);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Todo 토글 오류:", error);
    return NextResponse.json(
      { error: "Todo 상태 변경 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
