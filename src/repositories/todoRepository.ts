import {
  executeQuery,
  executeQuerySingle,
  executeUpdate,
} from "@/lib/database";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: Date;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: Date;
}

export class TodoRepository {
  // 모든 Todo 조회
  async findAll(): Promise<Todo[]> {
    const query = `
      SELECT id, title, description, completed, priority, dueDate, createdAt, updatedAt
      FROM Todo
      ORDER BY createdAt DESC
    `;
    return await executeQuery<Todo>(query);
  }

  // ID로 Todo 조회
  async findById(id: number): Promise<Todo | null> {
    const query = `
      SELECT id, title, description, completed, priority, dueDate, createdAt, updatedAt
      FROM Todo
      WHERE id = ?
    `;
    return await executeQuerySingle<Todo>(query, [id]);
  }

  // Todo 생성
  async create(data: CreateTodoRequest): Promise<Todo> {
    const query = `
      INSERT INTO Todo (title, description, completed, priority, dueDate, createdAt, updatedAt)
      VALUES (?, ?, false, ?, ?, NOW(), NOW())
    `;

    const result = await executeUpdate(query, [
      data.title,
      data.description || null,
      data.priority || "MEDIUM",
      data.dueDate || null,
    ]);

    // 생성된 Todo 조회
    const createdTodo = await this.findById(result.insertId!);
    if (!createdTodo) {
      throw new Error("Todo 생성 후 조회 실패");
    }

    return createdTodo;
  }

  // Todo 수정
  async update(id: number, data: UpdateTodoRequest): Promise<Todo | null> {
    const updateFields: string[] = [];
    const params: unknown[] = [];

    if (data.title !== undefined) {
      updateFields.push("title = ?");
      params.push(data.title);
    }
    if (data.description !== undefined) {
      updateFields.push("description = ?");
      params.push(data.description);
    }
    if (data.completed !== undefined) {
      updateFields.push("completed = ?");
      params.push(data.completed);
    }
    if (data.priority !== undefined) {
      updateFields.push("priority = ?");
      params.push(data.priority);
    }
    if (data.dueDate !== undefined) {
      updateFields.push("dueDate = ?");
      params.push(data.dueDate);
    }

    updateFields.push("updatedAt = NOW()");
    params.push(id);

    const query = `
      UPDATE Todo
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `;

    const result = await executeUpdate(query, params);

    if (result.affectedRows > 0) {
      return await this.findById(id);
    }

    return null;
  }

  // Todo 삭제
  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM Todo WHERE id = ?";
    const result = await executeUpdate(query, [id]);
    return result.affectedRows > 0;
  }

  // Todo 완료 상태 토글
  async toggleComplete(id: number): Promise<Todo | null> {
    const query = `
      UPDATE Todo
      SET completed = NOT completed, updatedAt = NOW()
      WHERE id = ?
    `;

    const result = await executeUpdate(query, [id]);

    if (result.affectedRows > 0) {
      return await this.findById(id);
    }

    return null;
  }

  // 완료된 Todo 개수 조회
  async getCompletedCount(): Promise<number> {
    const query = "SELECT COUNT(*) as count FROM Todo WHERE completed = true";
    const result = await executeQuerySingle<{ count: number }>(query);
    return result?.count || 0;
  }

  // 전체 Todo 개수 조회
  async getTotalCount(): Promise<number> {
    const query = "SELECT COUNT(*) as count FROM Todo";
    const result = await executeQuerySingle<{ count: number }>(query);
    return result?.count || 0;
  }
}
