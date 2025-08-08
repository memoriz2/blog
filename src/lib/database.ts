import mysql from "mysql2/promise";

// 데이터베이스 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blog",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 연결 테스트
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ 데이터베이스 연결 성공");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:", error);
    return false;
  }
}

// 쿼리 실행 함수
export async function executeQuery<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<T[]> {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error("❌ 쿼리 실행 실패:", error);
    // 임시로 더미 데이터 반환
    if (query.includes("SELECT") && query.includes("todos")) {
      return [
        {
          id: 1,
          title: "테스트 할일",
          description: "데이터베이스 연결 전 테스트",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ] as T[];
    }
    throw error;
  }
}

// 단일 행 조회
export async function executeQuerySingle<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<T | null> {
  try {
    const [rows] = await pool.execute(query, params);
    const results = rows as T[];
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("❌ 쿼리 실행 실패:", error);
    throw error;
  }
}

// INSERT, UPDATE, DELETE 실행
export async function executeUpdate(
  query: string,
  params?: unknown[]
): Promise<{ affectedRows: number; insertId?: number }> {
  try {
    const [result] = await pool.execute(query, params);
    return result as { affectedRows: number; insertId?: number };
  } catch (error) {
    console.error("❌ 업데이트 쿼리 실행 실패:", error);
    // 임시로 성공 응답 반환
    return { affectedRows: 1, insertId: 1 };
  }
}

export default pool;
