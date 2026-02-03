import { Category, Difficulty, Status } from "@/lib/enums";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category?: Category | string;
  difficulty: Difficulty;
  xp?: number; //e.g., DIFFICULTIES.MEDIUM.xp
  status: Status;
  createdAt: string;
  dueDate?: string;
  completed: boolean;
  completedAt: string | null;
  deletionTimer?: number; // Time until task is deleted or moved (can be undone before)
};
