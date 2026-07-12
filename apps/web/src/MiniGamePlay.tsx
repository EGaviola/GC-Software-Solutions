import { useState, useEffect, useRef } from 'react'
import { miniGames, getDailyChallenge, type MiniGame, type DailyChallenge } from './miniGameData'

type Props = {
  onXpEarned: (xp: number) => void
  onBack: () => void
}

export default function MiniGamePlay({ onXpEarned, onBack }: Props) {
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null)
  const [dailyMode, setDailyMode] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [timedOut, setTimedOut] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [totalXpEarned, setTotalXpEarned] = useState(0)
  const [dailyChallenge] = useState<DailyChallenge>(getDailyChallenge())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    if (!selectedGame || showResult !== null || gameOver) {
      clearTimer()
      return
    }
    setTimeLeft(selectedGame.timePerQuestion)
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer()
          setTimedOut(true)
          setShowResult('incorrect')
          setTimeout(() => {
            advanceQuestion(false)
          }, 1800)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return clearTimer
  }, [currentQ, selectedGame, gameOver])

  const advanceQuestion = (correct: boolean) => {
    if (!selectedGame) return
    const earned = correct ? selectedGame.xpPerCorrect : 0
    const newScore = score + (correct ? 1 : 0)
    const newXp = totalXpEarned + earned
    setScore(newScore)
    setTotalXpEarned(newXp)

    const isLast = currentQ === selectedGame.questions.length - 1
    setTimeout(() => {
      if (isLast) {
        setGameOver(true)
        onXpEarned(newXp)
      } else {
        setCurrentQ(currentQ + 1)
      }
      setSelectedChoice(null)
      setShowResult(null)
      setTimedOut(false)
    }, 1800)
  }

  const submitAnswer = () => {
    if (!selectedGame || selectedChoice === null || showResult !== null) return
    clearTimer()
    const question = selectedGame.questions[currentQ]
    const correct = selectedChoice === question.answerIndex
    setShowResult(correct ? 'correct' : 'incorrect')
    advanceQuestion(correct)
  }

  const submitDailyAnswer = () => {
    if (selectedChoice === null || showResult !== null) return
    const correct = selectedChoice === dailyChallenge.answerIndex
    setShowResult(correct ? 'correct' : 'incorrect')
    const xp = correct ? dailyChallenge.xpReward : 0
    setTotalXpEarned(xp)
    if (correct) {
      const todayKey = `gc-daily-${new Date().toDateString()}`
      localStorage.setItem(todayKey, '1')
      onXpEarned(xp)
    }
    setTimeout(() => {
      setGameOver(true)
    }, 2000)
  }

  const startGame = (game: MiniGame) => {
    setSelectedGame(game)
    setDailyMode(false)
    setCurrentQ(0)
    setScore(0)
    setTotalXpEarned(0)
    setSelectedChoice(null)
    setShowResult(null)
    setTimedOut(false)
    setGameOver(false)
  }

  const startDaily = () => {
    setSelectedGame(null)
    setDailyMode(true)
    setCurrentQ(0)
    setScore(0)
    setTotalXpEarned(0)
    setSelectedChoice(null)
    setShowResult(null)
    setTimedOut(false)
    setGameOver(false)
  }

  const exitGame = () => {
    clearTimer()
    setSelectedGame(null)
    setDailyMode(false)
    setGameOver(false)
    setScore(0)
    setCurrentQ(0)
    setTotalXpEarned(0)
    setSelectedChoice(null)
    setShowResult(null)
  }

  const todayKey = `gc-daily-${new Date().toDateString()}`
  const dailyDone = typeof window !== 'undefined' && !!localStorage.getItem(todayKey)

  if (!selectedGame && !dailyMode) {
    return (
      <div className="escape-lobby">
        <div className="escape-lobby-header">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back to Portal
          </button>
          <h2>⚡ Mini-Games</h2>
          <p className="escape-lobby-desc">
            Rapid-fire science questions. Beat the clock — faster answers mean more style points!
          </p>
        </div>

        <div className="escape-room-list">
          <button
            type="button"
            className={`escape-room-card ${dailyDone ? 'escaped' : ''}`}
            onClick={startDaily}
          >
            <span className="er-card-emoji">{dailyChallenge.emoji}</span>
            <div className="er-card-body">
              <strong>{dailyChallenge.title}</strong>
              <span className="er-card-tagline">Today's featured science challenge</span>
              <div className="er-card-meta">
                <span className="er-xp">{dailyChallenge.xpReward} XP</span>
                <span className="er-puzzles">1 question</span>
              </div>
            </div>
            {dailyDone && <span className="escaped-badge">✅ Done!</span>}
          </button>

          {miniGames.map((game) => (
            <button
              key={game.id}
              type="button"
              className="escape-room-card"
              onClick={() => startGame(game)}
            >
              <span className="er-card-emoji">{game.emoji}</span>
              <div className="er-card-body">
                <strong>{game.title}</strong>
                <span className="er-card-tagline">{game.description}</span>
                <div className="er-card-meta">
                  <span className="er-xp">{game.questions.length * game.xpPerCorrect} XP max</span>
                  <span className="er-puzzles">{game.questions.length} questions</span>
                  <span className="er-difficulty">{game.timePerQuestion}s each</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (dailyMode) {
    if (gameOver) {
      return (
        <div className="escape-victory">
          <div className="victory-icon">{dailyChallenge.emoji}</div>
          <h2>{showResult === 'correct' || totalXpEarned > 0 ? '🎉 Challenge Complete!' : '📚 Better Luck Tomorrow!'}</h2>
          <p className="victory-desc">{dailyChallenge.explanation}</p>
          {totalXpEarned > 0 && <div className="victory-xp">+{totalXpEarned} XP Earned</div>}
          <div className="victory-actions">
            <button type="button" className="submit" onClick={exitGame}>More Mini-Games</button>
            <button type="button" className="submit" onClick={onBack}>Back to Portal</button>
          </div>
        </div>
      )
    }
    return (
      <div className="escape-room-play">
        <div className="er-play-header">
          <button type="button" className="back-btn" onClick={exitGame}>← Exit</button>
          <div className="er-play-title">
            <span>{dailyChallenge.emoji}</span>
            <h2>Daily Challenge</h2>
          </div>
        </div>
        <div className="er-puzzle-card">
          <h3>{dailyChallenge.title}</h3>
          <p className="er-puzzle-prompt">{dailyChallenge.prompt}</p>
          <div className="choices">
            {dailyChallenge.choices.map((choice, index) => (
              <button
                key={choice}
                type="button"
                className={`choice ${selectedChoice === index ? 'picked' : ''} ${
                  showResult === 'incorrect' && selectedChoice === index ? 'wrong' : ''
                } ${showResult === 'correct' && index === dailyChallenge.answerIndex ? 'correct-flash' : ''}`}
                onClick={() => showResult === null && setSelectedChoice(index)}
                disabled={showResult !== null}
              >
                {choice}
              </button>
            ))}
          </div>
          {showResult === 'correct' && <div className="er-result correct" aria-live="polite">✅ Correct! +{dailyChallenge.xpReward} XP!</div>}
          {showResult === 'incorrect' && <div className="er-result incorrect" aria-live="polite">❌ Not quite. Review the explanation.</div>}
          {showResult === null && (
            <button type="button" className="submit" onClick={submitDailyAnswer} disabled={selectedChoice === null}>
              Submit Answer
            </button>
          )}
        </div>
      </div>
    )
  }

  if (gameOver && selectedGame) {
    return (
      <div className="escape-victory">
        <div className="victory-icon">{selectedGame.emoji}</div>
        <h2>🏁 Quiz Complete!</h2>
        <h3>{selectedGame.title}</h3>
        <p className="victory-desc">Score: {score}/{selectedGame.questions.length} correct</p>
        <div className="victory-xp">+{totalXpEarned} XP Earned</div>
        <div className="victory-actions">
          <button type="button" className="submit" onClick={exitGame}>Play Again</button>
          <button type="button" className="submit" onClick={onBack}>Back to Portal</button>
        </div>
      </div>
    )
  }

  if (!selectedGame) return null
  const question = selectedGame.questions[currentQ]
  const pct = (timeLeft / selectedGame.timePerQuestion) * 100

  return (
    <div className="escape-room-play">
      <div className="er-play-header">
        <button type="button" className="back-btn" onClick={exitGame}>← Exit Quiz</button>
        <div className="er-play-title">
          <span>{selectedGame.emoji}</span>
          <h2>{selectedGame.title}</h2>
        </div>
      </div>

      <div className="mini-game-status">
        <span>Question {currentQ + 1}/{selectedGame.questions.length}</span>
        <span className="mini-score">Score: {score}</span>
        <span className={`mini-timer ${timeLeft <= 5 ? 'urgent' : ''}`}>⏱ {timeLeft}s</span>
      </div>

      <div className="mini-timer-bar">
        <div className="mini-timer-fill" style={{ width: `${pct}%`, background: timeLeft <= 5 ? '#ef4444' : '#1f7a8c' }} />
      </div>

      <div className="er-puzzle-card">
        <p className="er-puzzle-prompt">{question.prompt}</p>
        <div className="choices">
          {question.choices.map((choice, index) => (
            <button
              key={choice}
              type="button"
              className={`choice ${selectedChoice === index ? 'picked' : ''} ${
                showResult === 'incorrect' && selectedChoice === index ? 'wrong' : ''
              } ${showResult === 'correct' && index === question.answerIndex ? 'correct-flash' : ''}`}
              onClick={() => showResult === null && !timedOut && setSelectedChoice(index)}
              disabled={showResult !== null || timedOut}
            >
              {choice}
            </button>
          ))}
        </div>
        {timedOut && showResult === 'incorrect' && (
          <div className="er-result incorrect" aria-live="polite">⏰ Time's up! The answer was: {question.choices[question.answerIndex]}</div>
        )}
        {showResult === 'correct' && <div className="er-result correct" aria-live="polite">✅ Correct! +{selectedGame.xpPerCorrect} XP</div>}
        {showResult === 'incorrect' && !timedOut && <div className="er-result incorrect" aria-live="polite">❌ Incorrect.</div>}
        {showResult === null && !timedOut && (
          <button type="button" className="submit" onClick={submitAnswer} disabled={selectedChoice === null}>
            Submit
          </button>
        )}
      </div>
    </div>
  )
}
