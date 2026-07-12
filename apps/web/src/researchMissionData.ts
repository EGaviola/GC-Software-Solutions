export type ResearchPuzzle = {
  id: string
  step: number
  title: string
  context: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  standard: string
}

export type ResearchMission = {
  id: string
  title: string
  emoji: string
  topic: string
  briefing: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  puzzles: ResearchPuzzle[]
  xpReward: number
}

export const researchMissions: ResearchMission[] = [
  {
    id: 'climate-investigation',
    title: 'Investigate Climate Change Effects',
    emoji: '🌡️',
    topic: 'Climate & Earth Systems',
    briefing:
      "You have been assigned to the Global Climate Research Division. Analyze data from across Earth's systems to understand how rising greenhouse gas concentrations are changing the planet. Document your findings in a research report by answering each investigation question.",
    difficulty: 'Advanced',
    xpReward: 300,
    puzzles: [
      {
        id: 'climate-1',
        step: 1,
        title: 'Greenhouse Effect Analysis',
        context:
          'Atmospheric CO₂ concentrations have risen from 280 ppm (pre-industrial) to over 420 ppm today. Your first task is to explain the mechanism.',
        prompt:
          "How do increased greenhouse gas concentrations cause Earth's average surface temperature to rise?",
        choices: [
          'Greenhouse gases block the sun, reducing the amount of solar energy reaching Earth',
          'Greenhouse gases absorb and re-emit outgoing infrared radiation, trapping heat in the lower atmosphere',
          'CO₂ reacts with oxygen to produce heat directly',
          'Greenhouse gases increase cloud cover, which warms the surface',
        ],
        answerIndex: 1,
        explanation:
          "Greenhouse gases (CO₂, CH₄, H₂O vapor) are transparent to incoming solar radiation but absorb outgoing infrared (heat) radiation emitted by Earth's surface. They re-emit this energy in all directions, including back toward Earth, raising surface temperatures (6.ESS2.6).",
        standard: '6.ESS2.6',
      },
      {
        id: 'climate-2',
        step: 2,
        title: 'Ocean Current Disruption',
        context:
          'Melting polar ice caps are adding large volumes of cold freshwater to the North Atlantic. This is slowing the Atlantic Meridional Overturning Circulation (AMOC). Analyze the impact.',
        prompt:
          'Why does adding cold freshwater to the North Atlantic slow down deep ocean circulation currents?',
        choices: [
          'Cold water is less dense than saltwater, so it floats and prevents the sinking that drives circulation',
          'Freshwater is heavier than saltwater and blocks the ocean floor currents',
          'Freshwater increases salinity, which speeds up currents',
          'Temperature has no effect on ocean water movement',
        ],
        answerIndex: 0,
        explanation:
          'Deep ocean currents are driven by density differences. Cold, salty water is denser and sinks, driving circulation. Adding cold freshwater dilutes salinity and reduces density, preventing the sinking that powers the "thermohaline conveyor belt" (6.ESS2.2).',
        standard: '6.ESS2.2',
      },
      {
        id: 'climate-3',
        step: 3,
        title: 'Water Cycle Acceleration',
        context:
          'Weather data shows more extreme precipitation events — stronger storms but longer dry periods between them. Your task is to explain why a warmer climate creates this pattern.',
        prompt:
          'Why does a warmer atmosphere lead to both more intense storms AND longer drought periods?',
        choices: [
          'Warm air holds more water vapor, so when storms do form they release more precipitation, but it evaporates faster between storms',
          'Warm temperatures destroy storm systems, reducing overall precipitation',
          'Higher temperatures cause all water to freeze, reducing liquid precipitation',
          'Temperature changes have no relationship to precipitation patterns',
        ],
        answerIndex: 0,
        explanation:
          'Warmer air holds more water vapor (7% more per degree Celsius). This increases evaporation, drying soils faster between storms. But when storms do form, they pull from a larger atmospheric moisture reservoir — producing more intense precipitation. This is water cycle acceleration (6.ESS2.4).',
        standard: '6.ESS2.4',
      },
      {
        id: 'climate-4',
        step: 4,
        title: 'Mitigation Strategy Evaluation',
        context:
          'Your research is complete. The final section of your report requires recommending a science-backed mitigation strategy to reduce the rate of warming.',
        prompt:
          'Which combination of actions is most supported by Earth systems science to mitigate climate change effects?',
        choices: [
          'Only adapt to changes — mitigation is impossible',
          'Rapid transition to renewable energy, reforestation to increase carbon sequestration, and global methane emission reductions',
          'Increase industrial output to generate economic resources for adaptation',
          'Seed the stratosphere with coal dust to reduce sunlight without addressing CO₂',
        ],
        answerIndex: 1,
        explanation:
          'Transitioning to renewable energy reduces CO₂ emissions at the source. Forests sequester atmospheric carbon. Methane reduction addresses a potent short-term greenhouse gas. This triple approach targets the root drivers of climate change across interconnected Earth systems (6.ESS3.1, 6.ESS3.2).',
        standard: '6.ESS3.1',
      },
    ],
  },
  {
    id: 'forensic-investigation',
    title: 'Forensic Science Investigation',
    emoji: '🔬',
    topic: 'Forensic Science & Biology',
    briefing:
      'You are a forensic scientist with the Science Investigation Unit. A suspicious event at an old research facility has left behind physical evidence. Use your knowledge of chemistry, biology, and physics to analyze the clues and determine what happened.',
    difficulty: 'Intermediate',
    xpReward: 280,
    puzzles: [
      {
        id: 'forensic-1',
        step: 1,
        title: 'Fingerprint Evidence Analysis',
        context:
          'Fingerprints were found on a glass vial. The technician used ninhydrin spray and the prints turned purple. Why does this technique work?',
        prompt:
          'Ninhydrin reacts with amino acids in fingerprint residue to produce a purple color. What does this reveal about the chemical composition of fingerprint sweat?',
        choices: [
          'Fingerprint sweat is composed entirely of water',
          'Fingerprint residue contains amino acids — the building blocks of proteins — which react chemically with ninhydrin',
          'Ninhydrin reacts with salt in sweat',
          'The purple color comes from DNA, not amino acids',
        ],
        answerIndex: 1,
        explanation:
          'Fingerprint residue contains amino acids secreted by eccrine sweat glands. Ninhydrin is a chemical that undergoes a color-producing reaction with amino acids — demonstrating how chemical properties can be used for forensic identification. This applies chemistry of molecular interactions to solve real problems.',
        standard: '6.PS3.1',
      },
      {
        id: 'forensic-2',
        step: 2,
        title: 'Toxicology Trace Identification',
        context:
          'A soil sample from the scene shows unusually high heavy metal concentrations. These metals likely moved from a nearby industrial waste site. Trace the contamination pathway.',
        prompt:
          'Heavy metals were found in the soil near the facility. Trace evidence shows they also appear in nearby plants and then in local wildlife. Which ecological process explains how the metals moved from soil into the food chain?',
        choices: [
          'The metals evaporated from the soil and rained back down',
          'Plants absorbed the metals through roots; herbivores ate the plants; the metals biomagnified up the food chain',
          'Metals moved through air currents to animals directly',
          'Wildlife drank contaminated water only; plants were unaffected',
        ],
        answerIndex: 1,
        explanation:
          'Plants absorb heavy metals from soil through root uptake. Herbivores concentrate these metals when eating plants, and predators concentrate them further. This process of increasing concentration at each trophic level is biomagnification — directly related to energy and matter flow in food webs (6.LS2.3).',
        standard: '6.LS2.3',
      },
      {
        id: 'forensic-3',
        step: 3,
        title: 'Time-of-Event Reconstruction',
        context:
          'Investigators need to determine when the chemical release occurred. Temperature data loggers in the facility showed a temperature spike at a specific time. How can energy data help determine timing?',
        prompt:
          'A temperature spike of +45 °C was recorded over 12 minutes in the storage room, followed by a rapid return to baseline. What type of energy event most likely caused this pattern?',
        choices: [
          'A door was left open, letting in sunlight gradually',
          'A rapid exothermic chemical reaction released thermal energy, then returned to equilibrium as reactants were used up',
          'A refrigerator unit malfunctioned and stopped cooling',
          'A human body temperature affected the room sensor',
        ],
        answerIndex: 1,
        explanation:
          'An exothermic reaction releases thermal energy rapidly, producing a temperature spike. Once the reactants are consumed, the reaction stops and temperature returns to equilibrium. The sharp spike-and-return pattern is a forensic signature of an exothermic event — energy released as chemical bonds form (6.PS3.2).',
        standard: '6.PS3.2',
      },
    ],
  },
  {
    id: 'dna-unlock',
    title: 'Unlock DNA Sequences',
    emoji: '🧬',
    topic: 'Genetics & Biological Systems',
    briefing:
      'A breakthrough genetic database has been encrypted. To unlock the sequences that could reveal the cure for a rare disease, you must demonstrate mastery of genetics, biological change, and ecosystem impacts. Three encrypted files await.',
    difficulty: 'Advanced',
    xpReward: 320,
    puzzles: [
      {
        id: 'dna-1',
        step: 1,
        title: 'Biodiversity Data File',
        context:
          "File 1 contains data on genetic diversity within a wolf population. After decades of isolation, the population's genetic diversity dropped 60%. Why does this matter for the species' survival?",
        prompt:
          'A wolf pack that has been geographically isolated for 50 years shows much lower genetic diversity than connected populations. What is the most significant ecological risk of this low diversity?',
        choices: [
          'The wolves will grow larger due to less genetic competition',
          'Reduced genetic diversity means the population has fewer variations to adapt to new diseases, environmental changes, or parasites',
          'Low diversity improves pack coordination and hunting success',
          'Genetic diversity only matters for plants, not animals',
        ],
        answerIndex: 1,
        explanation:
          'Genetic diversity is the raw material for natural selection. A population with low diversity has fewer trait variations, making it vulnerable to a single disease, parasite, or environmental shift that it cannot adapt to. This directly reduces species survival probability (6.LS4.1 biodiversity).',
        standard: '6.LS4.1',
      },
      {
        id: 'dna-2',
        step: 2,
        title: 'Mutation Impact Analysis',
        context:
          'File 2 contains genetic sequence data showing a mutation that makes a bacterium resistant to a common antibiotic. The mutation appeared spontaneously in one cell and spread through the population in 48 hours.',
        prompt:
          'How did a single random mutation spread to dominate the entire bacterial population in 48 hours?',
        choices: [
          'All bacteria in the population mutated simultaneously in the same way',
          'Bacteria that were not resistant shared their DNA with the resistant bacterium',
          'Bacteria with the resistance mutation survived antibiotic exposure and reproduced rapidly, while non-resistant bacteria died',
          'The mutation reversed in non-resistant bacteria, making them all resistant',
        ],
        answerIndex: 2,
        explanation:
          'Natural selection: the antibiotic killed non-resistant bacteria, leaving only the resistant individual to reproduce. Bacteria reproduce rapidly (doubling every 20 minutes), so one resistant bacterium can become millions in 48 hours. This is natural selection acting on genetic variation (6.LS4.1 biological change).',
        standard: '6.LS4.1',
      },
      {
        id: 'dna-3',
        step: 3,
        title: 'Ecosystem Services Encryption Key',
        context:
          'The final encryption key requires you to explain how genetic diversity at the species level connects to broader ecosystem services that humans depend on.',
        prompt:
          'Which statement best explains why biodiversity loss at the genetic level threatens human well-being?',
        choices: [
          'Biodiversity is an aesthetic concern only; it has no functional impact on human survival',
          'High biodiversity ensures resilient ecosystems that provide clean water, food production, climate regulation, and new medicines — all of which depend on diverse genetic material',
          'Biodiversity only matters in tropical ecosystems, not in temperate regions where humans live',
          'Human technology can fully replace all ecosystem services currently provided by diverse species',
        ],
        answerIndex: 1,
        explanation:
          'Ecosystems provide critical services: clean water filtration, crop pollination, climate regulation, disease control, and pharmaceutical compounds. Each depends on complex species interactions built on genetic diversity. Loss of biodiversity degrades these services, directly threatening human health and food security (6.LS4.1, 6.ESS3.3).',
        standard: '6.ESS3.3',
      },
    ],
  },
]
