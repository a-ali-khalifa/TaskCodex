//TASKS
export const STATUSES = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export type Status = (typeof STATUSES)[keyof typeof STATUSES];

export const DIFFICULTIES = {
  EASY: { label: "Easy", xp: 100, color: "green" },
  MEDIUM: { label: "Medium", xp: 220, color: "yellow" },
  HARD: { label: "Hard", xp: 500, color: "red" },
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;

export const CATEGORIES = {
  PERSONAL: "🏠 Personal",
  WORK: "💼 Work",
  FITNESS: "💪 Fitness",
  STUDY: "📚 Study",
  OUTDOORS: "🌻 Outdoors",
  ENTERTAINMENT: "🎭 Entertainment",
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];
