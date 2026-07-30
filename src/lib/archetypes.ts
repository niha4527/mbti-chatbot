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

export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: "EI",
    text: "It's Friday night after a long week. What sounds like pure bliss?",
    options: [
      {
        label: "Hitting up a lively party or going out with a fun group of friends",
        value: "A",
        trait: "E",
      },
      {
        label: "Cozying up at home with movies, snacks, and zero social interaction",
        value: "B",
        trait: "I",
      },
    ],
  },
  {
    id: 2,
    axis: "SN",
    text: "When planning a vacation, what is your go-to style?",
    options: [
      {
        label: "Focusing on concrete details, popular sights, and practical itineraries",
        value: "A",
        trait: "S",
      },
      {
        label: "Exploring hidden gems, spontaneous vibes, and big abstract ideas",
        value: "B",
        trait: "N",
      },
    ],
  },
  {
    id: 3,
    axis: "TF",
    text: "A friend asks for your honest opinion on a questionable decision. You:",
    options: [
      {
        label: "Give it to them straight with logical truth, even if it stings a bit",
        value: "A",
        trait: "T",
      },
      {
        label: "Soften the blow and prioritize their feelings and emotional comfort",
        value: "B",
        trait: "F",
      },
    ],
  },
  {
    id: 4,
    axis: "JP",
    text: "How do you handle your daily schedule and personal space?",
    options: [
      {
        label: "Structured to-do lists, set routines, and organized calendars",
        value: "A",
        trait: "J",
      },
      {
        label: "Go with the flow, adapt on the fly, and embrace a little messy freedom",
        value: "B",
        trait: "P",
      },
    ],
  },
  {
    id: 5,
    axis: "TIE",
    text: "When making a huge life decision, what gets the final vote?",
    options: [
      {
        label: "Cold hard logic, facts, and objective pros/cons list",
        value: "A",
        trait: "T",
      },
      {
        label: "Gut feeling, heart's desire, and how it aligns with your values",
        value: "B",
        trait: "F",
      },
    ],
  },
];
