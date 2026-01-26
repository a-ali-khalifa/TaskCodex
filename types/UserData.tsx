import { Task } from "@/types/Task";
import { UserProgress } from "@/types/UserProgress";

export type UserData = {
  id: string; // crypto.randomUUID()
  username: string;
  tasks: Task[];
  progress: UserProgress; // level & xp
  updatedAt: string;
  version: number;
};
