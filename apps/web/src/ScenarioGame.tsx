import { useState } from 'react'

type ScenarioPuzzle = {
  id: string
  title: string
  context: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  standard: string
}

type Scenario = {
  id: string
  title: string
  emoji: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  puzzles: ScenarioPuzzle[]
  xpReward: number
}

const scenarios: Scenario[] = [
  {
    id: 'travel-through-time',
    title: 'Travel Through Time',
    emoji: '⏳',
    description: 'Jump across Earth\'s history — use science to interpret fossil records, climate shifts, and evolutionary events.',
    difficulty: 'Advanced',
    xpReward: 260,
    puzzles: [
      {
        id: 'tt-1',
        title: '65 Million Years Ago',
        context: 'You land just after the mass extinction event. Fossil records show a sudden gap with no large dinosaurs. Scientists found an iridium layer at the same geological stratum worldwide.',
        prompt: 'What does a global iridium spike at the K-Pg boundary most strongly suggest about the cause of the mass extinction?',
        choices: [
          'A slow change in global temperature over millions of years',
          'A catastrophic asteroid or comet impact, since iridium is rare on Earth but common in space rocks',
          'Widespread volcanic activity producing iridium from the mantle',
          'Evolution was accelerated by iridium dust',
        ],
        answerIndex: 1,
        explanation: 'Iridium is extremely rare in Earth\'s crust but abundant in asteroids and comets. A global iridium layer at the same geological time point worldwide is strong evidence of a catastrophic impact event (6.LS4.1 biological change evidence).',
        standard: '6.LS4.1',
      },
      {
        id: 'tt-2',
        title: '20,000 Years Ago — Ice Age',
        context: 'You arrive during the last glacial maximum. Ice sheets cover most of North America. You need to explain to local humans why the climate is so cold.',
        prompt: 'During an ice age, lower atmospheric CO₂ concentrations contribute to cooling. Which best explains the mechanism?',
        choices: [
          'Less CO₂ means fewer clouds, causing more rainfall',
          'Less CO₂ reduces the greenhouse effect, allowing more heat to escape Earth\'s atmosphere',
          'CO₂ blocks sunlight, so less CO₂ means more solar heating',
          'CO₂ concentration has no effect on global temperature',
        ],
        answerIndex: 1,
        explanation: 'CO₂ is a greenhouse gas that traps outgoing infrared radiation. During ice ages, lower CO₂ weakens the greenhouse effect, allowing more heat to escape and lowering global temperatures (6.ESS2.6).',
        standard: '6.ESS2.6',
      },
      {
        id: 'tt-3',
        title: 'The Year 2150',
        context: 'You arrive in a future where sea levels have risen 2 meters. Coastal cities are partially flooded. Temperatures are 3 °C warmer than today. What chain of events led here?',
        prompt: 'Which sequence of events best explains the 2-meter sea level rise?',
        choices: [
          'Increased rainfall filled ocean basins directly',
          'Rising temperatures melted land-based ice sheets and glaciers, adding water volume to oceans; warmer water also expanded thermally',
          'Tectonic plates shifted, raising ocean floors',
          'Moon\'s gravitational pull increased, raising tides permanently',
        ],
        answerIndex: 1,
        explanation: 'Sea level rise has two main causes: (1) thermal expansion of warming ocean water, and (2) melting of land-based ice (glaciers, ice sheets) adding water to the ocean. Both are direct consequences of rising global temperatures driven by increased greenhouse gases (6.ESS2.6, 6.ESS3.1).',
        standard: '6.ESS3.1',
      },
    ],
  },
  {
    id: 'deep-ocean-mission',
    title: 'Deep Ocean Mission',
    emoji: '🌊',
    description: 'Descend into the deep ocean to understand pressure, temperature, and the ecosystems that thrive in darkness.',
    difficulty: 'Intermediate',
    xpReward: 240,
    puzzles: [
      {
        id: 'do-1',
        title: 'Hydrothermal Vent Discovery',
        context: 'At 2,500 meters depth, your submersible discovers a hydrothermal vent community with tube worms, clams, and bacteria — no sunlight reaches this depth.',
        prompt: 'These deep-sea organisms cannot perform photosynthesis. What is the primary energy source for this ecosystem?',
        choices: [
          'They rely on organic material that sinks from the surface',
          'Chemosynthesis — bacteria use chemical energy from hydrogen sulfide released by vents to produce food',
          'Nuclear energy from the Earth\'s core heats the organisms directly',
          'Bioluminescence from fish provides the energy',
        ],
        answerIndex: 1,
        explanation: 'Chemosynthesis is the process by which bacteria convert chemical energy (from hydrogen sulfide and other compounds) into organic matter — no sunlight needed. This forms the base of vent food webs, showing that energy sources for ecosystems are not limited to photosynthesis (6.LS2.3).',
        standard: '6.LS2.3',
      },
      {
        id: 'do-2',
        title: 'Deep Pressure Challenge',
        context: 'At the ocean floor, pressure is over 600 atmospheres. Your submersible hull is being compressed. You must calculate which design modification withstands the pressure.',
        prompt: 'As depth increases, water pressure increases because:',
        choices: [
          'Water becomes heavier at depth due to temperature changes',
          'The weight of the water column above increases, exerting greater force per unit area',
          'Pressure decreases with depth because less oxygen is present',
          'Only temperature affects pressure in water',
        ],
        answerIndex: 1,
        explanation: 'Water pressure increases with depth because the weight of the water column above adds to the pressure on any surface below. Each additional 10 meters of water depth adds approximately 1 atmosphere of pressure — a direct application of fluid pressure concepts (6.PS3.1).',
        standard: '6.PS3.1',
      },
      {
        id: 'do-3',
        title: 'Ocean Circulation Disruption',
        context: 'Your instruments show the deep ocean current slowing dramatically. Researchers are concerned about global climate effects. Why do deep ocean currents matter for global climate?',
        prompt: 'How do deep ocean thermohaline currents affect global climate?',
        choices: [
          'They have no effect — only surface currents matter',
          'They redistribute thermal energy globally, moderating temperatures across continents and influencing regional climates',
          'They only affect fish migration patterns',
          'They decrease atmospheric CO₂ by absorbing it into the deep',
        ],
        answerIndex: 1,
        explanation: 'Thermohaline circulation (driven by temperature and salinity) transports enormous volumes of warm and cold water across ocean basins, redistributing thermal energy. This moderates climates in places like Western Europe and controls precipitation patterns worldwide (6.ESS2.2, 6.ESS2.3).',
        standard: '6.ESS2.3',
      },
    ],
  },
  {
    id: 'energy-city',
    title: 'Design an Energy City',
    emoji: '🏙️',
    description: 'You\'re the chief scientist designing a zero-carbon city. Every energy decision has consequences for people and the environment.',
    difficulty: 'Intermediate',
    xpReward: 250,
    puzzles: [
      {
        id: 'ec-1',
        title: 'Power Grid Planning',
        context: 'Your city of 500,000 needs reliable, clean electricity. You have a $10B budget and must choose the primary power generation strategy.',
        prompt: 'Which energy portfolio provides the most reliable, sustainable, and climate-friendly electricity supply?',
        choices: [
          'Coal with modern scrubbers — cheap and reliable',
          'Solar only — completely renewable',
          'Diverse mix of solar, wind, and geothermal with battery storage for grid stability',
          'Nuclear only — zero emissions',
        ],
        answerIndex: 2,
        explanation: 'A diversified renewable portfolio reduces dependence on any single source. Solar and wind complement each other across seasons and weather. Geothermal provides baseload power. Battery storage smooths out variability. This maximizes reliability while minimizing emissions (6.ESS3.2).',
        standard: '6.ESS3.2',
      },
      {
        id: 'ec-2',
        title: 'Urban Water Management',
        context: 'Your city receives irregular rainfall — heavy storms followed by dry months. You need a water management system that captures storm water and prevents droughts.',
        prompt: 'Which urban water management approach best addresses both flood risk and drought resilience?',
        choices: [
          'Pave all surfaces for efficient water runoff to rivers',
          'Install permeable pavement, green roofs, rain gardens, and underground cisterns to capture, infiltrate, and store storm water',
          'Restrict water use to residential areas only',
          'Import all water from distant reservoirs via pipeline',
        ],
        answerIndex: 1,
        explanation: 'Green infrastructure mimics natural water cycle processes. Permeable surfaces and rain gardens increase infiltration, reducing flood peaks. Cisterns store water for dry periods. This systems approach integrates human water needs with natural water cycle function (6.ESS2.4, 6.ESS2.5).',
        standard: '6.ESS2.4',
      },
      {
        id: 'ec-3',
        title: 'Urban Biodiversity Plan',
        context: 'Construction cleared 40% of native habitat. Your sustainability team must design green corridors to restore biodiversity in the urban landscape.',
        prompt: 'Which urban design feature most effectively supports biodiversity restoration in a city?',
        choices: [
          'Ornamental non-native flower gardens throughout the city',
          'Connected wildlife corridors using native plant species, linking urban parks to larger natural areas',
          'Eliminating all green space to maximize building density',
          'Introducing a single predator species to control urban wildlife',
        ],
        answerIndex: 1,
        explanation: 'Wildlife corridors allow species to move between habitat patches, maintain genetic diversity, and recolonize areas after disturbance. Native plants provide the right food and shelter for native wildlife. Connectivity is the key factor for urban biodiversity (6.LS4.1, 6.ETS1.1).',
        standard: '6.LS4.1',
      },
    ],
  },
]

type Props = {
  completedScenarioIds: string[]
  onComplete: (scenarioId: string, xpEarned: number) => void
  onBack: () => void
}

export default function ScenarioGame({ completedScenarioIds, onComplete, onBack }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)
  const [scenarioComplete, setScenarioComplete] = useState(false)

  const selectedScenario: Scenario | null = selectedId
    ? scenarios.find((s) => s.id === selectedId) ?? null
    : null

  const startScenario = (scenario: Scenario) => {
    setSelectedId(scenario.id)
    setCurrentStep(0)
    setCompletedSteps([])
    setSelectedChoice(null)
    setShowResult(null)
    setScenarioComplete(false)
  }

  const submitAnswer = () => {
    if (!selectedScenario || selectedChoice === null) return
    const puzzle = selectedScenario.puzzles[currentStep]
    const correct = selectedChoice === puzzle.answerIndex
    setShowResult(correct ? 'correct' : 'incorrect')
    const newCompleted = correct ? [...completedSteps, currentStep] : completedSteps

    setTimeout(() => {
      if (correct) {
        if (currentStep === selectedScenario.puzzles.length - 1) {
          setCompletedSteps(newCompleted)
          setScenarioComplete(true)
          onComplete(selectedScenario.id, selectedScenario.xpReward)
        } else {
          setCurrentStep(currentStep + 1)
          setCompletedSteps(newCompleted)
        }
      }
      setSelectedChoice(null)
      setShowResult(null)
    }, 1800)
  }

  const exitScenario = () => {
    setSelectedId(null)
    setScenarioComplete(false)
  }

  if (!selectedScenario) {
    return (
      <div className="escape-lobby">
        <div className="escape-lobby-header">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back to Portal
          </button>
          <h2>🌍 Scientific Scenarios</h2>
          <p className="escape-lobby-desc">
            Step into real-world science situations. Apply your knowledge to make decisions that matter.
          </p>
        </div>
        <div className="escape-room-list">
          {scenarios.map((scenario) => {
            const done = completedScenarioIds.includes(scenario.id)
            return (
              <button
                key={scenario.id}
                type="button"
                className={`escape-room-card ${done ? 'escaped' : ''}`}
                onClick={() => startScenario(scenario)}
              >
                <span className="er-card-emoji">{scenario.emoji}</span>
                <div className="er-card-body">
                  <strong>{scenario.title}</strong>
                  <span className="er-card-tagline">{scenario.description}</span>
                  <div className="er-card-meta">
                    <span className="er-difficulty">{scenario.difficulty}</span>
                    <span className="er-xp">{scenario.xpReward} XP</span>
                    <span className="er-puzzles">{scenario.puzzles.length} decisions</span>
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

  if (scenarioComplete) {
    return (
      <div className="escape-victory">
        <div className="victory-icon">{selectedScenario.emoji}</div>
        <h2>🌟 Scenario Complete!</h2>
        <h3>{selectedScenario.title}</h3>
        <p className="victory-desc">Excellent scientific decision-making!</p>
        <div className="victory-xp">+{selectedScenario.xpReward} XP Earned</div>
        <div className="victory-actions">
          <button type="button" className="submit" onClick={exitScenario}>More Scenarios</button>
          <button type="button" className="submit" onClick={onBack}>Back to Portal</button>
        </div>
      </div>
    )
  }

  const puzzle = selectedScenario.puzzles[currentStep]

  return (
    <div className="escape-room-play">
      <div className="er-play-header">
        <button type="button" className="back-btn" onClick={exitScenario}>← Exit Scenario</button>
        <div className="er-play-title">
          <span>{selectedScenario.emoji}</span>
          <h2>{selectedScenario.title}</h2>
        </div>
      </div>
      <div className="er-progress-bar">
        {selectedScenario.puzzles.map((p, i) => (
          <div key={p.id} className={`er-progress-step ${completedSteps.includes(i) ? 'done' : i === currentStep ? 'active' : 'locked'}`}>
            {completedSteps.includes(i) ? '✅' : i === currentStep ? '🌍' : '⬜'}
            <span>Decision {i + 1}</span>
          </div>
        ))}
      </div>
      <div className="er-puzzle-card">
        <div className="er-puzzle-header">
          <span className="er-puzzle-step">Decision {currentStep + 1} of {selectedScenario.puzzles.length}</span>
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
        {showResult === 'correct' && <div className="er-result correct" aria-live="polite">✅ Best choice! {puzzle.explanation}</div>}
        {showResult === 'incorrect' && <div className="er-result incorrect" aria-live="polite">❌ Not the best option. {puzzle.explanation}</div>}
        {showResult === null && (
          <button type="button" className="submit" onClick={submitAnswer} disabled={selectedChoice === null}>
            Make Decision
          </button>
        )}
        <p className="er-standard">Standard: {puzzle.standard}</p>
      </div>
    </div>
  )
}
