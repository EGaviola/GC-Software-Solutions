import { useState } from 'react'
import { researchMissions, type ResearchMission } from './researchMissionData'

type Props = {
  completedResearchIds: string[]
  onComplete: (missionId: string, xpEarned: number) => void
  onBack: () => void
}

export default function ResearchMissionGame({ completedResearchIds, onComplete, onBack }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)
  const [missionComplete, setMissionComplete] = useState(false)

  const selectedMission: ResearchMission | null = selectedId
    ? researchMissions.find((m) => m.id === selectedId) ?? null
    : null

  const startMission = (mission: ResearchMission) => {
    setSelectedId(mission.id)
    setCurrentStep(0)
    setCompletedSteps([])
    setSelectedChoice(null)
    setShowResult(null)
    setMissionComplete(false)
  }

  const submitAnswer = () => {
    if (!selectedMission || selectedChoice === null) return
    const puzzle = selectedMission.puzzles[currentStep]
    if (selectedChoice === puzzle.answerIndex) {
      const newCompleted = [...completedSteps, currentStep]
      setShowResult('correct')
      setTimeout(() => {
        if (currentStep === selectedMission.puzzles.length - 1) {
          setCompletedSteps(newCompleted)
          setMissionComplete(true)
          onComplete(selectedMission.id, selectedMission.xpReward)
        } else {
          setCurrentStep(currentStep + 1)
          setCompletedSteps(newCompleted)
        }
        setSelectedChoice(null)
        setShowResult(null)
      }, 1800)
    } else {
      setShowResult('incorrect')
      setTimeout(() => {
        setSelectedChoice(null)
        setShowResult(null)
      }, 2200)
    }
  }

  const exitMission = () => {
    setSelectedId(null)
    setMissionComplete(false)
  }

  if (!selectedMission) {
    return (
      <div className="escape-lobby">
        <div className="escape-lobby-header">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back to Portal
          </button>
          <h2>🔬 Research Missions</h2>
          <p className="escape-lobby-desc">
            Lead scientific investigations. Answer each research question to complete your report and earn XP.
          </p>
        </div>
        <div className="escape-room-list">
          {researchMissions.map((mission) => {
            const done = completedResearchIds.includes(mission.id)
            return (
              <button
                key={mission.id}
                type="button"
                className={`escape-room-card ${done ? 'escaped' : ''}`}
                onClick={() => startMission(mission)}
              >
                <span className="er-card-emoji">{mission.emoji}</span>
                <div className="er-card-body">
                  <strong>{mission.title}</strong>
                  <span className="er-card-tagline">{mission.topic}</span>
                  <div className="er-card-meta">
                    <span className="er-difficulty">{mission.difficulty}</span>
                    <span className="er-xp">{mission.xpReward} XP</span>
                    <span className="er-puzzles">{mission.puzzles.length} questions</span>
                  </div>
                </div>
                {done && <span className="escaped-badge">✅ Complete!</span>}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (missionComplete) {
    return (
      <div className="escape-victory">
        <div className="victory-icon">{selectedMission.emoji}</div>
        <h2>📋 Research Report Complete!</h2>
        <h3>{selectedMission.title}</h3>
        <p className="victory-desc">Excellent investigation! Your research report has been submitted.</p>
        <div className="victory-xp">+{selectedMission.xpReward} XP Earned</div>
        <div className="victory-actions">
          <button type="button" className="submit" onClick={exitMission}>
            More Investigations
          </button>
          <button type="button" className="submit" onClick={onBack}>
            Back to Portal
          </button>
        </div>
      </div>
    )
  }

  const puzzle = selectedMission.puzzles[currentStep]

  return (
    <div className="escape-room-play">
      <div className="er-play-header">
        <button type="button" className="back-btn" onClick={exitMission}>
          ← Exit Investigation
        </button>
        <div className="er-play-title">
          <span>{selectedMission.emoji}</span>
          <h2>{selectedMission.title}</h2>
        </div>
      </div>

      <div className="er-progress-bar">
        {selectedMission.puzzles.map((p, i) => (
          <div
            key={p.id}
            className={`er-progress-step ${completedSteps.includes(i) ? 'done' : i === currentStep ? 'active' : 'locked'}`}
          >
            {completedSteps.includes(i) ? '✅' : i === currentStep ? '📋' : '⬜'}
            <span>Q{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="er-setting-box">
        <p className="er-setting-label">🔬 Research Briefing</p>
        <p>{selectedMission.briefing}</p>
      </div>

      <div className="er-puzzle-card">
        <div className="er-puzzle-header">
          <span className="er-puzzle-step">Question {currentStep + 1} of {selectedMission.puzzles.length}</span>
          <h3>{puzzle.title}</h3>
        </div>
        <p className="er-clue">{puzzle.context}</p>
        <p className="er-puzzle-prompt">{puzzle.prompt}</p>

        <div className="choices">
          {puzzle.choices.map((choice, index) => (
            <button
              key={choice}
              type="button"
              className={`choice ${selectedChoice === index ? 'picked' : ''} ${
                showResult === 'incorrect' && selectedChoice === index ? 'wrong' : ''
              } ${showResult === 'correct' && index === puzzle.answerIndex ? 'correct-flash' : ''}`}
              onClick={() => showResult === null && setSelectedChoice(index)}
              disabled={showResult !== null}
            >
              {choice}
            </button>
          ))}
        </div>

        {showResult === 'correct' && (
          <div className="er-result correct" aria-live="polite">
            ✅ Correct! <em>{puzzle.explanation}</em>
          </div>
        )}
        {showResult === 'incorrect' && (
          <div className="er-result incorrect" aria-live="polite">
            ❌ Not quite. <em>{puzzle.explanation}</em>
          </div>
        )}
        {showResult === null && (
          <button
            type="button"
            className="submit"
            onClick={submitAnswer}
            disabled={selectedChoice === null}
          >
            Submit Finding
          </button>
        )}
        <p className="er-standard">Standard: {puzzle.standard}</p>
      </div>
    </div>
  )
}
