import { useState } from 'react'
import { escapeRooms, type EscapeRoom } from './escapeRoomData'

type Props = {
  escapedRoomIds: string[]
  onEscape: (roomId: string, xpEarned: number) => void
  onBack: () => void
}

type RoomState = {
  roomId: string
  selectedPuzzleIndex: number | null
  solvedSteps: number[]
  wrongAttempts: number[]
  escaped: boolean
}

export default function EscapeRoomGame({ escapedRoomIds, onEscape, onBack }: Props) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [roomState, setRoomState] = useState<RoomState | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)

  const selectedRoom: EscapeRoom | null = selectedRoomId
    ? escapeRooms.find((r) => r.id === selectedRoomId) ?? null
    : null

  const startRoom = (room: EscapeRoom) => {
    setSelectedRoomId(room.id)
    setRoomState({
      roomId: room.id,
      selectedPuzzleIndex: null,
      solvedSteps: [],
      wrongAttempts: [],
      escaped: false,
    })
    setSelectedChoice(null)
    setShowResult(null)
  }

  const submitAnswer = () => {
    if (!roomState || !selectedRoom || roomState.selectedPuzzleIndex === null || selectedChoice === null) return
    const puzzle = selectedRoom.puzzles[roomState.selectedPuzzleIndex]
    if (selectedChoice === puzzle.answerIndex) {
      const newSolved = [...roomState.solvedSteps, roomState.selectedPuzzleIndex]
      const isLastPuzzle = newSolved.length === selectedRoom.puzzles.length
      setShowResult('correct')
      setTimeout(() => {
        if (isLastPuzzle) {
          const updatedState: RoomState = { ...roomState, solvedSteps: newSolved, escaped: true }
          setRoomState(updatedState)
          onEscape(selectedRoom.id, selectedRoom.xpReward)
        } else {
          setRoomState({
            ...roomState,
            selectedPuzzleIndex: null,
            solvedSteps: newSolved,
          })
        }
        setSelectedChoice(null)
        setShowResult(null)
      }, 1800)
    } else {
      setShowResult('incorrect')
      const newWrong = [...roomState.wrongAttempts, roomState.selectedPuzzleIndex]
      setRoomState({ ...roomState, wrongAttempts: newWrong })
      setTimeout(() => {
        setSelectedChoice(null)
        setShowResult(null)
      }, 2200)
    }
  }

  const exitToRoomList = () => {
    setSelectedRoomId(null)
    setRoomState(null)
    setSelectedChoice(null)
    setShowResult(null)
  }

  const openBrick = (index: number) => {
    if (
      !roomState
      || roomState.solvedSteps.includes(index)
      || showResult !== null
    ) return
    setRoomState({ ...roomState, selectedPuzzleIndex: index })
    setSelectedChoice(null)
    setShowResult(null)
  }

  if (!selectedRoom || !roomState) {
    return (
      <div className="escape-lobby">
        <div className="escape-lobby-header">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back to Portal
          </button>
          <h2>🔐 Science Escape Rooms</h2>
          <p className="escape-lobby-desc">
            You are locked in. Every door requires science knowledge to open. Solve all puzzles to escape — you cannot leave until every problem is solved.
          </p>
        </div>

        <div className="escape-room-list">
          {escapeRooms.map((room) => {
            const escaped = escapedRoomIds.includes(room.id)
            return (
              <button
                key={room.id}
                type="button"
                className={`escape-room-card ${escaped ? 'escaped' : ''}`}
                onClick={() => startRoom(room)}
              >
                <span className="er-card-emoji">{room.emoji}</span>
                <div className="er-card-body">
                  <strong>{room.title}</strong>
                  <span className="er-card-tagline">{room.tagline}</span>
                  <div className="er-card-meta">
                    <span className="er-difficulty">{room.difficulty}</span>
                    <span className="er-xp">{room.xpReward} XP</span>
                    <span className="er-puzzles">{room.puzzles.length} puzzles</span>
                  </div>
                </div>
                {escaped && <span className="escaped-badge">✅ Escaped!</span>}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (roomState.escaped) {
    return (
      <div className="escape-victory">
        <div className="victory-icon">{selectedRoom.emoji}</div>
        <h2>🎉 You Escaped!</h2>
        <h3>{selectedRoom.title}</h3>
        <p className="victory-desc">
          Outstanding science knowledge! You solved all {selectedRoom.puzzles.length} puzzles and made it out.
        </p>
        <div className="victory-xp">+{selectedRoom.xpReward} XP Earned</div>
        <div className="victory-actions">
          <button type="button" className="submit" onClick={exitToRoomList}>
            Try Another Room
          </button>
          <button type="button" className="submit" onClick={onBack}>
            Back to Portal
          </button>
        </div>
      </div>
    )
  }

  const currentPuzzle = roomState.selectedPuzzleIndex !== null
    ? selectedRoom.puzzles[roomState.selectedPuzzleIndex]
    : null
  const activePuzzleNumber = roomState.selectedPuzzleIndex !== null ? roomState.selectedPuzzleIndex + 1 : null
  const totalPuzzles = selectedRoom.puzzles.length
  const solvedCount = roomState.solvedSteps.length

  return (
    <div className="escape-room-play escape-room-brick-wall">
      <div className="er-graffiti-layer" aria-hidden="true">
        <span className="er-gfx er-gfx-cmcss">CMCSS</span>
        <span className="er-gfx er-gfx-science">SCIENCE</span>
        <span className="er-gfx er-gfx-escape">ESCAPE!</span>
        <span className="er-gfx er-gfx-grade">6TH GRADE</span>
        <span className="er-gfx er-gfx-solve">SOLVE IT</span>
        <span className="er-gfx er-gfx-break">BREAK OUT</span>
      </div>
      <div className="er-play-header">
        <button type="button" className="back-btn" onClick={exitToRoomList}>
          ← Exit Room (⚠️ progress lost)
        </button>
        <div className="er-play-title">
          <span>{selectedRoom.emoji}</span>
          <h2>{selectedRoom.title}</h2>
        </div>
      </div>

      <div className="er-brick-board">
        <div className="er-brick-board-header">
          <span className="er-graffiti-tag">CMCSS</span>
          <span className="er-brick-board-note">
            {currentPuzzle
              ? 'Question displayed — answer it correctly to unlock that brick.'
              : 'Click any unsolved brick to display its question.'}
          </span>
        </div>

        <div className="er-brick-grid">
          {selectedRoom.puzzles.map((puzzle, i) => {
            const solved = roomState.solvedSteps.includes(i)
            const active = i === roomState.selectedPuzzleIndex
            return (
              <button
                key={puzzle.id}
                type="button"
                className={`er-brick ${solved ? 'solved' : ''} ${active ? 'active' : ''}`}
                onClick={() => openBrick(i)}
                disabled={solved || showResult !== null}
              >
                <span className="er-brick-label">Brick {i + 1}</span>
                <span className="er-brick-status">
                  {solved ? 'Unlocked' : active ? 'Question displayed' : 'Tap to display'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="er-progress-bar">
        {selectedRoom.puzzles.map((puzzle, i) => (
          <div
            key={puzzle.id}
            className={`er-progress-step ${roomState.solvedSteps.includes(i) ? 'done' : i === roomState.selectedPuzzleIndex ? 'active' : 'locked'}`}
          >
            {roomState.solvedSteps.includes(i) ? '✅' : i === roomState.selectedPuzzleIndex ? '🔓' : '🔒'}
            <span>Puzzle {i + 1}</span>
          </div>
        ))}
      </div>

      <div className="er-setting-box">
        <p className="er-setting-label">📍 Scene</p>
        <p>{selectedRoom.setting}</p>
      </div>

      <div className="er-locked-notice" aria-live="polite">
        🔒 {totalPuzzles - solvedCount} puzzle{totalPuzzles - solvedCount !== 1 ? 's' : ''} remaining before you can escape
      </div>

      {currentPuzzle ? (
        <div className="er-puzzle-card">
          <div className="er-puzzle-header">
            <span className="er-puzzle-step">Puzzle {activePuzzleNumber} of {totalPuzzles}</span>
            <h3>{currentPuzzle.title}</h3>
          </div>
          <p className="er-clue">{currentPuzzle.clue}</p>
          <p className="er-puzzle-prompt">{currentPuzzle.prompt}</p>

          <div className="choices">
            {currentPuzzle.choices.map((choice, index) => (
              <button
                key={choice}
                type="button"
                className={`choice ${selectedChoice === index ? 'picked' : ''} ${
                  showResult === 'incorrect' && selectedChoice === index ? 'wrong' : ''
                } ${showResult === 'correct' && index === currentPuzzle.answerIndex ? 'correct-flash' : ''}`}
                onClick={() => showResult === null && setSelectedChoice(index)}
                disabled={showResult !== null}
              >
                {choice}
              </button>
            ))}
          </div>

          {showResult === 'correct' && (
            <div className="er-result correct" aria-live="polite">
              ✅ Correct! Lock opened. <em>{currentPuzzle.explanation}</em>
            </div>
          )}

          {showResult === 'incorrect' && (
            <div className="er-result incorrect" aria-live="polite">
              ❌ Incorrect. You cannot leave until you solve this. Study the clue and try again.
              <br /><em>{currentPuzzle.explanation}</em>
            </div>
          )}

          {showResult === null && (
            <button
              type="button"
              className="submit"
              onClick={submitAnswer}
              disabled={selectedChoice === null}
            >
              Submit Answer
            </button>
          )}

          <p className="er-standard">Science standard: {currentPuzzle.standard}</p>
        </div>
      ) : (
        <div className="er-puzzle-card er-hidden-puzzle-card">
          <div className="er-puzzle-header">
            <span className="er-hidden-status">Question hidden</span>
            <h3>Choose a brick to reveal the next challenge</h3>
          </div>
          <p className="er-clue">
            You can select any unsolved brick to display its question. A brick only unlocks after you answer its science question correctly.
          </p>
        </div>
      )}
    </div>
  )
}
