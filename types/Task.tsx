import { TaskCategory } from "@/lib/enums/TaskCategory";
import { TaskDifficulty } from "@/lib/enums/TaskDifficulty";
import { TaskStatus } from "@/lib/enums/TaskStatus";

export type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory | string;
  difficulty: TaskDifficulty;
  xp: number;
  status: TaskStatus;
  createdAt: string;
  dueDate?: string;
  completed: boolean;
  completedAt: string | null;
};
