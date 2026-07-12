import bcrypt from "bcryptjs";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { z } from "zod";
import { AuthenticatedRequest, requireAuth, requireRole, signToken, type UserRole } from "./auth.js";
import { labs, missions, standards } from "./content.js";
import { initializeDatabase, pool } from "./db.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  displayName: z.string().min(2),
  role: z.enum(["student", "teacher", "parent"]),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "science-game-api" });
});

app.post("/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  try {
    const insertResult = await pool.query(
      `
      INSERT INTO users(email, password_hash, role, display_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, role, display_name
      `,
      [parsed.data.email.toLowerCase(), passwordHash, parsed.data.role, parsed.data.displayName]
    );

    const user = insertResult.rows[0] as {
      id: number;
      email: string;
      role: UserRole;
      display_name: string;
    };

    await pool.query(
      `
      INSERT INTO player_progress(user_id, total_xp, completed_mission_ids)
      VALUES ($1, 0, '[]'::jsonb)
      ON CONFLICT (user_id) DO NOTHING
      `,
      [user.id]
    );

    const token = signToken({
      sub: user.id,
      role: user.role,
      email: user.email,
      displayName: user.display_name,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.display_name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register";
    if (message.includes("duplicate key")) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }
    res.status(500).json({ error: "Failed to register" });
  }
});

app.post("/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const userResult = await pool.query(
    `
    SELECT id, email, role, display_name, password_hash
    FROM users
    WHERE email = $1
    LIMIT 1
    `,
    [parsed.data.email.toLowerCase()]
  );

  if (userResult.rowCount === 0) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const user = userResult.rows[0] as {
    id: number;
    email: string;
    role: UserRole;
    display_name: string;
    password_hash: string;
  };

  const isValid = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!isValid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    email: user.email,
    displayName: user.display_name,
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.display_name,
    },
  });
});

app.get("/auth/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

app.get("/api/standards", (_req, res) => {
  res.json({ standards });
});

app.get("/api/labs", (_req, res) => {
  res.json({ labs });
});

app.get("/api/missions", (req, res) => {
  const labId = req.query.labId as string | undefined;
  if (!labId) {
    res.json({ missions });
    return;
  }

  const filtered = missions.filter((mission) => mission.labId === labId);
  res.json({ missions: filtered });
});

app.get("/api/missions/:id", (req, res) => {
  const mission = missions.find((entry) => entry.id === req.params.id);
  if (!mission) {
    res.status(404).json({ error: "Mission not found" });
    return;
  }
  res.json({ mission });
});

const attemptSchema = z.object({
  missionId: z.string(),
  selectedIndex: z.number().int().min(0),
  secondsSpent: z.number().int().min(0).max(600).default(0),
  userId: z.number().int().positive().optional(),
  totalXp: z.number().int().min(0).optional(),
  completedMissionIds: z.array(z.string()).optional(),
});

app.post("/api/attempts", async (req, res) => {
  const parsed = attemptSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const mission = missions.find((entry) => entry.id === parsed.data.missionId);
  if (!mission) {
    res.status(404).json({ error: "Mission not found" });
    return;
  }

  const isCorrect = parsed.data.selectedIndex === mission.answerIndex;
  const speedBonus = parsed.data.secondsSpent > 0 && parsed.data.secondsSpent < 30 ? 20 : 0;
  const xpEarned = isCorrect ? mission.xp + speedBonus : 10;

  if (parsed.data.userId) {
    await pool.query(
      `
      INSERT INTO attempt_logs(user_id, mission_id, is_correct, xp_earned, seconds_spent)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [parsed.data.userId, mission.id, isCorrect, xpEarned, parsed.data.secondsSpent]
    );

    if (typeof parsed.data.totalXp === "number" && parsed.data.completedMissionIds) {
      await pool.query(
        `
        INSERT INTO player_progress(user_id, total_xp, completed_mission_ids, updated_at)
        VALUES ($1, $2, $3::jsonb, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET total_xp = EXCLUDED.total_xp,
                      completed_mission_ids = EXCLUDED.completed_mission_ids,
                      updated_at = NOW()
        `,
        [parsed.data.userId, parsed.data.totalXp, JSON.stringify(parsed.data.completedMissionIds)]
      );
    }
  }

  res.json({
    result: isCorrect ? "correct" : "incorrect",
    xpEarned,
    explanation: mission.explanation,
    standards: mission.standardCodes
  });
});

app.get("/api/player/progress", requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const progress = await pool.query(
    `
    SELECT total_xp, completed_mission_ids, updated_at
    FROM player_progress
    WHERE user_id = $1
    LIMIT 1
    `,
    [userId]
  );

  if (progress.rowCount === 0) {
    res.json({ totalXp: 0, completedMissionIds: [], updatedAt: null });
    return;
  }

  const row = progress.rows[0] as {
    total_xp: number;
    completed_mission_ids: string[];
    updated_at: string;
  };

  res.json({
    totalXp: row.total_xp,
    completedMissionIds: row.completed_mission_ids,
    updatedAt: row.updated_at,
  });
});

const progressSchema = z.object({
  totalXp: z.number().int().min(0),
  completedMissionIds: z.array(z.string()),
});

app.put("/api/player/progress", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = progressSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  await pool.query(
    `
    INSERT INTO player_progress(user_id, total_xp, completed_mission_ids, updated_at)
    VALUES ($1, $2, $3::jsonb, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET total_xp = EXCLUDED.total_xp,
                  completed_mission_ids = EXCLUDED.completed_mission_ids,
                  updated_at = NOW()
    `,
    [req.user!.sub, parsed.data.totalXp, JSON.stringify(parsed.data.completedMissionIds)]
  );

  res.json({ ok: true });
});

const classSchema = z.object({
  name: z.string().min(2),
  gradeLevel: z.string().min(1),
});

const enrollmentSchema = z.object({
  classId: z.number().int().positive(),
  studentEmail: z.email(),
});

const assignmentSchema = z.object({
  classId: z.number().int().positive(),
  title: z.string().min(2),
  missionIds: z.array(z.string()).min(1),
  dueDate: z.string().optional(),
});

app.get("/api/teacher/classes", requireAuth, requireRole(["teacher", "admin"]), async (req: AuthenticatedRequest, res) => {
  const teacherId = req.user!.sub;

  const classesResult = await pool.query(
    `
    SELECT c.id, c.name, c.grade_level,
           COUNT(DISTINCT ce.student_id)::int AS student_count,
           COUNT(DISTINCT a.id)::int AS assignment_count
    FROM classrooms c
    LEFT JOIN class_enrollments ce ON ce.class_id = c.id
    LEFT JOIN assignments a ON a.class_id = c.id
    WHERE c.teacher_id = $1
    GROUP BY c.id
    ORDER BY c.created_at DESC
    `,
    [teacherId]
  );

  res.json({ classes: classesResult.rows });
});

app.post("/api/teacher/classes", requireAuth, requireRole(["teacher", "admin"]), async (req: AuthenticatedRequest, res) => {
  const parsed = classSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const created = await pool.query(
    `
    INSERT INTO classrooms(teacher_id, name, grade_level)
    VALUES ($1, $2, $3)
    RETURNING id, name, grade_level
    `,
    [req.user!.sub, parsed.data.name, parsed.data.gradeLevel]
  );

  res.status(201).json({ classroom: created.rows[0] });
});

app.post("/api/teacher/enroll", requireAuth, requireRole(["teacher", "admin"]), async (req: AuthenticatedRequest, res) => {
  const parsed = enrollmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const classCheck = await pool.query(
    `SELECT id FROM classrooms WHERE id = $1 AND teacher_id = $2 LIMIT 1`,
    [parsed.data.classId, req.user!.sub]
  );
  if (classCheck.rowCount === 0) {
    res.status(404).json({ error: "Class not found" });
    return;
  }

  const studentResult = await pool.query(
    `SELECT id FROM users WHERE email = $1 AND role = 'student' LIMIT 1`,
    [parsed.data.studentEmail.toLowerCase()]
  );

  if (studentResult.rowCount === 0) {
    res.status(404).json({ error: "Student account not found" });
    return;
  }

  const studentId = (studentResult.rows[0] as { id: number }).id;

  await pool.query(
    `
    INSERT INTO class_enrollments(class_id, student_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [parsed.data.classId, studentId]
  );

  res.json({ ok: true });
});

app.post("/api/teacher/assignments", requireAuth, requireRole(["teacher", "admin"]), async (req: AuthenticatedRequest, res) => {
  const parsed = assignmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const classCheck = await pool.query(
    `SELECT id FROM classrooms WHERE id = $1 AND teacher_id = $2 LIMIT 1`,
    [parsed.data.classId, req.user!.sub]
  );
  if (classCheck.rowCount === 0) {
    res.status(404).json({ error: "Class not found" });
    return;
  }

  const created = await pool.query(
    `
    INSERT INTO assignments(class_id, title, mission_ids, due_date)
    VALUES ($1, $2, $3::jsonb, $4)
    RETURNING id, class_id, title, mission_ids, due_date
    `,
    [
      parsed.data.classId,
      parsed.data.title,
      JSON.stringify(parsed.data.missionIds),
      parsed.data.dueDate ?? null,
    ]
  );

  res.status(201).json({ assignment: created.rows[0] });
});

app.get("/api/teacher/classes/:classId/report", requireAuth, requireRole(["teacher", "admin"]), async (req: AuthenticatedRequest, res) => {
  const classId = Number(req.params.classId);
  if (!Number.isInteger(classId) || classId <= 0) {
    res.status(400).json({ error: "Invalid class id" });
    return;
  }

  const classCheck = await pool.query(
    `SELECT id, name, grade_level FROM classrooms WHERE id = $1 AND teacher_id = $2 LIMIT 1`,
    [classId, req.user!.sub]
  );
  if (classCheck.rowCount === 0) {
    res.status(404).json({ error: "Class not found" });
    return;
  }

  const reportResult = await pool.query(
    `
    SELECT u.id AS student_id,
           u.display_name,
           u.email,
           COALESCE(pp.total_xp, 0) AS total_xp,
           COALESCE(jsonb_array_length(pp.completed_mission_ids), 0) AS completed_missions
    FROM class_enrollments ce
    JOIN users u ON u.id = ce.student_id
    LEFT JOIN player_progress pp ON pp.user_id = u.id
    WHERE ce.class_id = $1
    ORDER BY u.display_name ASC
    `,
    [classId]
  );

  const assignmentsResult = await pool.query(
    `
    SELECT id, title, mission_ids, due_date
    FROM assignments
    WHERE class_id = $1
    ORDER BY created_at DESC
    `,
    [classId]
  );

  res.json({
    classroom: classCheck.rows[0],
    students: reportResult.rows,
    assignments: assignmentsResult.rows,
  });
});

const parentLinkSchema = z.object({
  studentEmail: z.email(),
});

const parentGoalSchema = z.object({
  studentId: z.number().int().positive(),
  title: z.string().min(2),
  targetXp: z.number().int().min(0).default(0),
  targetMissionCount: z.number().int().min(0).default(0),
  dueDate: z.string().optional(),
});

app.post("/api/parent/link", requireAuth, requireRole(["parent", "admin"]), async (req: AuthenticatedRequest, res) => {
  const parsed = parentLinkSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const studentResult = await pool.query(
    `SELECT id FROM users WHERE email = $1 AND role = 'student' LIMIT 1`,
    [parsed.data.studentEmail.toLowerCase()]
  );

  if (studentResult.rowCount === 0) {
    res.status(404).json({ error: "Student account not found" });
    return;
  }

  const studentId = (studentResult.rows[0] as { id: number }).id;

  await pool.query(
    `
    INSERT INTO parent_student_links(parent_id, student_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [req.user!.sub, studentId]
  );

  res.json({ ok: true, studentId });
});

app.get("/api/parent/students", requireAuth, requireRole(["parent", "admin"]), async (req: AuthenticatedRequest, res) => {
  const studentsResult = await pool.query(
    `
    SELECT u.id,
           u.display_name,
           u.email,
           COALESCE(pp.total_xp, 0) AS total_xp,
           COALESCE(jsonb_array_length(pp.completed_mission_ids), 0) AS completed_missions
    FROM parent_student_links psl
    JOIN users u ON u.id = psl.student_id
    LEFT JOIN player_progress pp ON pp.user_id = u.id
    WHERE psl.parent_id = $1
    ORDER BY u.display_name ASC
    `,
    [req.user!.sub]
  );

  const goalsResult = await pool.query(
    `
    SELECT id, student_id, title, target_xp, target_mission_count, due_date, is_completed
    FROM parent_goals
    WHERE parent_id = $1
    ORDER BY created_at DESC
    `,
    [req.user!.sub]
  );

  res.json({ students: studentsResult.rows, goals: goalsResult.rows });
});

app.post("/api/parent/goals", requireAuth, requireRole(["parent", "admin"]), async (req: AuthenticatedRequest, res) => {
  const parsed = parentGoalSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const linkCheck = await pool.query(
    `
    SELECT 1
    FROM parent_student_links
    WHERE parent_id = $1 AND student_id = $2
    LIMIT 1
    `,
    [req.user!.sub, parsed.data.studentId]
  );

  if (linkCheck.rowCount === 0) {
    res.status(403).json({ error: "Student is not linked to this parent" });
    return;
  }

  const created = await pool.query(
    `
    INSERT INTO parent_goals(parent_id, student_id, title, target_xp, target_mission_count, due_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, student_id, title, target_xp, target_mission_count, due_date, is_completed
    `,
    [
      req.user!.sub,
      parsed.data.studentId,
      parsed.data.title,
      parsed.data.targetXp,
      parsed.data.targetMissionCount,
      parsed.data.dueDate ?? null,
    ]
  );

  res.status(201).json({ goal: created.rows[0] });
});

app.patch("/api/parent/goals/:goalId/complete", requireAuth, requireRole(["parent", "admin"]), async (req: AuthenticatedRequest, res) => {
  const goalId = Number(req.params.goalId);
  if (!Number.isInteger(goalId) || goalId <= 0) {
    res.status(400).json({ error: "Invalid goal id" });
    return;
  }

  const updateResult = await pool.query(
    `
    UPDATE parent_goals
    SET is_completed = true
    WHERE id = $1 AND parent_id = $2
    RETURNING id
    `,
    [goalId, req.user!.sub]
  );

  if (updateResult.rowCount === 0) {
    res.status(404).json({ error: "Goal not found" });
    return;
  }

  res.json({ ok: true });
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Science game API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database schema", error);
    process.exit(1);
  });
