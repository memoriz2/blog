import {
  TodoRepository,
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "@/repositories/todoRepository";

export class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  // 모든 Todo 조회
  async getAllTodos(): Promise<{
    success: boolean;
    data: Todo[];
    message: string;
  }> {
    try {
      const todos = await this.todoRepository.findAll();
      return {
        success: true,
        data: todos,
        message: "Todos retrieved successfully",
      };
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      return {
        success: false,
        data: [],
        message: "Failed to fetch todos",
      };
    }
  }

  // ID로 Todo 조회
  async getTodoById(
    id: number
  ): Promise<{ success: boolean; data: Todo | null; message: string }> {
    try {
      const todo = await this.todoRepository.findById(id);
      return {
        success: true,
        data: todo,
        message: todo ? "Todo retrieved successfully" : "Todo not found",
      };
    } catch (error) {
      console.error(`Failed to fetch todo with id ${id}:`, error);
      return {
        success: false,
        data: null,
        message: "Failed to fetch todo",
      };
    }
  }

  // Todo 생성
  async createTodo(
    data: CreateTodoRequest
  ): Promise<{ success: boolean; data: Todo | null; message: string }> {
    try {
      const todo = await this.todoRepository.create(data);
      return {
        success: true,
        data: todo,
        message: "Todo created successfully",
      };
    } catch (error) {
      console.error("Failed to create todo:", error);
      return {
        success: false,
        data: null,
        message: "Failed to create todo",
      };
    }
  }

  // Todo 수정
  async updateTodo(
    id: number,
    data: UpdateTodoRequest
  ): Promise<{ success: boolean; data: Todo | null; message: string }> {
    try {
      const todo = await this.todoRepository.update(id, data);
      return {
        success: true,
        data: todo,
        message: todo ? "Todo updated successfully" : "Todo not found",
      };
    } catch (error) {
      console.error(`Failed to update todo with id ${id}:`, error);
      return {
        success: false,
        data: null,
        message: "Failed to update todo",
      };
    }
  }

  // Todo 삭제
  async deleteTodo(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const deleted = await this.todoRepository.delete(id);
      return {
        success: deleted,
        message: deleted ? "Todo deleted successfully" : "Todo not found",
      };
    } catch (error) {
      console.error(`Failed to delete todo with id ${id}:`, error);
      return {
        success: false,
        message: "Failed to delete todo",
      };
    }
  }

  // Todo 완료 상태 토글
  async toggleTodoComplete(
    id: number
  ): Promise<{ success: boolean; data: Todo | null; message: string }> {
    try {
      const todo = await this.todoRepository.toggleComplete(id);
      return {
        success: true,
        data: todo,
        message: todo ? "Todo status toggled successfully" : "Todo not found",
      };
    } catch (error) {
      console.error(`Failed to toggle todo with id ${id}:`, error);
      return {
        success: false,
        data: null,
        message: "Failed to toggle todo status",
      };
    }
  }

  // 통계 조회
  async getTodoStats(): Promise<{
    success: boolean;
    data: { total: number; completed: number; pending: number } | null;
    message: string;
  }> {
    try {
      const [total, completed] = await Promise.all([
        this.todoRepository.getTotalCount(),
        this.todoRepository.getCompletedCount(),
      ]);

      return {
        success: true,
        data: {
          total,
          completed,
          pending: total - completed,
        },
        message: "Todo stats retrieved successfully",
      };
    } catch (error) {
      console.error("Failed to fetch todo stats:", error);
      return {
        success: false,
        data: null,
        message: "Failed to fetch todo stats",
      };
    }
  }
}
