export interface NEETQuestion {
  id: string;
  category: 'Periodic Table' | 'Periodic Trends' | 'Chemical Bonding' | 'p-Block' | 'd-Block' | 'f-Block' | 'Inorganic Chemistry';
  difficulty: '🟢 Easy' | '🟡 Medium' | '🔴 Hard' | '🔥 NEET Challenge';
  type: 'MCQ' | 'Assertion-Reason' | 'Match the Following' | 'Statement-based';
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
  concept: string;
}

export const NEET_QUESTIONS: NEETQuestion[] = [
  {
    id: "q1",
    category: "Periodic Trends",
    difficulty: "🟡 Medium",
    type: "MCQ",
    question: "Which of the following elements has the highest electron gain enthalpy with negative sign?",
    options: ["Fluorine (F)", "Chlorine (Cl)", "Oxygen (O)", "Nitrogen (N)"],
    correctAnswer: 1,
    explanation: "Chlorine (Cl) has the highest negative electron gain enthalpy (-349 kJ/mol) among all elements. Due to the small size of Fluorine (F), interelectronic repulsion in its compact 2p orbitals reduces its electron gain enthalpy compared to Chlorine.",
    concept: "Electron Gain Enthalpy Anomaly in Halogens"
  },
  {
    id: "q2",
    category: "Periodic Table",
    difficulty: "🟢 Easy",
    type: "MCQ",
    question: "The diagonal relationship is most pronounced between which pair of elements?",
    options: ["Lithium and Magnesium", "Beryllium and Aluminum", "Boron and Silicon", "All of the above"],
    correctAnswer: 3,
    explanation: "Diagonal relationships exist between Li & Mg, Be & Al, and B & Si due to similar charge-to-radius ratios (ionic potential).",
    concept: "Diagonal Relationship in s and p Block"
  },
  {
    id: "q3",
    category: "d-Block",
    difficulty: "🔴 Hard",
    type: "Statement-based",
    question: "Consider the following statements regarding transition elements:\nI. Most transition metals exhibit variable oxidation states.\nII. Their ionization enthalpies are intermediate between s- and p-block elements.\nWhich of the above statement(s) is/are correct?",
    options: ["Only I", "Only II", "Both I and II", "Neither I nor II"],
    correctAnswer: 2,
    explanation: "Transition metals have $(n-1)d$ and $ns$ electrons with very small energy difference, allowing them to exhibit variable oxidation states and intermediate ionization enthalpies.",
    concept: "Characteristics of d-Block Elements"
  },
  {
    id: "q4",
    category: "f-Block",
    difficulty: "🟡 Medium",
    type: "MCQ",
    question: "What is the primary cause of Lanthanide Contraction?",
    options: [
      "Poor shielding of nuclear charge by 4f electrons",
      "Increasing nuclear mass",
      "Strong metallic bonding",
      "Filling of 5d orbitals"
    ],
    correctAnswer: 0,
    explanation: "The 4f orbitals have very diffuse shapes and poor shielding effect, causing the effective nuclear charge to pull outer electrons closer, resulting in lanthanide contraction.",
    concept: "Lanthanide Contraction & Shielding"
  },
  {
    id: "q5",
    category: "Chemical Bonding",
    difficulty: "🔥 NEET Challenge",
    type: "MCQ",
    question: "According to Fajan's rule, covalent character is favored by:",
    options: [
      "Small cation and large anion",
      "Large cation and small anion",
      "Large cation and large anion",
      "Small cation and small anion"
    ],
    correctAnswer: 0,
    explanation: "Fajan's rules state that high polarization (covalent character) is favored by small cation size, high cationic charge, and large anion size.",
    concept: "Fajan's Rules and Polarization"
  },
  {
    id: "q6",
    category: "p-Block",
    difficulty: "🟡 Medium",
    type: "MCQ",
    question: "Which of the following noble gases can form stable fluorides like XeF₂, XeF₄, and XeF₆?",
    options: ["Helium", "Neon", "Argon", "Xenon"],
    correctAnswer: 3,
    explanation: "Xenon has a lower ionization enthalpy and larger atomic size compared to lighter noble gases, allowing it to react with fluorine to form xenon fluorides.",
    concept: "Compounds of Xenon"
  },
  {
    id: "q7",
    category: "Periodic Trends",
    difficulty: "🟢 Easy",
    type: "MCQ",
    question: "Across a period from left to right, atomic radius generally:",
    options: ["Increases", "Decreases", "Remains constant", "First decreases then increases"],
    correctAnswer: 1,
    explanation: "Across a period, nuclear charge increases while electrons enter the same shell, pulling the electron cloud closer and decreasing atomic radius.",
    concept: "Periodic Trends in Atomic Radius"
  },
  {
    id: "q8",
    category: "Inorganic Chemistry",
    difficulty: "🔴 Hard",
    type: "Assertion-Reason",
    question: "Assertion (A): Ionization enthalpy of Nitrogen is greater than Oxygen.\nReason (D): Nitrogen has a stable half-filled 2p³ electronic configuration.",
    options: [
      "Both A and R are correct and R is the correct explanation of A",
      "Both A and R are correct but R is not the correct explanation of A",
      "A is correct but R is incorrect",
      "Both A and R are incorrect"
    ],
    correctAnswer: 0,
    explanation: "Nitrogen (1s² 2s² 2p³) has exactly half-filled p orbitals which provide extra exchange energy and stability, requiring more energy to remove an electron than Oxygen (1s² 2s² 2p⁴).",
    concept: "Ionization Enthalpy Anomalies"
  }
];
