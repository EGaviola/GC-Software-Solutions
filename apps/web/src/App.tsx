import { useEffect, useMemo, useState } from 'react'
import './App.css'
import GamePortal, { type GameMode } from './GamePortal'
import EscapeRoomGame from './EscapeRoomGame'
import ResearchMissionGame from './ResearchMissionGame'
import MiniGamePlay from './MiniGamePlay'
import ScenarioGame from './ScenarioGame'

type Lab = {
  id: string
  title: string
  description: string
  unlockXp: number
  color: string
}

type Mission = {
  id: string
  labId: string
  title: string
  standardCodes: string[]
  prompt: string
  scenario: string
  choices: string[]
  isBoss?: boolean
}

type UserRole = 'student' | 'teacher' | 'parent' | 'admin'

type AuthUser = {
  sub: number
  role: UserRole
  email: string
  displayName: string
}

type AttemptResult = {
  result: 'correct' | 'incorrect'
  xpEarned: number
  explanation: string
  standards: string[]
}

type Classroom = {
  id: number
  name: string
  grade_level: string
  student_count: number
  assignment_count: number
}

type StudentReport = {
  student_id: number
  display_name: string
  email: string
  total_xp: number
  completed_missions: number
}

type Assignment = {
  id: number
  title: string
  mission_ids: string[]
  due_date: string | null
}

type ParentStudent = {
  id: number
  display_name: string
  email: string
  total_xp: number
  completed_missions: number
}

type ParentGoal = {
  id: number
  student_id: number
  title: string
  target_xp: number
  target_mission_count: number
  due_date: string | null
  is_completed: boolean
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000'
const SAVE_KEY = 'gc-science-save-v1'
const AUTH_KEY = 'gc-science-auth-v1'
const EXTRA_SAVE_KEY = 'gc-science-extra-v1'

type SaveState = {
  playerName: string
  totalXp: number
  completedMissionIds: string[]
}

type ExtraSaveState = {
  escapedRoomIds: string[]
  completedResearchIds: string[]
  completedScenarioIds: string[]
}

const defaultSave: SaveState = {
  playerName: 'Scientist',
  totalXp: 0,
  completedMissionIds: [],
}

const defaultExtra: ExtraSaveState = {
  escapedRoomIds: [],
  completedResearchIds: [],
  completedScenarioIds: [],
}

function App() {
  const [view, setView] = useState<'game' | 'teacher' | 'parent' | 'account'>('game')
  const [gameMode, setGameMode] = useState<GameMode>('portal')
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authRole, setAuthRole] = useState<UserRole>('student')

  const [labs, setLabs] = useState<Lab[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [playerName, setPlayerName] = useState<string>(defaultSave.playerName)
  const [totalXp, setTotalXp] = useState<number>(defaultSave.totalXp)
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>(defaultSave.completedMissionIds)
  const [escapedRoomIds, setEscapedRoomIds] = useState<string[]>(defaultExtra.escapedRoomIds)
  const [completedResearchIds, setCompletedResearchIds] = useState<string[]>(defaultExtra.completedResearchIds)
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(defaultExtra.completedScenarioIds)
  const [selectedLabId, setSelectedLabId] = useState<string>('')
  const [selectedMissionId, setSelectedMissionId] = useState<string>('')
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [missionStartedAt, setMissionStartedAt] = useState<number>(Date.now())
  const [status, setStatus] = useState<string>('Loading missions...')
  const [result, setResult] = useState<AttemptResult | null>(null)

  const [classes, setClasses] = useState<Classroom[]>([])
  const [teacherClassName, setTeacherClassName] = useState('')
  const [teacherGradeLevel, setTeacherGradeLevel] = useState('6')
  const [enrollClassId, setEnrollClassId] = useState<number>(0)
  const [studentEmailToEnroll, setStudentEmailToEnroll] = useState('')
  const [assignmentClassId, setAssignmentClassId] = useState<number>(0)
  const [assignmentTitle, setAssignmentTitle] = useState('')
  const [assignmentMissionIds, setAssignmentMissionIds] = useState('')
  const [selectedClassReportId, setSelectedClassReportId] = useState<number>(0)
  const [reportStudents, setReportStudents] = useState<StudentReport[]>([])
  const [reportAssignments, setReportAssignments] = useState<Assignment[]>([])

  const [linkedStudents, setLinkedStudents] = useState<ParentStudent[]>([])
  const [parentGoals, setParentGoals] = useState<ParentGoal[]>([])
  const [studentEmailToLink, setStudentEmailToLink] = useState('')
  const [goalStudentId, setGoalStudentId] = useState<number>(0)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalTargetXp, setGoalTargetXp] = useState<number>(400)
  const [goalTargetMissions, setGoalTargetMissions] = useState<number>(4)

  const apiFetch = async (path: string, init?: RequestInit) => {
    const headers = new Headers(init?.headers)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    if (init?.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
    })
  }

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY)
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth) as { token: string }
        setToken(parsed.token)
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }

    const saved = localStorage.getItem(SAVE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SaveState
        setPlayerName(parsed.playerName)
        setTotalXp(parsed.totalXp)
        setCompletedMissionIds(parsed.completedMissionIds)
      } catch {
        localStorage.removeItem(SAVE_KEY)
      }
    }

    const savedExtra = localStorage.getItem(EXTRA_SAVE_KEY)
    if (savedExtra) {
      try {
        const parsed = JSON.parse(savedExtra) as ExtraSaveState
        setEscapedRoomIds(parsed.escapedRoomIds ?? [])
        setCompletedResearchIds(parsed.completedResearchIds ?? [])
        setCompletedScenarioIds(parsed.completedScenarioIds ?? [])
      } catch {
        localStorage.removeItem(EXTRA_SAVE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const [labsResponse, missionsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/labs`),
          fetch(`${API_BASE}/api/missions`),
        ])
        if (!labsResponse.ok || !missionsResponse.ok) {
          throw new Error('Unable to load missions from API')
        }
        const labsPayload = (await labsResponse.json()) as { labs: Lab[] }
        const missionsPayload = (await missionsResponse.json()) as { missions: Mission[] }
        setLabs(labsPayload.labs)
        setMissions(missionsPayload.missions)
        if (labsPayload.labs.length > 0) {
          setSelectedLabId(labsPayload.labs[0].id)
        }
        setStatus('Mission control ready')
      } catch {
        setStatus('API offline. Start apps/api first.')
      }
    }

    load()
  }, [])

  useEffect(() => {
    const resolveMe = async () => {
      if (!token) {
        setUser(null)
        return
      }
      const response = await apiFetch('/auth/me')
      if (!response.ok) {
        setToken('')
        localStorage.removeItem(AUTH_KEY)
        setUser(null)
        return
      }
      const payload = (await response.json()) as { user: AuthUser }
      setUser(payload.user)
      setPlayerName(payload.user.displayName)
    }

    resolveMe()
  }, [token])

  useEffect(() => {
    const save: SaveState = {
      playerName,
      totalXp,
      completedMissionIds,
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
  }, [playerName, totalXp, completedMissionIds])

  useEffect(() => {
    const extra: ExtraSaveState = { escapedRoomIds, completedResearchIds, completedScenarioIds }
    localStorage.setItem(EXTRA_SAVE_KEY, JSON.stringify(extra))
  }, [escapedRoomIds, completedResearchIds, completedScenarioIds])

  useEffect(() => {
    if (!token) {
      return
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token }))
  }, [token])

  useEffect(() => {
    const pullCloudProgress = async () => {
      if (!user || (user.role !== 'student' && user.role !== 'admin')) {
        return
      }
      const response = await apiFetch('/api/player/progress')
      if (!response.ok) {
        return
      }
      const payload = (await response.json()) as {
        totalXp: number
        completedMissionIds: string[]
      }
      setTotalXp(payload.totalXp)
      setCompletedMissionIds(payload.completedMissionIds)
    }
    pullCloudProgress()
  }, [user?.sub])

  useEffect(() => {
    const syncCloudProgress = async () => {
      if (!user || (user.role !== 'student' && user.role !== 'admin')) {
        return
      }
      await apiFetch('/api/player/progress', {
        method: 'PUT',
        body: JSON.stringify({ totalXp, completedMissionIds }),
      })
    }
    syncCloudProgress()
  }, [totalXp, completedMissionIds, user?.sub])

  const selectedLab = useMemo(
    () => labs.find((lab) => lab.id === selectedLabId) ?? null,
    [labs, selectedLabId],
  )

  const unlockedLabIds = useMemo(() => {
    return new Set(labs.filter((lab) => totalXp >= lab.unlockXp).map((lab) => lab.id))
  }, [labs, totalXp])

  const missionsInSelectedLab = useMemo(
    () => missions.filter((mission) => mission.labId === selectedLabId),
    [missions, selectedLabId],
  )

  const isMissionUnlocked = (mission: Mission) => {
    if (!unlockedLabIds.has(mission.labId)) {
      return false
    }
    if (!mission.isBoss) {
      return true
    }
    const required = missions.filter((entry) => entry.labId === mission.labId && !entry.isBoss)
    return required.every((entry) => completedMissionIds.includes(entry.id))
  }

  useEffect(() => {
    if (missionsInSelectedLab.length === 0) {
      setSelectedMissionId('')
      return
    }

    const firstUnlocked = missionsInSelectedLab.find((mission) => isMissionUnlocked(mission))
    if (!firstUnlocked) {
      setSelectedMissionId('')
      return
    }

    const stillValid = missionsInSelectedLab.some((mission) => mission.id === selectedMissionId)
    if (!stillValid) {
      setSelectedMissionId(firstUnlocked.id)
      setSelectedChoice(null)
      setResult(null)
      setMissionStartedAt(Date.now())
    }
  }, [missionsInSelectedLab, selectedMissionId, completedMissionIds, unlockedLabIds])

  const selectedMission = useMemo(
    () => missions.find((mission) => mission.id === selectedMissionId),
    [missions, selectedMissionId],
  )

  const submitAttempt = async () => {
    if (!selectedMission || selectedChoice === null) {
      return
    }

    const secondsSpent = Math.max(1, Math.floor((Date.now() - missionStartedAt) / 1000))
    const response = await apiFetch('/api/attempts', {
      method: 'POST',
      body: JSON.stringify({
        missionId: selectedMission.id,
        selectedIndex: selectedChoice,
        secondsSpent,
        userId: user?.sub,
        totalXp,
        completedMissionIds,
      }),
    })

    if (!response.ok) {
      setStatus('Attempt failed. Confirm API is running.')
      return
    }

    const payload = (await response.json()) as AttemptResult
    setResult(payload)

    const firstClear = payload.result === 'correct' && !completedMissionIds.includes(selectedMission.id)
    const xpAwarded = firstClear ? payload.xpEarned : Math.max(10, Math.floor(payload.xpEarned * 0.25))

    if (firstClear) {
      setCompletedMissionIds((current) => [...current, selectedMission.id])
    }

    setTotalXp((current) => current + xpAwarded)
    setStatus(
      payload.result === 'correct'
        ? `Great work, ${playerName}. Correct prediction! +${xpAwarded} XP`
        : 'Keep iterating. Review explanation and retry.',
    )
  }

  const switchMission = (missionId: string) => {
    setSelectedMissionId(missionId)
    setSelectedChoice(null)
    setResult(null)
    setMissionStartedAt(Date.now())
  }

  const chooseLab = (labId: string) => {
    setSelectedLabId(labId)
    setSelectedChoice(null)
    setResult(null)
    setMissionStartedAt(Date.now())
  }

  const badgeList = useMemo(() => {
    const badges: string[] = []
    if (totalXp >= 200) badges.push('Rookie Scientist')
    if (completedMissionIds.includes('energy-lab-boss')) badges.push('Energy Engineer')
    if (completedMissionIds.includes('ecosystem-lab-boss')) badges.push('Ecosystem Strategist')
    if (completedMissionIds.includes('earth-lab-boss')) badges.push('Climate Commander')
    if (completedMissionIds.includes('human-impact-lab-boss')) badges.push('Planet Guardian')
    if (escapedRoomIds.length >= 3) badges.push('Escape Artist')
    if (escapedRoomIds.length === 6) badges.push('Master Escapist')
    if (completedResearchIds.length >= 2) badges.push('Lead Researcher')
    if (completedScenarioIds.length >= 2) badges.push('Scenario Scientist')
    return badges
  }, [totalXp, completedMissionIds, escapedRoomIds, completedResearchIds, completedScenarioIds])

  const completedCount = completedMissionIds.length
  const totalMissionCount = missions.length

  const handleEscapeRoomComplete = (roomId: string, xpEarned: number) => {
    if (!escapedRoomIds.includes(roomId)) {
      setEscapedRoomIds((prev) => [...prev, roomId])
      setTotalXp((prev) => prev + xpEarned)
      setStatus(`Escaped! +${xpEarned} XP earned.`)
    }
  }

  const handleResearchComplete = (missionId: string, xpEarned: number) => {
    if (!completedResearchIds.includes(missionId)) {
      setCompletedResearchIds((prev) => [...prev, missionId])
      setTotalXp((prev) => prev + xpEarned)
      setStatus(`Research report complete! +${xpEarned} XP earned.`)
    }
  }

  const handleScenarioComplete = (scenarioId: string, xpEarned: number) => {
    if (!completedScenarioIds.includes(scenarioId)) {
      setCompletedScenarioIds((prev) => [...prev, scenarioId])
      setTotalXp((prev) => prev + xpEarned)
      setStatus(`Scenario complete! +${xpEarned} XP earned.`)
    }
  }

  const handleMiniGameXp = (xp: number) => {
    if (xp > 0) {
      setTotalXp((prev) => prev + xp)
      setStatus(`Mini-game complete! +${xp} XP earned.`)
    }
  }

  const resetProgress = () => {
    setCompletedMissionIds([])
    setEscapedRoomIds([])
    setCompletedResearchIds([])
    setCompletedScenarioIds([])
    setTotalXp(0)
    setStatus('Progress reset. Academy rebooted.')
  }

  const onAuthSubmit = async () => {
    const endpoint = authMode === 'register' ? '/auth/register' : '/auth/login'
    const payload =
      authMode === 'register'
        ? {
            email: authEmail,
            password: authPassword,
            displayName: playerName,
            role: authRole,
          }
        : {
            email: authEmail,
            password: authPassword,
          }

    const response = await apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setStatus('Authentication failed. Check email/password or role selection.')
      return
    }

    const resultPayload = (await response.json()) as {
      token: string
      user: AuthUser
    }

    setToken(resultPayload.token)
    setUser(resultPayload.user)
    setPlayerName(resultPayload.user.displayName)
    setStatus(`Signed in as ${resultPayload.user.displayName} (${resultPayload.user.role})`)
  }

  const signOut = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
    setStatus('Signed out.')
  }

  const loadTeacherClasses = async () => {
    const response = await apiFetch('/api/teacher/classes')
    if (!response.ok) {
      setStatus('Unable to load teacher classes.')
      return
    }
    const payload = (await response.json()) as { classes: Classroom[] }
    setClasses(payload.classes)
    if (payload.classes.length > 0) {
      setEnrollClassId(payload.classes[0].id)
      setAssignmentClassId(payload.classes[0].id)
      setSelectedClassReportId(payload.classes[0].id)
    }
  }

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return
    }
    loadTeacherClasses()
  }, [user?.sub])

  const createClassroom = async () => {
    const response = await apiFetch('/api/teacher/classes', {
      method: 'POST',
      body: JSON.stringify({ name: teacherClassName, gradeLevel: teacherGradeLevel }),
    })
    if (!response.ok) {
      setStatus('Failed to create class.')
      return
    }
    setTeacherClassName('')
    await loadTeacherClasses()
    setStatus('Class created successfully.')
  }

  const enrollStudent = async () => {
    const response = await apiFetch('/api/teacher/enroll', {
      method: 'POST',
      body: JSON.stringify({ classId: enrollClassId, studentEmail: studentEmailToEnroll }),
    })
    if (!response.ok) {
      setStatus('Failed to enroll student. Ensure student account exists.')
      return
    }
    setStudentEmailToEnroll('')
    setStatus('Student enrolled successfully.')
    await loadTeacherReport()
  }

  const createAssignment = async () => {
    const missionIds = assignmentMissionIds
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const response = await apiFetch('/api/teacher/assignments', {
      method: 'POST',
      body: JSON.stringify({ classId: assignmentClassId, title: assignmentTitle, missionIds }),
    })
    if (!response.ok) {
      setStatus('Failed to create assignment.')
      return
    }
    setAssignmentTitle('')
    setAssignmentMissionIds('')
    setStatus('Assignment created successfully.')
    await loadTeacherReport()
    await loadTeacherClasses()
  }

  const loadTeacherReport = async () => {
    if (!selectedClassReportId) {
      return
    }
    const response = await apiFetch(`/api/teacher/classes/${selectedClassReportId}/report`)
    if (!response.ok) {
      setStatus('Unable to load class report.')
      return
    }
    const payload = (await response.json()) as {
      students: StudentReport[]
      assignments: Assignment[]
    }
    setReportStudents(payload.students)
    setReportAssignments(payload.assignments)
  }

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return
    }
    loadTeacherReport()
  }, [selectedClassReportId, user?.sub])

  const loadParentDashboard = async () => {
    const response = await apiFetch('/api/parent/students')
    if (!response.ok) {
      setStatus('Unable to load parent dashboard.')
      return
    }
    const payload = (await response.json()) as { students: ParentStudent[]; goals: ParentGoal[] }
    setLinkedStudents(payload.students)
    setParentGoals(payload.goals)
    if (payload.students.length > 0 && !goalStudentId) {
      setGoalStudentId(payload.students[0].id)
    }
  }

  useEffect(() => {
    if (!user || (user.role !== 'parent' && user.role !== 'admin')) {
      return
    }
    loadParentDashboard()
  }, [user?.sub])

  const linkStudent = async () => {
    const response = await apiFetch('/api/parent/link', {
      method: 'POST',
      body: JSON.stringify({ studentEmail: studentEmailToLink }),
    })
    if (!response.ok) {
      setStatus('Failed to link student account.')
      return
    }
    setStudentEmailToLink('')
    setStatus('Student linked to parent dashboard.')
    await loadParentDashboard()
  }

  const createGoal = async () => {
    const response = await apiFetch('/api/parent/goals', {
      method: 'POST',
      body: JSON.stringify({
        studentId: goalStudentId,
        title: goalTitle,
        targetXp: goalTargetXp,
        targetMissionCount: goalTargetMissions,
      }),
    })
    if (!response.ok) {
      setStatus('Failed to create parent goal.')
      return
    }
    setGoalTitle('')
    setStatus('Goal created.')
    await loadParentDashboard()
  }

  const completeGoal = async (goalId: number) => {
    const response = await apiFetch(`/api/parent/goals/${goalId}/complete`, {
      method: 'PATCH',
    })
    if (!response.ok) {
      setStatus('Unable to mark goal completed.')
      return
    }
    await loadParentDashboard()
  }

  const goToGamePortal = () => {
    setView('game')
    setGameMode('portal')
  }

  return (
    <main className="screen">
      <header className="topbar">
        <div>
          <p className="eyebrow">Grade 6 Science Academy</p>
          <h1>Science Academy: Game Portal</h1>
          <p className="subhead">Labs · Escape Rooms · Research Missions · Mini-Games · Scenarios</p>
        </div>
        <div className="player-panel">
          <label htmlFor="playerName">Scientist</label>
          <input
            id="playerName"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value || 'Scientist')}
          />
          <div className="xp-chip" aria-live="polite">
            XP {totalXp}
          </div>
          <div className="auth-indicator">{user ? `${user.displayName} (${user.role})` : 'Guest mode'}</div>
        </div>
      </header>

      <nav className="tabs">
        <button type="button" className={view === 'game' ? 'tab active' : 'tab'} onClick={goToGamePortal}>
          🎮 Game Portal
        </button>
        <button type="button" className={view === 'teacher' ? 'tab active' : 'tab'} onClick={() => setView('teacher')}>
          Teacher Dashboard
        </button>
        <button type="button" className={view === 'parent' ? 'tab active' : 'tab'} onClick={() => setView('parent')}>
          Parent Dashboard
        </button>
        <button type="button" className={view === 'account' ? 'tab active' : 'tab'} onClick={() => setView('account')}>
          Account
        </button>
      </nav>

      {view === 'account' && (
        <section className="panel account-panel">
          <h2>Accounts and Cloud Save</h2>
          <p>Register as student, teacher, or parent to enable PostgreSQL cloud save and role dashboards.</p>
          <div className="form-grid">
            <label>
              Mode
              <select value={authMode} onChange={(event) => setAuthMode(event.target.value as 'login' | 'register')}>
                <option value="login">Login</option>
                <option value="register">Register</option>
              </select>
            </label>

            {authMode === 'register' && (
              <label>
                Role
                <select value={authRole} onChange={(event) => setAuthRole(event.target.value as UserRole)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </label>
            )}

            <label>
              Email
              <input value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} />
            </label>

            <label>
              Password
              <input type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} />
            </label>

            <button type="button" className="submit" onClick={onAuthSubmit}>
              {authMode === 'register' ? 'Create Account' : 'Sign In'}
            </button>

            {user && (
              <button type="button" className="reset" onClick={signOut}>
                Sign Out
              </button>
            )}
          </div>
        </section>
      )}

      {view === 'game' && gameMode === 'portal' && (
        <GamePortal
          totalXp={totalXp}
          completedMissionIds={completedMissionIds}
          escapedRoomIds={escapedRoomIds}
          completedResearchIds={completedResearchIds}
          completedScenarioIds={completedScenarioIds}
          onSelect={(mode) => setGameMode(mode)}
        />
      )}

      {view === 'game' && gameMode === 'escape-rooms' && (
        <EscapeRoomGame
          escapedRoomIds={escapedRoomIds}
          onEscape={handleEscapeRoomComplete}
          onBack={() => setGameMode('portal')}
        />
      )}

      {view === 'game' && gameMode === 'research' && (
        <ResearchMissionGame
          completedResearchIds={completedResearchIds}
          onComplete={handleResearchComplete}
          onBack={() => setGameMode('portal')}
        />
      )}

      {view === 'game' && gameMode === 'mini-games' && (
        <MiniGamePlay
          onXpEarned={handleMiniGameXp}
          onBack={() => setGameMode('portal')}
        />
      )}

      {view === 'game' && gameMode === 'scenarios' && (
        <ScenarioGame
          completedScenarioIds={completedScenarioIds}
          onComplete={handleScenarioComplete}
          onBack={() => setGameMode('portal')}
        />
      )}

      {view === 'game' && gameMode === 'labs' && <section className="layout">
        <aside className="panel lab-list">
          <button type="button" className="back-btn portal-back" onClick={() => setGameMode('portal')}>
            ← Game Portal
          </button>
          <h2>Academy Map</h2>
          {labs.map((lab) => {
            const unlocked = unlockedLabIds.has(lab.id)
            const completedInLab = missions.filter((m) => m.labId === lab.id && completedMissionIds.includes(m.id)).length
            const totalInLab = missions.filter((m) => m.labId === lab.id).length
            return (
              <button
                type="button"
                key={lab.id}
                className={lab.id === selectedLabId ? 'lab active' : 'lab'}
                onClick={() => unlocked && chooseLab(lab.id)}
                disabled={!unlocked}
                style={{ borderLeftColor: lab.color }}
              >
                <strong>{lab.title}</strong>
                <span>{unlocked ? `${completedInLab}/${totalInLab} complete` : `Unlocks at ${lab.unlockXp} XP`}</span>
              </button>
            )
          })}

          <div className="progress-box">
            <p>
              Campaign Progress: {completedCount}/{totalMissionCount}
            </p>
            <button type="button" className="reset" onClick={resetProgress}>
              Reset Progress
            </button>
          </div>
        </aside>

        <section className="panel mission-play">
          {selectedLab ? (
            <>
              <h2>{selectedLab.title}</h2>
              <p className="scenario">{selectedLab.description}</p>

              <div className="mission-strip">
                {missionsInSelectedLab.map((mission) => {
                  const unlocked = isMissionUnlocked(mission)
                  const completed = completedMissionIds.includes(mission.id)
                  return (
                    <button
                      type="button"
                      key={mission.id}
                      className={mission.id === selectedMissionId ? 'mission active' : 'mission'}
                      onClick={() => unlocked && switchMission(mission.id)}
                      disabled={!unlocked}
                    >
                      <strong>{mission.title}</strong>
                      <span>{mission.standardCodes.join(', ')}</span>
                      <em>
                        {completed ? 'Completed' : unlocked ? mission.isBoss ? 'Boss Mission' : 'Ready' : 'Locked'}
                      </em>
                    </button>
                  )
                })}
              </div>

              {selectedMission ? (
                <>
                  <p className="prompt">{selectedMission.prompt}</p>

                  <div className="choices">
                    {selectedMission.choices.map((choice, index) => (
                      <button
                        type="button"
                        key={choice}
                        className={selectedChoice === index ? 'choice picked' : 'choice'}
                        onClick={() => setSelectedChoice(index)}
                        disabled={!isMissionUnlocked(selectedMission)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="submit"
                    onClick={submitAttempt}
                    disabled={selectedChoice === null || !isMissionUnlocked(selectedMission)}
                  >
                    Submit Prediction
                  </button>

                  {result && (
                    <article className="result" aria-live="polite">
                      <h3>{result.result === 'correct' ? 'Correct' : 'Not Yet'}</h3>
                      <p>{result.explanation}</p>
                      <p>Standards: {result.standards.join(', ')}</p>
                    </article>
                  )}
                </>
              ) : (
                <p>This lab is locked. Earn more XP in earlier labs.</p>
              )}
            </>
          ) : (
            <p>No labs loaded.</p>
          )}
        </section>

        <aside className="panel badges">
          <h2>Achievements</h2>
          {badgeList.length === 0 ? (
            <p>Complete missions to unlock badges.</p>
          ) : (
            <ul>
              {badgeList.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          )}
          <p className="small-note">Progress auto-saves in your browser.</p>
        </aside>
      </section>}

      {view === 'teacher' && (
        <section className="panel dashboard">
          <h2>Teacher Dashboard</h2>
          {user && (user.role === 'teacher' || user.role === 'admin') ? (
            <>
              <div className="dashboard-grid">
                <div>
                  <h3>Create Class</h3>
                  <label>
                    Class Name
                    <input value={teacherClassName} onChange={(event) => setTeacherClassName(event.target.value)} />
                  </label>
                  <label>
                    Grade
                    <input value={teacherGradeLevel} onChange={(event) => setTeacherGradeLevel(event.target.value)} />
                  </label>
                  <button type="button" className="submit" onClick={createClassroom}>
                    Create
                  </button>
                </div>

                <div>
                  <h3>Enroll Student</h3>
                  <label>
                    Class
                    <select value={enrollClassId} onChange={(event) => setEnrollClassId(Number(event.target.value))}>
                      <option value={0}>Select class</option>
                      {classes.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Student Email
                    <input value={studentEmailToEnroll} onChange={(event) => setStudentEmailToEnroll(event.target.value)} />
                  </label>
                  <button type="button" className="submit" onClick={enrollStudent}>
                    Enroll
                  </button>
                </div>

                <div>
                  <h3>Create Assignment</h3>
                  <label>
                    Class
                    <select value={assignmentClassId} onChange={(event) => setAssignmentClassId(Number(event.target.value))}>
                      <option value={0}>Select class</option>
                      {classes.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Assignment Title
                    <input value={assignmentTitle} onChange={(event) => setAssignmentTitle(event.target.value)} />
                  </label>
                  <label>
                    Mission IDs (comma-separated)
                    <input value={assignmentMissionIds} onChange={(event) => setAssignmentMissionIds(event.target.value)} />
                  </label>
                  <button type="button" className="submit" onClick={createAssignment}>
                    Publish
                  </button>
                </div>
              </div>

              <div className="report-panel">
                <h3>Mastery Report</h3>
                <label>
                  Class
                  <select
                    value={selectedClassReportId}
                    onChange={(event) => setSelectedClassReportId(Number(event.target.value))}
                  >
                    <option value={0}>Select class</option>
                    {classes.map((classroom) => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" className="submit" onClick={loadTeacherReport}>
                  Refresh Report
                </button>

                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Total XP</th>
                      <th>Completed Missions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportStudents.map((student) => (
                      <tr key={student.student_id}>
                        <td>{student.display_name}</td>
                        <td>{student.email}</td>
                        <td>{student.total_xp}</td>
                        <td>{student.completed_missions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Assignments</h4>
                <ul>
                  {reportAssignments.map((assignment) => (
                    <li key={assignment.id}>
                      {assignment.title} - {(assignment.mission_ids ?? []).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>Sign in with a teacher account to use this dashboard.</p>
          )}
        </section>
      )}

      {view === 'parent' && (
        <section className="panel dashboard">
          <h2>Parent Dashboard</h2>
          {user && (user.role === 'parent' || user.role === 'admin') ? (
            <>
              <div className="dashboard-grid">
                <div>
                  <h3>Link Student</h3>
                  <label>
                    Student Email
                    <input value={studentEmailToLink} onChange={(event) => setStudentEmailToLink(event.target.value)} />
                  </label>
                  <button type="button" className="submit" onClick={linkStudent}>
                    Link
                  </button>
                </div>

                <div>
                  <h3>Set Progress Goal</h3>
                  <label>
                    Student
                    <select value={goalStudentId} onChange={(event) => setGoalStudentId(Number(event.target.value))}>
                      <option value={0}>Select linked student</option>
                      {linkedStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.display_name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Goal Title
                    <input value={goalTitle} onChange={(event) => setGoalTitle(event.target.value)} />
                  </label>
                  <label>
                    Target XP
                    <input
                      type="number"
                      value={goalTargetXp}
                      onChange={(event) => setGoalTargetXp(Number(event.target.value))}
                    />
                  </label>
                  <label>
                    Target Missions
                    <input
                      type="number"
                      value={goalTargetMissions}
                      onChange={(event) => setGoalTargetMissions(Number(event.target.value))}
                    />
                  </label>
                  <button type="button" className="submit" onClick={createGoal}>
                    Create Goal
                  </button>
                </div>
              </div>

              <div className="report-panel">
                <h3>Student Progress</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Total XP</th>
                      <th>Completed Missions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkedStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.display_name}</td>
                        <td>{student.email}</td>
                        <td>{student.total_xp}</td>
                        <td>{student.completed_missions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Goals</h4>
                <ul>
                  {parentGoals.map((goal) => (
                    <li key={goal.id}>
                      <strong>{goal.title}</strong> - XP {goal.target_xp}, Missions {goal.target_mission_count}{' '}
                      {goal.is_completed ? (
                        <span>(Completed)</span>
                      ) : (
                        <button type="button" className="reset" onClick={() => completeGoal(goal.id)}>
                          Mark Complete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>Sign in with a parent account to use this dashboard.</p>
          )}
        </section>
      )}

      <footer className="status">{status}</footer>
    </main>
  )
}

export default App
