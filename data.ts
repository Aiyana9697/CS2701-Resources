export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  extendedDetails: string; // New field for deep reading
  impact: 'positive' | 'mixed' | 'negative';
}

export interface Infographic {
  id: number;
  title: string;
  category: 'Deep Sea Mining' | 'Ecosystems' | 'Legislation';
  imageUrl: string; // We will use specific placeholder colors to differentiate
  summary: string;
  fullContent: string[]; // Array of paragraphs for the modal
  keyStats: string[]; // New field for "Quick Facts"
}

// RESEARCHED TIMELINE DATA
export const timelineData: TimelineEvent[] = [
  { 
    id: 1, 
    year: "1982", 
    title: "UNCLOS Adopted", 
    description: "The 'Constitution for the Oceans' is signed, defining maritime zones.", 
    extendedDetails: "The United Nations Convention on the Law of the Sea (UNCLOS) defined the 200-nautical-mile Exclusive Economic Zone (EEZ) and declared the seabed beyond national jurisdiction as the 'Common Heritage of Mankind,' managed by the ISA.",
    impact: "positive" 
  },
  { 
    id: 2, 
    year: "1994", 
    title: "ISA Operations Begin", 
    description: "The International Seabed Authority (ISA) is formally established in Jamaica.", 
    extendedDetails: "The ISA was tasked with organizing and controlling all mineral-related activities in the international seabed area. Its dual mandate—to facilitate mining while protecting the marine environment—remains a subject of intense global debate today.",
    impact: "mixed" 
  },
  { 
    id: 3, 
    year: "2015", 
    title: "SDG 14 Established", 
    description: "The UN adopts the 2030 Agenda, including Goal 14: Life Below Water.", 
    extendedDetails: "SDG 14 was the first universal global framework to explicitly target marine pollution, ocean acidification, and the regulation of harvesting to end overfishing. It set specific targets for conserving at least 10% of coastal and marine areas.",
    impact: "positive" 
  },
  { 
    id: 4, 
    year: "2023", 
    title: "The High Seas Treaty", 
    description: "Nations agree to the BBNJ treaty to protect biodiversity beyond national jurisdiction.", 
    extendedDetails: "After nearly two decades of talks, the Biodiversity Beyond National Jurisdiction (BBNJ) treaty was agreed upon. It provides a legal framework for establishing Marine Protected Areas (MPAs) on the high seas, which cover nearly two-thirds of the ocean.",
    impact: "positive" 
  },
  { 
    id: 5, 
    year: "2024", 
    title: "The Mining Moratorium Call", 
    description: "25+ countries call for a 'precautionary pause' on deep-sea mining.", 
    extendedDetails: "With the ISA nearing the finalization of the Mining Code, a growing coalition of nations (including France, Canada, and the UK) argued that scientific knowledge of the deep sea is insufficient to approve commercial mining without risking irreversible ecological damage.",
    impact: "mixed" 
  }
];

// RESEARCHED INFOGRAPHIC DATA
export const infographicData: Infographic[] = [
  { 
    id: 1, 
    title: "Polymetallic Nodules", 
    category: "Deep Sea Mining", 
    imageUrl: "https://placehold.co/800x600/1e293b/FFF?text=Nodules", 
    summary: "The primary target for deep-sea mining: potato-sized rocks rich in battery metals.", 
    fullContent: [
      "Polymetallic nodules are authigenic deposits found on the abyssal plains, most notably in the Clarion-Clipperton Zone (CCZ) in the Pacific. They take millions of years to form, growing by precipitating metals from seawater around a core fragment.",
      "These nodules are rich in manganese, nickel, copper, and cobalt—metals essential for EV batteries and renewable energy storage. Proponents argue extracting them is less damaging than rainforest mining.",
      "However, nodules are also a substrate for unique life forms. Sponges, corals, and xenophyophores rely on these hard surfaces in the soft sediment. Removing the nodules effectively removes the habitat forever, as they do not grow back on human timescales."
    ],
    keyStats: [
      "Growth Rate: 1-10 mm per million years",
      "Location: 4,000 - 6,000 meters deep",
      "Resource: Estimated 21 billion tonnes in CCZ"
    ]
  },
  { 
    id: 2, 
    title: "Hydrothermal Vents", 
    category: "Ecosystems", 
    imageUrl: "https://placehold.co/800x600/064e3b/FFF?text=Vents", 
    summary: "Underwater geysers hosting unique life powered by chemosynthesis, not sunlight.", 
    fullContent: [
      "Discovered in 1977, hydrothermal vents are fissures on the seabed that release geothermally heated water rich in minerals. They are often associated with Seafloor Massive Sulfides (SMS), another target for mining.",
      "Unlike most life on Earth, vent ecosystems do not rely on photosynthesis. Instead, bacteria convert toxic chemicals like hydrogen sulfide into energy (chemosynthesis), supporting giant tube worms, yeti crabs, and scaly-foot snails.",
      "Mining these vents for copper and gold poses a threat to these endemic species, many of which exist nowhere else on Earth. The physical destruction of the vent chimneys would likely lead to immediate localized extinction."
    ],
    keyStats: [
      "Temperature: Up to 400°C (750°F)",
      "Biodiversity: High endemism (species found nowhere else)",
      "Depth: Usually 1,500 - 4,000 meters"
    ]
  },
  { 
    id: 3, 
    title: "Sediment Plumes", 
    category: "Deep Sea Mining", 
    imageUrl: "https://placehold.co/800x600/7f1d1d/FFF?text=Plumes", 
    summary: "The 'smog' of the sea: how mining vehicles choke marine life.", 
    fullContent: [
      "Deep-sea mining collectors are massive machines resembling underwater bulldozers. As they harvest nodules, they disturb the top layer of soft sediment, creating clouds of particles known as 'plumes'.",
      "These plumes can drift for hundreds of kilometers. When the sediment eventually settles, it can bury slow-moving organisms and clog the delicate feeding structures of filter feeders like corals and sponges.",
      "Furthermore, the sediment cloud blocks bioluminescence (light created by animals), which is the primary form of communication and hunting in the deep ocean, potentially disrupting the entire food web."
    ],
    keyStats: [
      "Spread: Plumes can travel 100+ km",
      "Impact: Smothers filter feeders",
      "Duration: Suspended particles may linger for months"
    ]
  },
  { 
    id: 4, 
    title: "The 'Twilight Zone' Gap", 
    category: "Ecosystems", 
    imageUrl: "https://placehold.co/800x600/172554/FFF?text=Twilight+Zone", 
    summary: "How industrial noise and waste affect the mid-water column.", 
    fullContent: [
      "While mining happens on the seafloor, the return water (containing sediment and fines) is often discharged in the mid-water column, or 'Twilight Zone' (200m to 1000m deep).",
      "This zone contains the greatest biomass on Earth and is critical for carbon sequestration. The daily vertical migration of fish here moves carbon from the surface to the deep.",
      "Discharging waste here introduces noise, light, and turbidity to a pristine environment. Scientists warn that disrupting the Twilight Zone could reduce the ocean's ability to absorb human-produced CO2."
    ],
    keyStats: [
      "Depth: 200m - 1000m",
      "Importance: Critical for Carbon Sequestration",
      "Risk: Noise pollution & water turbidity"
    ]
  },
  { 
    id: 5, 
    title: "The Precautionary Principle", 
    category: "Legislation", 
    imageUrl: "https://placehold.co/800x600/4c1d95/FFF?text=Precaution", 
    summary: "The legal argument for pausing exploitation until science catches up.", 
    fullContent: [
      "The Precautionary Principle is a core tenet of international environmental law. It states that if an action has a suspected risk of causing harm to the public or the environment, the burden of proof that it is NOT harmful falls on those taking the action.",
      "In the context of SDG 14, this principle is the foundation for the call for a moratorium. Scientists argue we have explored less than 5% of the deep ocean.",
      "Without a baseline understanding of what lives there, it is impossible to conduct a valid Environmental Impact Assessment (EIA). Therefore, mining should not proceed until the science is sufficient."
    ],
    keyStats: [
      "Concept: 'Do no harm' before acting",
      "Adoption: Rio Declaration (1992)",
      "Status: Central to current ISA debates"
    ]
  }
];