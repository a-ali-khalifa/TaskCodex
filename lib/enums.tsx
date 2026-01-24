//TASKS
export const STATUSES = {
  TODO: {
    label: "Todo",
    style: "border border-gray-400 bg-gray-100 text-gray-600",
  },
  IN_PROGRESS: {
    label: "In Progress",
    style: "border border-primary bg-blue-100 text-primary",
  },
  COMPLETED: {
    label: "Completed",
    style: "border border-green-400 bg-green-100 text-green-600",
  },
} as const;

export type Status = keyof typeof STATUSES;

export const DIFFICULTIES = {
  EASY: { label: "Easy", xp: 100, color: "#006C14", background: "#D0FFBA" },
  MEDIUM: { label: "Medium", xp: 220, color: "#5B5B00", background: "#FFF1BA" },
  HARD: { label: "Hard", xp: 500, color: "#88001D", background: "#FFBAC4" },
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

//SOUNDS
export const SOUND_PATHS = {
  TASK_COMPLETE: "/sounds/complete_task.wav",
  TASK_ADDED: "/sounds/added_task.wav",
  LEVEL_UP: "/sounds/level_up.mp3",
  TYPING: "/sounds/type.wav",
};
