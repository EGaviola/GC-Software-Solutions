export type Standard = {
  code: string;
  cluster: string;
  summary: string;
};

export type Mission = {
  id: string;
  labId: string;
  title: string;
  standardCodes: string[];
  prompt: string;
  scenario: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  xp: number;
  isBoss?: boolean;
};

export type Lab = {
  id: string;
  title: string;
  description: string;
  unlockXp: number;
  color: string;
};

export const labs: Lab[] = [
  {
    id: "energy-lab",
    title: "Energy Transfer Lab",
    description: "Master energy conservation, thermal transfer, and engineering design.",
    unlockXp: 0,
    color: "#1f7a8c"
  },
  {
    id: "ecosystem-lab",
    title: "Ecosystems Dome",
    description: "Model population dynamics, food webs, and biodiversity health.",
    unlockXp: 180,
    color: "#2d936c"
  },
  {
    id: "earth-lab",
    title: "Hydrosphere and Atmosphere Lab",
    description: "Investigate convection, climate, weather systems, and water cycling.",
    unlockXp: 360,
    color: "#3867d6"
  },
  {
    id: "human-impact-lab",
    title: "Earth and Human Activity Lab",
    description: "Evaluate sustainability, renewable technologies, and biosphere impacts.",
    unlockXp: 540,
    color: "#f28f3b"
  }
];

export const standards: Standard[] = [
  {
    code: "6.PS3.1",
    cluster: "Energy",
    summary: "Energy conservation during transfer across kinetic, potential, and thermal forms."
  },
  {
    code: "6.PS3.2",
    cluster: "Energy",
    summary: "System changes caused by sound and thermal transfer mechanisms."
  },
  {
    code: "6.ETS1.2",
    cluster: "Engineering Design",
    summary: "Design and test solutions that minimize or maximize thermal transfer."
  },
  {
    code: "6.LS2.3",
    cluster: "Ecosystems",
    summary: "Energy transfer in food webs and energy pyramids."
  },
  {
    code: "6.ESS2.3",
    cluster: "Earth Climate",
    summary: "Heat transfer effects from atmospheric flow, geography, and ocean currents."
  },
  {
    code: "6.LS2.1",
    cluster: "Ecosystems",
    summary: "Evaluate impact of environmental variables on population size."
  },
  {
    code: "6.LS2.5",
    cluster: "Ecosystems",
    summary: "Analyze invasive species impacts in Tennessee and design mitigation."
  },
  {
    code: "6.LS4.1",
    cluster: "Biological Change",
    summary: "Explain biodiversity change impacts on resources and ecosystem services."
  },
  {
    code: "6.ETS1.1",
    cluster: "Engineering Design",
    summary: "Design and improve solutions for maintaining biodiversity."
  },
  {
    code: "6.ESS2.1",
    cluster: "Earth Systems",
    summary: "Diagram atmospheric and oceanic convection from uneven heating."
  },
  {
    code: "6.ESS2.2",
    cluster: "Earth Systems",
    summary: "Gather evidence on thermal and salinity-driven ocean currents."
  },
  {
    code: "6.ESS2.4",
    cluster: "Earth Systems",
    summary: "Model water cycle movement driven by sun and gravity."
  },
  {
    code: "6.ESS2.5",
    cluster: "Earth and Human Activity",
    summary: "Analyze impacts of humans and organisms on water cycle and atmosphere."
  },
  {
    code: "6.ESS2.6",
    cluster: "Climate",
    summary: "Model greenhouse gas regulation of Earth's average surface temperature."
  },
  {
    code: "6.ESS2.7",
    cluster: "Climate",
    summary: "Collect evidence on air mass interactions for local weather prediction."
  },
  {
    code: "6.ESS3.1",
    cluster: "Earth and Human Activity",
    summary: "Explain sustainability impacts of renewable and nonrenewable resources."
  },
  {
    code: "6.ESS3.2",
    cluster: "Earth and Human Activity",
    summary: "Comparison of renewable and alternative energy technologies."
  },
  {
    code: "6.ESS3.3",
    cluster: "Earth and Human Activity",
    summary: "Assess human impacts on conservation, habitat, and species survival."
  }
];

export const missions: Mission[] = [
  {
    id: "energy-lab-001",
    labId: "energy-lab",
    title: "Thermal Shield Challenge",
    standardCodes: ["6.PS3.1", "6.PS3.2", "6.ETS1.2"],
    prompt:
      "A rescue drone battery overheats in direct sun. You can add one insulation layer. Which choice best reduces thermal energy transfer into the battery?",
    scenario:
      "Evaluate conduction, convection, and radiation effects before selecting material.",
    choices: [
      "Thin polished aluminum sheet",
      "Dark matte metal plate",
      "Foam + reflective foil composite",
      "Open vent with no insulation"
    ],
    answerIndex: 2,
    explanation:
      "Foam limits conduction while reflective foil reduces radiant heat absorption, minimizing total thermal transfer.",
    xp: 120
  },
  {
    id: "energy-lab-002",
    labId: "energy-lab",
    title: "Kinetic Energy Data Sprint",
    standardCodes: ["6.PS3.1"],
    prompt:
      "Two carts travel on a track. Cart A has twice the mass of cart B at the same speed. What best describes cart A's kinetic energy?",
    scenario: "Interpret model data from your motion sensor table.",
    choices: [
      "Half as much",
      "The same",
      "Twice as much",
      "Cannot be compared"
    ],
    answerIndex: 2,
    explanation: "At equal speed, kinetic energy increases with mass. Doubling mass doubles kinetic energy.",
    xp: 90
  },
  {
    id: "energy-lab-boss",
    labId: "energy-lab",
    title: "Boss: Space Habitat Heat Leak",
    standardCodes: ["6.PS3.1", "6.PS3.2", "6.ETS1.2"],
    prompt:
      "Your space habitat loses heat overnight. Which redesign best stabilizes internal temperature while minimizing total transfer?",
    scenario: "Combine material choice, airflow control, and radiation shielding into one prototype.",
    choices: [
      "Single steel wall with open vents",
      "Insulated double wall with reflective outer coating and adjustable vents",
      "Dark exterior paint and ceiling fan only",
      "High-conductivity fins on all outer panels"
    ],
    answerIndex: 1,
    explanation:
      "A multi-layer insulator cuts conduction, reflective coating limits radiation, and controlled vents manage convection.",
    xp: 180,
    isBoss: true
  },
  {
    id: "ecosystem-lab-001",
    labId: "ecosystem-lab",
    title: "Food Web Energy Cascade",
    standardCodes: ["6.LS2.3"],
    prompt:
      "In a coastal food web, disease sharply reduces small fish. What is the most likely immediate energy-transfer effect?",
    scenario: "Track energy flow from producers to top predators in the food web model.",
    choices: [
      "Top predators gain energy because competition decreases",
      "Primary consumers gain energy because fewer fish consume algae",
      "Energy reaching top predators decreases due to disrupted transfer",
      "No change, because pyramids always remain stable"
    ],
    answerIndex: 2,
    explanation:
      "Removing a key middle trophic link reduces energy passed upward to higher-level consumers.",
    xp: 100
  },
  {
    id: "ecosystem-lab-002",
    labId: "ecosystem-lab",
    title: "Invasive Species Mitigation",
    standardCodes: ["6.LS2.5", "6.ETS1.1"],
    prompt:
      "An invasive fish species outcompetes native fish in a Tennessee reservoir. Which plan best mitigates impact while protecting biodiversity?",
    scenario: "Select a solution with evidence, tradeoffs, and sustainability.",
    choices: [
      "Introduce another predator without study",
      "Remove all native plants to reduce habitat",
      "Targeted removal plus habitat restoration and monitoring",
      "Do nothing and wait for natural balance"
    ],
    answerIndex: 2,
    explanation:
      "Combining targeted control with habitat restoration protects natives and supports long-term ecosystem stability.",
    xp: 120
  },
  {
    id: "ecosystem-lab-boss",
    labId: "ecosystem-lab",
    title: "Boss: Biome Rescue Network",
    standardCodes: ["6.LS2.1", "6.LS2.3", "6.LS4.1"],
    prompt:
      "A drought and predator decline hit connected ecosystems. Which intervention plan best stabilizes populations and ecosystem services?",
    scenario: "Balance water access, species protection, and food web energy transfer across biomes.",
    choices: [
      "Increase one predator species only",
      "Focus only on tourism restrictions",
      "Restore wetlands, protect keystone species, and manage water use",
      "Remove all competing species"
    ],
    answerIndex: 2,
    explanation:
      "Systems-level intervention addresses abiotic stressors and trophic relationships together.",
    xp: 200,
    isBoss: true
  },
  {
    id: "earth-lab-001",
    labId: "earth-lab",
    title: "Convection Current Mapper",
    standardCodes: ["6.ESS2.1", "6.ESS2.2"],
    prompt:
      "Why do major ocean convection currents form predictable global loops?",
    scenario: "Interpret a model with uneven heating and salinity gradients.",
    choices: [
      "Only moon phases drive them",
      "Solar heating differences and salinity density changes drive circulation",
      "Current loops are random",
      "Only wind speed matters"
    ],
    answerIndex: 1,
    explanation:
      "Uneven thermal input and salinity differences create density-driven flow patterns.",
    xp: 110
  },
  {
    id: "earth-lab-002",
    labId: "earth-lab",
    title: "Weather Front Prediction",
    standardCodes: ["6.ESS2.7"],
    prompt:
      "Radar shows a cold front moving into warm humid air. What local weather is most probable next?",
    scenario: "Use air mass interaction evidence to predict weather changes.",
    choices: [
      "Clear skies and stable pressure",
      "Rapid cloud growth, storms, and a temperature drop",
      "No weather change",
      "Immediate drought conditions"
    ],
    answerIndex: 1,
    explanation:
      "Cold fronts force warm air upward, often producing storms and a following temperature decrease.",
    xp: 110
  },
  {
    id: "earth-lab-boss",
    labId: "earth-lab",
    title: "Boss: Climate Command",
    standardCodes: ["6.ESS2.3", "6.ESS2.4", "6.ESS2.6"],
    prompt:
      "A region faces hotter summers and erratic rainfall. Which explanation and model update best fits the evidence?",
    scenario: "Combine ocean currents, atmospheric flow, greenhouse effects, and water cycle feedback.",
    choices: [
      "Remove ocean current data from the model",
      "Assume greenhouse gases do not affect average temperature",
      "Integrate heat-transfer circulation changes and greenhouse forcing in the water-cycle model",
      "Use only local temperature records"
    ],
    answerIndex: 2,
    explanation:
      "Climate outcomes emerge from interacting energy transfer systems, circulation, and atmospheric composition.",
    xp: 220,
    isBoss: true
  },
  {
    id: "human-impact-lab-001",
    labId: "human-impact-lab",
    title: "Resource Sustainability Audit",
    standardCodes: ["6.ESS3.1"],
    prompt:
      "A city can choose one long-term energy plan. Which option is most sustainable?",
    scenario: "Compare renewable and nonrenewable resource data over 20 years.",
    choices: [
      "Short-term low-cost coal expansion",
      "Mixed grid with increasing solar, wind, and storage",
      "Diesel-only backup plan",
      "No investment in grid upgrades"
    ],
    answerIndex: 1,
    explanation:
      "A diversified renewable strategy improves long-term sustainability and resilience.",
    xp: 120
  },
  {
    id: "human-impact-lab-002",
    labId: "human-impact-lab",
    title: "Biosphere Impact Investigation",
    standardCodes: ["6.ESS3.3", "6.ESS2.5"],
    prompt:
      "Which action most directly reduces human pressure on local watershed and habitat systems?",
    scenario: "Evaluate conservation policies using water-quality and species data.",
    choices: [
      "Increase paved surfaces near streams",
      "Restore riparian buffers and improve stormwater capture",
      "Remove all wetland protections",
      "Expand unmanaged shoreline development"
    ],
    answerIndex: 1,
    explanation:
      "Riparian restoration and runoff control protect both hydrologic systems and biodiversity.",
    xp: 130
  },
  {
    id: "human-impact-lab-boss",
    labId: "human-impact-lab",
    title: "Final Boss: Grid of the Future",
    standardCodes: ["6.ESS3.1", "6.ESS3.2", "6.ESS3.3"],
    prompt:
      "Design a regional plan that reduces emissions, protects ecosystems, and keeps reliable power. Which proposal is strongest?",
    scenario: "Balance technology comparison, resource sustainability, and biosphere stewardship.",
    choices: [
      "Single-source fossil expansion with no habitat plan",
      "Renewable portfolio plus storage, efficiency upgrades, and conservation zoning",
      "Hydropower only regardless of habitat disruption",
      "Delay all action for 10 years"
    ],
    answerIndex: 1,
    explanation:
      "A balanced portfolio with conservation planning best aligns reliability, sustainability, and ecosystem protection.",
    xp: 260,
    isBoss: true
  }
];
