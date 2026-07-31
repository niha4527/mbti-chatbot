export interface Archetype {
  mbti: string;
  techName: string;
  tagline: string;
  characteristics: string[];
}

export const ARCHETYPES: Record<string, Archetype> = {
  INTJ: {
    mbti: "INTJ",
    techName: "The Mastermind Architect",
    tagline: "Planning 10 steps ahead while everyone else is still tying their shoes.",
    characteristics: ["Strategic", "Independent", "Perfectionist", "Analytical"],
  },
  INTP: {
    mbti: "INTP",
    techName: "The Deep Thinker",
    tagline: "Overthinking the universe at 3 AM for fun.",
    characteristics: ["Curious", "Logical", "Detached", "Original"],
  },
  ENTJ: {
    mbti: "ENTJ",
    techName: "The Chief Executive",
    tagline: "Organizing your life for you whether you asked for it or not.",
    characteristics: ["Ambitious", "Direct", "Decisive", "Leader"],
  },
  ENTP: {
    mbti: "ENTP",
    techName: "The Devil's Advocate",
    tagline: "Will argue the opposite side just to keep the conversation spattered.",
    characteristics: ["Witty", "Unconventional", "Debater", "Enthusiastic"],
  },
  INFJ: {
    mbti: "INFJ",
    techName: "The Mystical Counselor",
    tagline: "Reading your mind and feeling your emotions from across the room.",
    characteristics: ["Insightful", "Empathetic", "Idealistic", "Reserved"],
  },
  INFP: {
    mbti: "INFP",
    techName: "The Romantic Idealist",
    tagline: "Living in a world of daydreaming and deep feelings.",
    characteristics: ["Creative", "Gentle", "Passionate", "Intuitive"],
  },
  ENFJ: {
    mbti: "ENFJ",
    techName: "The People Connector",
    tagline: "Adopting introverts and making sure everyone feels included.",
    characteristics: ["Charismatic", "Warm", "Supportive", "Persuasive"],
  },
  ENFP: {
    mbti: "ENFP",
    techName: "The Spark Plug",
    tagline: "Has 50 new hobbies this month and 0 finished projects.",
    characteristics: ["Spontaneous", "Energetic", "Imaginative", "Warm"],
  },
  ISTJ: {
    mbti: "ISTJ",
    techName: "The Reliable Anchor",
    tagline: "Always on time, always prepared, and slightly judging your chaos.",
    characteristics: ["Organized", "Dutiful", "Practical", "Factual"],
  },
  ISFJ: {
    mbti: "ISFJ",
    techName: "The Devoted Protector",
    tagline: "Remembers your birthday and brings extra snacks for everyone.",
    characteristics: ["Loyal", "Thoughtful", "Patient", "Detail-Oriented"],
  },
  ESTJ: {
    mbti: "ESTJ",
    techName: "The Rule Enforcer",
    tagline: "Running the group chat like a military operation.",
    characteristics: ["Efficient", "Structured", "Honest", "Direct"],
  },
  ESFJ: {
    mbti: "ESFJ",
    techName: "The Host Extraordinaire",
    tagline: "Making sure everyone is fed, happy, and fully caught up on gossip.",
    characteristics: ["Sociable", "Caring", "Harmonious", "Practical"],
  },
  ISTP: {
    mbti: "ISTP",
    techName: "The Cool Renegade",
    tagline: "Fixes things effortlessly and speaks only when necessary.",
    characteristics: ["Pragmatic", "Calm", "Action-Oriented", "Resourceful"],
  },
  ISFP: {
    mbti: "ISFP",
    techName: "The Free-Spirited Artist",
    tagline: "Living aesthetically and avoiding drama at all costs.",
    characteristics: ["Artistic", "Easygoing", "Sensitive", "Authentic"],
  },
  ESTP: {
    mbti: "ESTP",
    techName: "The Thrill Seeker",
    tagline: "Leaping before looking and somehow landing on their feet.",
    characteristics: ["Bold", "Perceptive", "Dynamic", "Spontaneous"],
  },
  ESFP: {
    mbti: "ESFP",
    techName: "The Life of the Party",
    tagline: "Turning every ordinary moment into a main-character event.",
    characteristics: ["Playful", "Expressive", "Fun-Loving", "Generous"],
  },
};

export interface Question {
  id: number;
  axis: "EI" | "SN" | "TF" | "JP" | "TIE";
  text: string;
  options: {
    label: string;
    value: string;
    trait: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  }[];
}

// Question Pools per axis to ensure fresh variety on every run
export const QUESTION_POOLS: Record<string, Question[]> = {
  EI: [
    {
      id: 1,
      axis: "EI",
      text: "It's Friday night after a long week. What sounds like pure bliss?",
      options: [
        { label: "Hitting up a lively party or going out with a fun group", value: "A", trait: "E" },
        { label: "Cozying up at home with movies, snacks, and zero social interaction", value: "B", trait: "I" },
      ],
    },
    {
      id: 2,
      axis: "EI",
      text: "You walk into a crowded social gathering where you barely know anyone. You:",
      options: [
        { label: "Work the room, introduce yourself, and make new besties", value: "A", trait: "E" },
        { label: "Find one comfy corner or hang out near the snacks table", value: "B", trait: "I" },
      ],
    },
    {
      id: 3,
      axis: "EI",
      text: "How do you usually process your big ideas or problems?",
      options: [
        { label: "Talk them out out loud with anyone willing to listen", value: "A", trait: "E" },
        { label: "Mull them over quietly in your own head first", value: "B", trait: "I" },
      ],
    },
  ],
  SN: [
    {
      id: 4,
      axis: "SN",
      text: "When planning a trip, what is your primary style?",
      options: [
        { label: "Focusing on concrete details, top sights, and realistic schedules", value: "A", trait: "S" },
        { label: "Chasing spontaneous vibes, hidden gems, and wild adventures", value: "B", trait: "N" },
      ],
    },
    {
      id: 5,
      axis: "SN",
      text: "When learning something brand new, what grabs your interest more?",
      options: [
        { label: "Practical facts, real-world examples, and immediate step-by-step uses", value: "A", trait: "S" },
        { label: "The overarching concepts, future possibilities, and big picture theory", value: "B", trait: "N" },
      ],
    },
    {
      id: 6,
      axis: "SN",
      text: "How do you describe a memorable event to your friends later?",
      options: [
        { label: "Detailing exactly who was there, what happened, and what was said", value: "A", trait: "S" },
        { label: "Describing the overall mood, energy, and wild story arc", value: "B", trait: "N" },
      ],
    },
  ],
  TF: [
    {
      id: 7,
      axis: "TF",
      text: "A friend asks for your honest opinion on a questionable decision. You:",
      options: [
        { label: "Give it to them straight with logical truth, even if it stings", value: "A", trait: "T" },
        { label: "Soften the blow and prioritize their feelings and emotional comfort", value: "B", trait: "F" },
      ],
    },
    {
      id: 8,
      axis: "TF",
      text: "During a debate or group argument, what matters more to you?",
      options: [
        { label: "Proving objective facts and logical fairness", value: "A", trait: "T" },
        { label: "Keeping group harmony and ensuring nobody feels left out or hurt", value: "B", trait: "F" },
      ],
    },
    {
      id: 9,
      axis: "TF",
      text: "What drives you crazier in people?",
      options: [
        { label: "Irrational emotional outbursts that ignore basic common sense", value: "A", trait: "T" },
        { label: "Cold, unfeeling arrogance that completely ignores how people feel", value: "B", trait: "F" },
      ],
    },
  ],
  JP: [
    {
      id: 10,
      axis: "JP",
      text: "How do you handle your daily schedule and personal space?",
      options: [
        { label: "Structured to-do lists, set routines, and organized calendars", value: "A", trait: "J" },
        { label: "Go with the flow, adapt on the fly, and embrace a little messy freedom", value: "B", trait: "P" },
      ],
    },
    {
      id: 11,
      axis: "JP",
      text: "You have a major deadline or event coming up in a week. You:",
      options: [
        { label: "Pace yourself, finishing early so there's zero last-minute stress", value: "A", trait: "J" },
        { label: "Rely on last-minute pressure to spark your peak inspiration", value: "B", trait: "P" },
      ],
    },
    {
      id: 12,
      axis: "JP",
      text: "How do you feel when your weekend plans get suddenly changed last minute?",
      options: [
        { label: "Annoyed—you already mapped out your day and mentally prepared", value: "A", trait: "J" },
        { label: "Excited—spontaneity makes life way more interesting anyway!", value: "B", trait: "P" },
      ],
    },
  ],
  TIE: [
    {
      id: 13,
      axis: "TIE",
      text: "When making a huge life decision, what gets the final vote?",
      options: [
        { label: "Cold hard logic, facts, and objective pros/cons list", value: "A", trait: "T" },
        { label: "Gut feeling, heart's desire, and personal core values", value: "B", trait: "F" },
      ],
    },
    {
      id: 14,
      axis: "TIE",
      text: "Which compliment would make you feel prouder?",
      options: [
        { label: "'You are remarkably sharp, competent, and brilliant.'", value: "A", trait: "T" },
        { label: "'You are incredibly kind, empathetic, and deeply appreciated.'", value: "B", trait: "F" },
      ],
    },
  ],
};

// Function to generate 5 random questions (1 from each category pool)
export function getRandomQuestions(): Question[] {
  const axes: Array<keyof typeof QUESTION_POOLS> = ["EI", "SN", "TF", "JP", "TIE"];
  return axes.map((axis, idx) => {
    const pool = QUESTION_POOLS[axis];
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    return {
      ...selected,
      id: idx + 1,
    };
  });
}
