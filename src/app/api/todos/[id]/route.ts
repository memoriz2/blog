import { NextRequest, NextResponse } from "next/server";
import { TodoService } from "@/services/todoService";

export async function GET(
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
    const result = await todoService.getTodoById(id);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Todo 조회 오류:", error);
    return NextResponse.json(
      { error: "Todo 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "올바른 Todo ID가 아닙니다." },
        { status: 400 }
      );
    }

    const todoService = new TodoService();
    const result = await todoService.updateTodo(id, body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Todo 수정 오류:", error);
    return NextResponse.json(
      { error: "Todo 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const result = await todoService.deleteTodo(id);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo가 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Todo 삭제 오류:", error);
    return NextResponse.json(
      { error: "Todo 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
