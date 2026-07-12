import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://gc_admin:gc_admin_pw@localhost:5432/gc_science_game";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set. Using default local PostgreSQL connection string.");
}

export const pool = new Pool({
  connectionString: databaseUrl,
});

export async function initializeDatabase(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
        display_name TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS player_progress (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        total_xp INTEGER NOT NULL DEFAULT 0,
        completed_mission_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS attempt_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        mission_id TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL,
        xp_earned INTEGER NOT NULL,
        seconds_spent INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS classrooms (
        id SERIAL PRIMARY KEY,
        teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        grade_level TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS class_enrollments (
        class_id INTEGER NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (class_id, student_id)
      );

      CREATE TABLE IF NOT EXISTS assignments (
        id SERIAL PRIMARY KEY,
        class_id INTEGER NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        mission_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
        due_date DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS parent_student_links (
        parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (parent_id, student_id)
      );

      CREATE TABLE IF NOT EXISTS parent_goals (
        id SERIAL PRIMARY KEY,
        parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        target_xp INTEGER NOT NULL DEFAULT 0,
        target_mission_count INTEGER NOT NULL DEFAULT 0,
        due_date DATE,
        is_completed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}
