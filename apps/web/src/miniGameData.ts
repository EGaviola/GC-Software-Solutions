export type MiniGameQuestion = {
  id: string
  prompt: string
  choices: string[]
  answerIndex: number
  standard: string
}

export type MiniGame = {
  id: string
  title: string
  emoji: string
  description: string
  timePerQuestion: number
  xpPerCorrect: number
  questions: MiniGameQuestion[]
}

export const miniGames: MiniGame[] = [
  {
    id: 'rapid-fire-energy',
    title: 'Energy Flash Quiz',
    emoji: '⚡',
    description: 'Answer 6 rapid-fire energy questions. Each correct answer before time runs out earns bonus XP!',
    timePerQuestion: 20,
    xpPerCorrect: 30,
    questions: [
      {
        id: 'mq-e1',
        prompt: 'Which form of energy is stored in chemical bonds?',
        choices: ['Kinetic energy', 'Chemical potential energy', 'Thermal energy', 'Radiant energy'],
        answerIndex: 1,
        standard: '6.PS3.1',
      },
      {
        id: 'mq-e2',
        prompt: 'Heat transfer through direct contact between objects is called:',
        choices: ['Radiation', 'Convection', 'Conduction', 'Evaporation'],
        answerIndex: 2,
        standard: '6.PS3.2',
      },
      {
        id: 'mq-e3',
        prompt: 'A moving car has which type of energy?',
        choices: ['Potential energy', 'Nuclear energy', 'Kinetic energy', 'Chemical energy'],
        answerIndex: 2,
        standard: '6.PS3.1',
      },
      {
        id: 'mq-e4',
        prompt: 'Which material is the best thermal insulator?',
        choices: ['Steel', 'Copper', 'Aluminum', 'Foam rubber'],
        answerIndex: 3,
        standard: '6.ETS1.2',
      },
      {
        id: 'mq-e5',
        prompt: 'Energy is always _____ during any transformation.',
        choices: ['Created', 'Destroyed', 'Conserved', 'Duplicated'],
        answerIndex: 2,
        standard: '6.PS3.1',
      },
      {
        id: 'mq-e6',
        prompt: 'Solar panels convert which type of energy into electrical energy?',
        choices: ['Chemical energy', 'Radiant (light) energy', 'Kinetic energy', 'Nuclear energy'],
        answerIndex: 1,
        standard: '6.ESS3.2',
      },
    ],
  },
  {
    id: 'rapid-fire-ecosystems',
    title: 'Ecosystem Sprint',
    emoji: '🌿',
    description: 'Race through ecosystem questions. How many can you get right?',
    timePerQuestion: 20,
    xpPerCorrect: 30,
    questions: [
      {
        id: 'mq-ec1',
        prompt: 'What is the first step (base) of every food chain?',
        choices: ['Carnivores', 'Decomposers', 'Producers (plants)', 'Top predators'],
        answerIndex: 2,
        standard: '6.LS2.3',
      },
      {
        id: 'mq-ec2',
        prompt: 'How much energy is typically passed from one trophic level to the next?',
        choices: ['100%', '50%', '10%', '1%'],
        answerIndex: 2,
        standard: '6.LS2.3',
      },
      {
        id: 'mq-ec3',
        prompt: 'An organism that eats both plants and animals is called:',
        choices: ['Herbivore', 'Carnivore', 'Omnivore', 'Decomposer'],
        answerIndex: 2,
        standard: '6.LS2.3',
      },
      {
        id: 'mq-ec4',
        prompt: 'Which factor most directly limits a population\'s size in a habitat?',
        choices: ['Color of the animals', 'Available food and resources', 'Daily temperature variation', 'Altitude of the region'],
        answerIndex: 1,
        standard: '6.LS2.1',
      },
      {
        id: 'mq-ec5',
        prompt: 'A species that moves into a new area and harms native species is called:',
        choices: ['Endemic species', 'Keystone species', 'Invasive species', 'Endangered species'],
        answerIndex: 2,
        standard: '6.LS2.5',
      },
      {
        id: 'mq-ec6',
        prompt: 'Loss of biodiversity most directly threatens:',
        choices: ['Only aesthetic values', 'Ecosystem stability and services', 'Only tropical regions', 'Nothing significant'],
        answerIndex: 1,
        standard: '6.LS4.1',
      },
    ],
  },
  {
    id: 'rapid-fire-earth',
    title: 'Earth Systems Blitz',
    emoji: '🌍',
    description: 'Earth science rapid-fire! Test your knowledge of weather, climate, and Earth systems.',
    timePerQuestion: 20,
    xpPerCorrect: 30,
    questions: [
      {
        id: 'mq-es1',
        prompt: 'What drives the movement of ocean currents?',
        choices: ['Moon phases only', 'Temperature and salinity density differences', 'Ocean floor mountains', 'Tides only'],
        answerIndex: 1,
        standard: '6.ESS2.2',
      },
      {
        id: 'mq-es2',
        prompt: 'The main driver of Earth\'s water cycle is:',
        choices: ['Gravity and the sun', 'Wind only', 'Ocean tides', 'Earth\'s magnetic field'],
        answerIndex: 0,
        standard: '6.ESS2.4',
      },
      {
        id: 'mq-es3',
        prompt: 'A cold front meeting warm humid air most likely produces:',
        choices: ['Clear skies', 'Thunderstorms', 'Drought', 'Calm seas'],
        answerIndex: 1,
        standard: '6.ESS2.7',
      },
      {
        id: 'mq-es4',
        prompt: 'Greenhouse gases affect Earth\'s temperature by:',
        choices: ['Blocking sunlight from reaching Earth', 'Trapping outgoing heat radiation', 'Cooling the stratosphere', 'Increasing cloud cover'],
        answerIndex: 1,
        standard: '6.ESS2.6',
      },
      {
        id: 'mq-es5',
        prompt: 'Which is a renewable energy source?',
        choices: ['Coal', 'Natural gas', 'Wind', 'Petroleum'],
        answerIndex: 2,
        standard: '6.ESS3.2',
      },
      {
        id: 'mq-es6',
        prompt: 'Human activities most directly affect the water cycle by:',
        choices: ['Changing ocean depths', 'Altering land cover and adding pollutants that affect evaporation and runoff', 'Increasing Earth\'s rotation speed', 'Shifting tectonic plates'],
        answerIndex: 1,
        standard: '6.ESS2.5',
      },
    ],
  },
]

export type DailyChallenge = {
  id: string
  title: string
  emoji: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  xpReward: number
  standard: string
}

export const dailyChallengePool: DailyChallenge[] = [
  {
    id: 'dc-001',
    title: 'Daily Challenge: Energy Conservationist',
    emoji: '🔋',
    prompt: 'A ball rolls down a hill, speeding up as it goes. At the bottom, it is slower than expected. Where did the "missing" energy go?',
    choices: ['It was destroyed by friction', 'It converted to thermal energy through friction with the surface', 'It teleported to the top of the hill', 'Kinetic energy can disappear in hills'],
    answerIndex: 1,
    explanation: 'Energy is always conserved. Friction between the ball and surface converted kinetic energy to thermal energy (heat), which explains the slower-than-expected speed at the bottom.',
    xpReward: 75,
    standard: '6.PS3.1',
  },
  {
    id: 'dc-002',
    title: 'Daily Challenge: Ecosystem Detective',
    emoji: '🦊',
    prompt: 'Wolves were removed from Yellowstone in the 1920s. Deer populations exploded and stripped riverbanks of vegetation. Which ecological term describes the chain of effects from removing wolves?',
    choices: ['Biomagnification', 'Trophic cascade', 'Eutrophication', 'Natural succession'],
    answerIndex: 1,
    explanation: 'A trophic cascade occurs when removing a top predator causes ripple effects through multiple trophic levels. Wolves → deer population exploded → overgrazing → riverbank erosion — a textbook cascade.',
    xpReward: 75,
    standard: '6.LS2.3',
  },
  {
    id: 'dc-003',
    title: 'Daily Challenge: Climate Modeler',
    emoji: '🌊',
    prompt: 'Coastal cities are 2–5 °C warmer than nearby rural areas. What primarily causes this "urban heat island" effect?',
    choices: ['Cities have more people producing body heat', 'Concrete and asphalt absorb more solar energy and release heat; fewer plants reduce evaporative cooling', 'Urban pollution blocks cooling breezes', 'Tall buildings trap cold air at street level'],
    answerIndex: 1,
    explanation: 'Impervious surfaces (concrete, asphalt) have low albedo and high heat capacity — they absorb solar radiation efficiently and release it slowly as heat. Reduced vegetation means less evapotranspiration cooling. This is thermal energy transfer at an urban scale (6.PS3.2).',
    xpReward: 75,
    standard: '6.PS3.2',
  },
  {
    id: 'dc-004',
    title: 'Daily Challenge: Watershed Guardian',
    emoji: '💧',
    prompt: 'Heavy rain after a wildfire causes massive mudslides and water contamination in a valley. Which characteristic of the watershed most directly caused the increased runoff?',
    choices: ['Lower air pressure after the fire', 'Loss of vegetation removed root systems that anchored soil and slowed water movement', 'The fire increased water temperature', 'Ash increased water salinity'],
    answerIndex: 1,
    explanation: 'Plant root systems anchor soil, slow water movement, and increase infiltration. After wildfire removes vegetation, rain runs off rapidly, carrying topsoil and ash into waterways — disrupting the water cycle at the watershed scale (6.ESS2.4).',
    xpReward: 75,
    standard: '6.ESS2.4',
  },
  {
    id: 'dc-005',
    title: 'Daily Challenge: Renewable Engineer',
    emoji: '☀️',
    prompt: 'A remote research station needs a power supply that works day and night, in all seasons. Which energy system design is most reliable?',
    choices: ['Solar panels only', 'Wind turbines only', 'Solar + wind + battery storage hybrid system', 'Diesel generator only'],
    answerIndex: 2,
    explanation: 'No single renewable source is always available (clouds block solar; calm periods reduce wind). A hybrid system with complementary sources and battery storage ensures consistent power regardless of weather or season — applying engineering design principles (6.ESS3.2, 6.ETS1.2).',
    xpReward: 75,
    standard: '6.ESS3.2',
  },
  {
    id: 'dc-006',
    title: 'Daily Challenge: Biodiversity Champion',
    emoji: '🦋',
    prompt: 'A single fungal pathogen wiped out 90% of American chestnut trees in the 1900s. Which concept explains why such total devastation was possible?',
    choices: ['American chestnuts were genetically uniform, with no natural resistance variants to select for survival', 'Fungi are always more powerful than trees', 'The trees had too much genetic diversity', 'Environmental pollution weakened all forests equally'],
    answerIndex: 0,
    explanation: 'Low genetic diversity means a population has few or no individuals with resistance traits. When a novel pathogen arrives, natural selection cannot save the population — there are no resistant variants to survive and reproduce. This is why genetic diversity is critical to species survival (6.LS4.1).',
    xpReward: 75,
    standard: '6.LS4.1',
  },
  {
    id: 'dc-007',
    title: 'Daily Challenge: Storm Tracker',
    emoji: '🌪️',
    prompt: 'A meteorologist says "a low-pressure system is moving in." What weather should residents prepare for?',
    choices: ['Clear skies and high temperatures', 'Wind, clouds, and precipitation as air rises and cools', 'Dry, calm conditions', 'Decreased humidity'],
    answerIndex: 1,
    explanation: 'Low-pressure systems form where air rises. As air rises, it cools and moisture condenses — producing clouds and precipitation. Winds converge into the low-pressure center, creating stormy conditions (6.ESS2.7).',
    xpReward: 75,
    standard: '6.ESS2.7',
  },
]

export function getDailyChallenge(): DailyChallenge {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  )
  return dailyChallengePool[dayOfYear % dailyChallengePool.length]
}

export function getWeeklyTheme(): { title: string; description: string; emoji: string } {
  const weekThemes = [
    { title: 'Energy Week', description: 'All energy-related challenges award double XP this week!', emoji: '⚡' },
    { title: 'Ecosystem Week', description: 'Ecology missions are featured this week. Explore biodiversity!', emoji: '🌿' },
    { title: 'Climate Week', description: 'Earth systems science is in focus — explore weather, oceans, and climate!', emoji: '🌍' },
    { title: 'Engineering Week', description: 'Design challenges and escape rooms award bonus XP this week!', emoji: '🔧' },
  ]
  const weekOfYear = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24 * 7))
  return weekThemes[weekOfYear % weekThemes.length]
}

export function getSeasonalEvent(): { title: string; description: string; emoji: string; active: boolean } {
  const month = new Date().getMonth()
  if (month === 8 || month === 9) {
    return { title: 'Fall Science Festival', description: 'Celebrate the season with ecosystem and harvest science challenges!', emoji: '🍂', active: true }
  }
  if (month === 11 || month === 0 || month === 1) {
    return { title: 'Winter Science Olympiad', description: 'Cold-weather physics and climate science are featured!', emoji: '❄️', active: true }
  }
  if (month === 2 || month === 3 || month === 4) {
    return { title: 'Spring Discovery Fair', description: 'Explore renewal — ecosystems, weather, and life science challenges!', emoji: '🌸', active: true }
  }
  return { title: 'Summer Science Camp', description: 'Beat the heat with energy, solar, and climate science challenges!', emoji: '☀️', active: true }
}
