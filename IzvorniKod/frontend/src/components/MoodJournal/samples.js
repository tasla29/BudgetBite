// Mock data za Mood Journal i Reflection page. Kada se implementira backend, ovi podaci će se dohvaćati od tamo.

export const MOOD_SCALE = [
  { value: 1, emoji: "😞", label: "Vrlo loše" },
  { value: 2, emoji: "🙁", label: "Loše" },
  { value: 3, emoji: "😐", label: "Neutralno" },
  { value: 4, emoji: "🙂", label: "Dobro" },
  { value: 5, emoji: "😄", label: "Odlično" },
];

export const sampleMoodEntries = [
  {
    id: 501,
    mealName: "Zobena kaša s bananom",
    consumedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    moodBefore: 2,
    moodAfter: 4,
    notes: "Lagani doručak mi je pomogao da se razbudim prije predavanja.",
  },
  {
    id: 502,
    mealName: "Povrtni wok",
    consumedAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
    moodBefore: 3,
    moodAfter: 5,
    notes: "Super mi je sjeo prije treninga.",
  },
  {
    id: 503,
    mealName: "Tuna sendvič",
    consumedAt: new Date(Date.now() - 1000 * 60 * 60 * 50),
    moodBefore: 2,
    moodAfter: 3,
    notes: "Brz obrok, mogao bi dodati više povrća.",
  },
];

export const sampleReflectionWeekly = [
  {
    weekLabel: "45",
    averageMoodBefore: 2.3,
    averageMoodAfter: 3.8,
  },
  {
    weekLabel: "46",
    averageMoodBefore: 2.8,
    averageMoodAfter: 4.1,
  },
  {
    weekLabel: "47",
    averageMoodBefore: 3.1,
    averageMoodAfter: 4.5,
  },
  {
    weekLabel: "48",
    averageMoodBefore: 2.4,
    averageMoodAfter: 3.4,
  },
  {
    weekLabel: "49",
    averageMoodBefore: 3.5,
    averageMoodAfter: 4.7,
  },
];

export const sampleCostHistory = [
  { weekLabel: "45", totalSpent: 26.5 },
  { weekLabel: "46", totalSpent: 29.2 },
  { weekLabel: "47", totalSpent: 24.7 },
  { weekLabel: "48", totalSpent: 32.0 },
  { weekLabel: "49", totalSpent: 27.9 },
];
