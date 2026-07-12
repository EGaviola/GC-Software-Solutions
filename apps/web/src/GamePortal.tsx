import { getDailyChallenge, getWeeklyTheme, getSeasonalEvent } from './miniGameData'

export type GameMode = 'portal' | 'labs' | 'escape-rooms' | 'research' | 'mini-games' | 'scenarios'

type GameCard = {
  mode: GameMode
  title: string
  emoji: string
  description: string
  badge?: string
  color: string
}

const GAME_CARDS: GameCard[] = [
  {
    mode: 'labs',
    title: 'Lab Experiments',
    emoji: '🧪',
    description: 'Master Grade 6 science through progressive lab missions. Unlock new labs, earn XP, and defeat boss challenges.',
    badge: 'Classic',
    color: '#1f7a8c',
  },
  {
    mode: 'escape-rooms',
    title: 'Science Escape Rooms',
    emoji: '🔐',
    description: 'Trapped! Solve real science puzzles to unlock each door. You cannot leave until every problem is solved.',
    badge: 'New',
    color: '#7c3aed',
  },
  {
    mode: 'research',
    title: 'Research Missions',
    emoji: '🔬',
    description: 'Lead scientific investigations across climate, forensics, and genetics. Build a complete research report.',
    badge: 'New',
    color: '#0891b2',
  },
  {
    mode: 'mini-games',
    title: 'Mini-Games',
    emoji: '⚡',
    description: 'Rapid-fire science quizzes against the clock. Answer quickly for maximum XP!',
    badge: 'New',
    color: '#d97706',
  },
  {
    mode: 'scenarios',
    title: 'Scientific Scenarios',
    emoji: '🌍',
    description: 'Apply science to real-world decision-making scenarios. Every choice has consequences — choose wisely.',
    badge: 'New',
    color: '#059669',
  },
]

type Props = {
  totalXp: number
  completedMissionIds: string[]
  escapedRoomIds: string[]
  completedResearchIds: string[]
  onSelect: (mode: GameMode) => void
}

export default function GamePortal({ totalXp, completedMissionIds, escapedRoomIds, completedResearchIds, onSelect }: Props) {
  const daily = getDailyChallenge()
  const weeklyTheme = getWeeklyTheme()
  const seasonal = getSeasonalEvent()

  const todayKey = `gc-daily-${new Date().toDateString()}`
  const dailyDone = typeof window !== 'undefined' && !!localStorage.getItem(todayKey)

  return (
    <div className="portal-wrapper">
      <div className="portal-events">
        <div className="event-card seasonal">
          <span className="event-emoji">{seasonal.emoji}</span>
          <div>
            <strong>{seasonal.title}</strong>
            <p>{seasonal.description}</p>
          </div>
        </div>
        <div className="event-card weekly">
          <span className="event-emoji">{weeklyTheme.emoji}</span>
          <div>
            <strong>{weeklyTheme.title}</strong>
            <p>{weeklyTheme.description}</p>
          </div>
        </div>
        <div className="event-card daily" onClick={() => onSelect('mini-games')} style={{ cursor: 'pointer' }}>
          <span className="event-emoji">{daily.emoji}</span>
          <div>
            <strong>Daily Challenge {dailyDone ? '✅' : '🔴 NEW'}</strong>
            <p>{daily.title} — {daily.xpReward} XP</p>
          </div>
        </div>
      </div>

      <h2 className="portal-heading">Choose Your Game</h2>

      <div className="portal-grid">
        {GAME_CARDS.map((card) => {
          let progress = ''
          if (card.mode === 'labs') {
            progress = `${completedMissionIds.length} missions completed`
          } else if (card.mode === 'escape-rooms') {
            progress = `${escapedRoomIds.length}/6 rooms escaped`
          } else if (card.mode === 'research') {
            progress = `${completedResearchIds.length}/3 investigations done`
          }

          return (
            <button
              key={card.mode}
              type="button"
              className="game-card"
              style={{ '--card-color': card.color } as React.CSSProperties}
              onClick={() => onSelect(card.mode)}
            >
              {card.badge && <span className="game-card-badge">{card.badge}</span>}
              <span className="game-card-emoji">{card.emoji}</span>
              <strong className="game-card-title">{card.title}</strong>
              <p className="game-card-desc">{card.description}</p>
              {progress && <span className="game-card-progress">{progress}</span>}
            </button>
          )
        })}
      </div>

      <div className="portal-stats">
        <div className="stat-chip">
          <span className="stat-label">Total XP</span>
          <span className="stat-value">⭐ {totalXp}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-label">Missions</span>
          <span className="stat-value">🎯 {completedMissionIds.length}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-label">Rooms Escaped</span>
          <span className="stat-value">🔐 {escapedRoomIds.length}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-label">Research Reports</span>
          <span className="stat-value">🔬 {completedResearchIds.length}</span>
        </div>
      </div>
    </div>
  )
}
