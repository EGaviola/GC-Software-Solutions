export type Standard = {
  code: string;
  cluster: string;
  summary: string;
};

export type Mission = {
  id: string;
  title: string;
  standardCodes: string[];
  prompt: string;
  scenario: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  xp: number;
};

export const grade6Standards: Standard[] = [
  {
    code: "6.PS3.1",
    cluster: "Energy",
    summary:
      "Analyze sources of energy and gather evidence that energy is conserved during transfer."
  },
  {
    code: "6.PS3.2",
    cluster: "Energy",
    summary:
      "Use models to show system changes caused by sound or thermal energy transfer."
  },
  {
    code: "6.ETS1.2",
    cluster: "Energy Engineering",
    summary:
      "Design and test a device to minimize or maximize thermal energy transfer."
  },
  {
    code: "6.LS2.3",
    cluster: "Ecosystems",
    summary: "Use a model to explain energy transfer through food webs and pyramids."
  },
  {
    code: "6.ESS2.3",
    cluster: "Climate",
    summary:
      "Explain how atmospheric flow, geography, and ocean currents affect climate through heat transfer."
  },
  {
    code: "6.ESS3.2",
    cluster: "Earth and Human Activity",
    summary:
      "Investigate and compare renewable and alternative energy technologies."
  }
];

export const starterMissions: Mission[] = [
  {
    id: "energy-lab-001",
    title: "Thermal Shield Challenge",
    standardCodes: ["6.PS3.1", "6.PS3.2", "6.ETS1.2"],
    prompt:
      "A rescue drone battery overheats in direct sun. You can add one layer of insulation. Which choice best reduces thermal energy transfer into the battery?",
    scenario:
      "You are in the Energy Transfer Lab. Test each material based on conduction and radiation behavior.",
    choices: [
      "Thin polished aluminum sheet",
      "Dark matte metal plate",
      "Foam + reflective foil composite",
      "Open vent with no insulation"
    ],
    answerIndex: 2,
    explanation:
      "Foam limits conduction and trapped air slows heat flow, while reflective foil reduces radiant heat absorption.",
    xp: 120
  },
  {
    id: "ecosystem-lab-001",
    title: "Food Web Energy Cascade",
    standardCodes: ["6.LS2.3"],
    prompt:
      "In a coastal food web, a disease sharply reduces the small fish population. What is the most likely immediate energy-transfer effect?",
    scenario:
      "You are in the Ocean Ecology Dome. Track producer, consumer, and predator energy pathways.",
    choices: [
      "Top predators gain energy because competition decreases",
      "Primary consumers gain energy because fewer fish eat algae",
      "Energy reaching top predators decreases due to a disrupted transfer chain",
      "No change, because energy pyramids are constant"
    ],
    answerIndex: 2,
    explanation:
      "Energy transfer depends on population links. A reduced middle trophic level lowers energy available to higher levels.",
    xp: 100
  }
];
