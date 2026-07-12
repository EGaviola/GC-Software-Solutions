export type EscapeRoomPuzzle = {
  id: string
  step: number
  title: string
  clue: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  standard: string
}

export type EscapeRoom = {
  id: string
  title: string
  emoji: string
  tagline: string
  setting: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  puzzles: EscapeRoomPuzzle[]
  xpReward: number
}

export const escapeRooms: EscapeRoom[] = [
  {
    id: 'repair-spaceship',
    title: 'Repair a Spaceship',
    emoji: '🚀',
    tagline: 'The engines are failing. Only science can save the crew.',
    difficulty: 'Intermediate',
    setting:
      'Your spacecraft lost power after a solar storm. Three critical systems are offline. You cannot open the escape pod until every system is restored. Each lock requires scientific knowledge to bypass. Solve all three to save the crew.',
    xpReward: 350,
    puzzles: [
      {
        id: 'spaceship-1',
        step: 1,
        title: 'Solar Panel Alignment Lock',
        clue:
          'The solar panels are misaligned. The energy controller display shows conflicting readings. You must understand energy conservation to recalibrate.',
        prompt:
          "The spacecraft's solar panels produce 800 J of energy, but only 560 J reaches the battery. Which statement best explains the missing 240 J?",
        choices: [
          'The energy disappeared because space is a vacuum',
          'Energy was converted to heat through resistance in the wiring',
          'The panels absorbed more energy than they received',
          'Energy only transfers in perfect conditions',
        ],
        answerIndex: 1,
        explanation:
          'Energy is always conserved. The 240 J was converted to thermal energy (heat) through electrical resistance in the wiring — consistent with the law of conservation of energy (6.PS3.1).',
        standard: '6.PS3.1',
      },
      {
        id: 'spaceship-2',
        step: 2,
        title: 'Heat Shield Bypass Code',
        clue:
          'The heat shield control panel is locked. To unlock it, you must choose the correct insulation material from the supply closet to repair the outer hull before re-entry.',
        prompt:
          'The re-entry heat shield cracked. You must patch it with one material. Which choice best minimizes thermal energy transfer from the 1,600 °C re-entry plasma into the cabin?',
        choices: [
          'Polished copper sheet (high conductivity)',
          'Dark matte carbon plate (high absorption)',
          'Ceramic foam composite with reflective outer coating',
          'Thin plastic wrap',
        ],
        answerIndex: 2,
        explanation:
          'Ceramic foam is a poor heat conductor, reducing conduction. The reflective outer coating minimizes radiant absorption. This combination (6.ETS1.2) best protects the cabin from extreme thermal energy transfer.',
        standard: '6.ETS1.2',
      },
      {
        id: 'spaceship-3',
        step: 3,
        title: 'Life Support Oxygen Lock',
        clue:
          'The life support oxygen recycler is offline. To restart it, you must answer a question about biological oxygen cycling — the same process the system simulates.',
        prompt:
          'The recycler mimics a closed ecosystem. Which process is most responsible for replenishing oxygen in a sealed biosphere?',
        choices: [
          'Cellular respiration by all organisms',
          'Photosynthesis by the algae and plant modules',
          'Decomposition of organic material',
          'Evaporation of water in the tank',
        ],
        answerIndex: 1,
        explanation:
          'Photosynthesis converts CO₂ and light energy into glucose and oxygen. In a closed ecosystem, the plant/algae module acts as the primary oxygen source, essential for energy flow in the life-support food web (6.LS2.3).',
        standard: '6.LS2.3',
      },
    ],
  },
  {
    id: 'disease-outbreak',
    title: 'Stop a Disease Outbreak',
    emoji: '🦠',
    tagline: 'The city is infected. You have 3 clues to find Patient Zero.',
    difficulty: 'Intermediate',
    setting:
      'A mysterious illness has spread across Riverside City. The emergency lab is locked until you correctly identify the transmission vector, the host environment, and the containment strategy. Every wrong answer allows the outbreak to spread further.',
    xpReward: 320,
    puzzles: [
      {
        id: 'disease-1',
        step: 1,
        title: 'Contamination Source Lock',
        clue:
          "Data logs show illness clusters near the city's main water treatment plant and downstream wetlands. Identify which human activity most likely introduced the pathogen into the watershed.",
        prompt:
          'Illness clusters appear downstream of an industrial site. Which human activity is most likely introducing pathogens into the water supply?',
        choices: [
          'Reforestation projects near the river',
          'Untreated wastewater runoff from the industrial facility',
          'Solar panel installations upstream',
          'Planting native grasses on riverbanks',
        ],
        answerIndex: 1,
        explanation:
          'Untreated industrial wastewater introduces chemical and biological contaminants into water systems. This directly impacts the water cycle and aquatic ecosystems (6.ESS2.5), spreading pathogens downstream.',
        standard: '6.ESS2.5',
      },
      {
        id: 'disease-2',
        step: 2,
        title: 'Ecosystem Spread Tracker',
        clue:
          'The pathogen has moved from water into the food supply. You find it in fish eaten by birds, which spread it across the city. Which ecological relationship explains how the disease jumped from fish to the human food supply?',
        prompt:
          'The pathogen bioaccumulates as it moves through the food chain: water → plankton → small fish → larger fish → humans. Which concept best explains why the pathogen concentration is highest in humans?',
        choices: [
          'Energy increases at each trophic level',
          'Toxins and pathogens become more concentrated at higher trophic levels (biomagnification)',
          'Humans are primary producers in this food chain',
          'Energy pyramids show equal toxin levels at each level',
        ],
        answerIndex: 1,
        explanation:
          'Biomagnification occurs when substances accumulate and concentrate as they move up a food chain. Each consumer takes in all the toxins from the organisms it eats, so top predators have the highest concentrations (6.LS2.3).',
        standard: '6.LS2.3',
      },
      {
        id: 'disease-3',
        step: 3,
        title: 'Containment Protocol Lock',
        clue:
          'You have identified the source and spread mechanism. Now you must choose the most effective containment plan to stop the outbreak and restore the ecosystem.',
        prompt:
          'Which containment strategy will most effectively stop the outbreak AND protect the long-term health of the watershed ecosystem?',
        choices: [
          'Drain all affected wetlands immediately',
          'Issue a boil-water advisory only and wait',
          'Close the contamination source, treat the water supply, restore riparian buffers, and monitor downstream wildlife',
          'Introduce a new predator species to control fish populations',
        ],
        answerIndex: 2,
        explanation:
          'Effective disease and ecosystem management requires addressing the contamination source, treating the affected medium, and restoring natural buffers. Monitoring wildlife tracks recovery. This systems-level approach addresses both human health and ecosystem sustainability (6.ESS3.3).',
        standard: '6.ESS3.3',
      },
    ],
  },
  {
    id: 'escape-laboratory',
    title: 'Escape a Laboratory',
    emoji: '🧪',
    tagline: 'Automatic lockdown. Three science locks stand between you and freedom.',
    difficulty: 'Beginner',
    setting:
      "The university laboratory entered emergency lockdown after an anomalous reading triggered the alarm. The exit requires three sequential authorization codes — each unlocked by correctly solving a science puzzle from the lab's own experiments. You are alone. Think carefully.",
    xpReward: 280,
    puzzles: [
      {
        id: 'lab-1',
        step: 1,
        title: 'Gas Pressure Release Code',
        clue:
          'A sealed gas cylinder in the corner reads a dangerously high pressure. The release valve code requires you to know what happens to gas pressure when temperature increases in a fixed container.',
        prompt:
          'A sealed gas cylinder is left in sunlight. The temperature inside rises from 20 °C to 60 °C. What happens to the pressure inside?',
        choices: [
          'Pressure decreases because hot gas is lighter',
          'Pressure increases because gas molecules move faster and hit walls more often',
          'Pressure stays the same because the container is sealed',
          'Pressure increases only if the container expands',
        ],
        answerIndex: 1,
        explanation:
          'When temperature increases, gas molecules gain kinetic energy and move faster, colliding with container walls more frequently and with greater force — increasing pressure (6.PS3.2 thermal energy transfer in systems).',
        standard: '6.PS3.2',
      },
      {
        id: 'lab-2',
        step: 2,
        title: 'Chemical Neutralization Lock',
        clue:
          'A spilled acid is blocking the secondary exit door sensor. You must neutralize it using chemicals from the emergency cabinet. The cabinet opens only when you choose the correct neutralizing agent.',
        prompt:
          'A strong acid (pH 2) has spilled on the sensor. Which substance is the most appropriate neutralizing agent to safely raise the pH toward neutral?',
        choices: [
          'More acid to dilute it further',
          'Pure distilled water only',
          'A dilute sodium bicarbonate (baking soda) solution',
          'Concentrated bleach',
        ],
        answerIndex: 2,
        explanation:
          'Sodium bicarbonate (NaHCO₃) is a mild base that reacts with acid to produce water, CO₂, and a neutral salt. It safely raises pH without introducing new hazardous chemicals — a standard lab neutralization protocol.',
        standard: '6.PS3.1',
      },
      {
        id: 'lab-3',
        step: 3,
        title: 'Biohazard Containment Lock',
        clue:
          'The final exit lock is connected to the biohazard containment system. A bacterial culture container was left open. You must correctly identify how to stop the potential spread to unlock the main door.',
        prompt:
          'An open bacterial culture poses a biohazard risk. Which action sequence correctly contains the spread?',
        choices: [
          'Open all windows to ventilate and fan the culture away',
          'Seal the container, apply autoclave sterilization, then dispose in biohazard waste',
          'Cover with paper towels and leave for custodial staff',
          'Spray with water and flush down the drain',
        ],
        answerIndex: 1,
        explanation:
          'Proper biohazard containment requires sealing the contamination, using heat sterilization (autoclave uses high-pressure steam to destroy pathogens), and disposing through designated biohazard channels — protecting both people and the environment (6.LS2.5 ecosystem impact mitigation).',
        standard: '6.LS2.5',
      },
    ],
  },
  {
    id: 'chemical-leak',
    title: 'Fix a Chemical Leak',
    emoji: '⚗️',
    tagline: "Toxic chemicals are reaching the river. Stop the leak before it's too late.",
    difficulty: 'Advanced',
    setting:
      'A pipeline rupture at the Valley Chemical Plant is leaking a corrosive solution toward Clearwater River. The emergency response system is locked behind three science verification panels. Solve them to activate the containment pumps and save the watershed.',
    xpReward: 380,
    puzzles: [
      {
        id: 'leak-1',
        step: 1,
        title: 'Chemical Properties Identification Lock',
        clue:
          'The chemical sensors detected a strong base (pH 11) leaking from Tank B. To activate the neutralization pump, you must select the correct neutralizing agent from the plant inventory.',
        prompt:
          'A strong base (pH 11) is leaking toward the river. Which chemical best neutralizes it without creating a new hazard?',
        choices: [
          'Add more of the same base to increase concentration',
          'A controlled injection of dilute acetic acid (vinegar)',
          'Pure liquid nitrogen',
          'Chlorine gas',
        ],
        answerIndex: 1,
        explanation:
          'A dilute weak acid (acetic acid) neutralizes a strong base through an acid-base reaction, producing water and a harmless salt. This brings pH toward neutral safely. Using a weak acid prevents over-correction and secondary hazards.',
        standard: '6.PS3.1',
      },
      {
        id: 'leak-2',
        step: 2,
        title: 'Water Flow Containment Lock',
        clue:
          'Runoff is moving toward the river via surface flow and groundwater infiltration. You need to understand watershed dynamics to place the containment barrier correctly.',
        prompt:
          'The chemical leak is flowing overland toward a river. Which factor most determines how quickly contamination reaches the water source?',
        choices: [
          'Air temperature and wind speed',
          'Surface topography (slope), soil permeability, and vegetation cover',
          'Only the amount of chemical spilled',
          'Distance from the nearest town',
        ],
        answerIndex: 1,
        explanation:
          'Water and contaminants follow gravity across slopes. Permeable soil absorbs and slows flow but can also allow groundwater contamination. Vegetation slows and filters runoff. These factors collectively control how water moves through watersheds (6.ESS2.4 water cycle).',
        standard: '6.ESS2.4',
      },
      {
        id: 'leak-3',
        step: 3,
        title: 'Ecosystem Remediation Lock',
        clue:
          'Some chemical has already reached the river edge. The final pump sequence requires choosing the best long-term remediation strategy to restore the ecosystem after the leak is stopped.',
        prompt:
          'After containing the chemical leak, which long-term remediation strategy best restores the river ecosystem?',
        choices: [
          'Dredge the entire riverbed and replace with sand',
          'Bioaugmentation with pollutant-degrading microbes, riparian buffer planting, and ongoing water-quality monitoring',
          'Wait for natural recovery without intervention',
          'Introduce non-native filter-feeding species',
        ],
        answerIndex: 1,
        explanation:
          'Bioaugmentation uses microorganisms that break down specific pollutants. Restoring riparian vegetation stabilizes banks and filters runoff. Ongoing monitoring tracks recovery progress. This evidence-based, systems approach best protects long-term biodiversity (6.ESS3.3).',
        standard: '6.ESS3.3',
      },
    ],
  },
  {
    id: 'save-ecosystem',
    title: 'Save an Ecosystem',
    emoji: '🌿',
    tagline: 'The wetland is dying. Identify the cause. Restore the balance.',
    difficulty: 'Intermediate',
    setting:
      'Heron Marsh, home to over 200 native species, is collapsing. Water quality is plummeting, keystone species are disappearing, and an invasive plant is spreading rapidly. The marsh gate control system locks you in until you diagnose and fix each failure in the ecosystem.',
    xpReward: 340,
    puzzles: [
      {
        id: 'ecosystem-1',
        step: 1,
        title: 'Food Web Collapse Diagnosis',
        clue:
          "Monitoring data shows the marsh's top predator (great blue heron) population dropped 70% in two years. Trace the food web to find the root cause.",
        prompt:
          'Heron populations collapsed after aquatic insect populations crashed. Which scenario best explains this chain reaction through the food web?',
        choices: [
          'Herons no longer prefer this habitat due to urban noise',
          'Aquatic insects are not connected to heron food supply',
          'Loss of aquatic insects removed a key energy-transfer link, reducing available energy for fish and then herons',
          'Herons need more water than the marsh provides',
        ],
        answerIndex: 2,
        explanation:
          "Trophic cascades occur when a change at one level ripples through the food web. Aquatic insects are a primary food source for fish, which are the heron's food source. Losing insects reduced energy transfer upward through multiple trophic levels (6.LS2.3).",
        standard: '6.LS2.3',
      },
      {
        id: 'ecosystem-2',
        step: 2,
        title: 'Invasive Species Response Lock',
        clue:
          'Purple loosestrife (an invasive plant) has taken over 40% of the marsh, crowding out native cattails and sedges. You must choose the correct intervention strategy.',
        prompt:
          'Purple loosestrife is outcompeting native marsh plants. Which intervention best controls the invasive species while protecting biodiversity?',
        choices: [
          'Drain the entire marsh to kill the loosestrife',
          'Apply broad-spectrum herbicide to all vegetation',
          'Targeted biological control using loosestrife-specific beetles, plus manual removal and native replanting',
          'Introduce a new predator fish species from a different continent',
        ],
        answerIndex: 2,
        explanation:
          'Biological control using host-specific natural enemies is the most targeted approach. Combined with manual removal in priority areas and native species replanting, it controls the invasive without broad ecosystem harm (6.LS2.5, 6.ETS1.1).',
        standard: '6.LS2.5',
      },
      {
        id: 'ecosystem-3',
        step: 3,
        title: 'Restoration Strategy Unlock',
        clue:
          'With the food web disruption diagnosed and the invasive species managed, you must design the overall restoration plan. The marsh gate will open only when you select the most effective systems-level strategy.',
        prompt:
          'Which restoration plan best addresses all root causes and rebuilds long-term ecosystem stability in Heron Marsh?',
        choices: [
          'Only reintroduce herons and wait',
          'Remove invasive species, restore native plant diversity, reintroduce keystone species, and implement buffer zones against future agricultural runoff',
          'Focus only on water quality and ignore species composition',
          'Convert the marsh into a managed fish farm',
        ],
        answerIndex: 1,
        explanation:
          'Effective ecosystem restoration is multi-layered: remove stressors (invasives), restore habitat structure (native plants), rebuild trophic links (keystone species), and prevent future disruption (buffer zones). This approach targets both immediate causes and long-term resilience (6.LS4.1, 6.ETS1.1).',
        standard: '6.LS4.1',
      },
    ],
  },
  {
    id: 'restore-electricity',
    title: 'Restore Electricity',
    emoji: '⚡',
    tagline: "The city's power grid has failed. Three science keys can bring it back.",
    difficulty: 'Intermediate',
    setting:
      'A severe storm knocked out the regional power grid. Hospitals are on backup power with only 4 hours of fuel remaining. The grid control center is locked behind three scientific verification systems. You must solve each to restore electricity to the city.',
    xpReward: 310,
    puzzles: [
      {
        id: 'electricity-1',
        step: 1,
        title: 'Storm System Analysis Lock',
        clue:
          "Weather radar shows the storm's origin. To unlock the emergency generator sequence, you must correctly identify what atmospheric conditions created this destructive storm system.",
        prompt:
          'A cold front collided with a warm, humid air mass over the city. What type of weather event most likely caused the power outages?',
        choices: [
          'Clear skies and high pressure after the front passed',
          'Severe thunderstorms with lightning and strong winds as warm air rapidly rose and cooled',
          'Calm drizzle typical of low-pressure systems',
          'A drought conditions triggered by the cold front',
        ],
        answerIndex: 1,
        explanation:
          'When a cold front pushes under warm humid air, the warm air rises rapidly. As it cools at altitude, moisture condenses, releasing energy that powers thunderstorm development — lightning, high winds, and heavy rain (6.ESS2.7).',
        standard: '6.ESS2.7',
      },
      {
        id: 'electricity-2',
        step: 2,
        title: 'Renewable Backup Activation Lock',
        clue:
          'The grid needs supplemental power while the main lines are repaired. The emergency renewable energy bank can be activated — but only if you identify the most reliable renewable source for immediate deployment during the recovery period.',
        prompt:
          'The city has battery-backed solar, wind turbines, a small hydropower plant, and a diesel generator. With ongoing storm damage and cloudy skies, which source combination provides the most reliable immediate backup power?',
        choices: [
          'Solar panels only — they work even in storms',
          'Hydropower plant plus battery-stored wind energy, with diesel as a short-term backup',
          'Diesel generator only for maximum reliability',
          'Wait for the storm to fully pass before activating anything',
        ],
        answerIndex: 1,
        explanation:
          'During cloudy, stormy conditions solar output drops. Hydropower from existing water flow and stored wind energy provide the most reliable renewables. Diesel serves as a short-term bridge. A diversified portfolio ensures reliability while minimizing emissions (6.ESS3.2).',
        standard: '6.ESS3.2',
      },
      {
        id: 'electricity-3',
        step: 3,
        title: 'Grid Resilience Design Lock',
        clue:
          "The control center's final lock requires you to recommend a long-term grid design that prevents this kind of total failure from happening again.",
        prompt:
          'Which grid design change would most reduce the risk of city-wide outages from future storm events?',
        choices: [
          'Build taller transmission poles',
          'Transition to all-diesel backup with no renewable integration',
          'Implement a distributed microgrid with local renewable generation, battery storage, and smart switching so neighborhoods can isolate and self-power during failures',
          'Reduce total electricity demand by eliminating non-essential services',
        ],
        answerIndex: 2,
        explanation:
          "Distributed microgrids segment the grid so damage in one area doesn't cascade city-wide. Local renewables and storage allow self-powering during main grid failures. Smart switching isolates damaged sections. This resilience model directly applies renewable energy technologies (6.ESS3.1, 6.ESS3.2).",
        standard: '6.ESS3.1',
      },
    ],
  },
]
