import { useMemo } from "react";
import { Task } from "@/types/Task";

export function useTaskStats(tasks: Task[], filteredTasks: Task[]) {
  return useMemo(
    () => ({
      completedCount: tasks.filter((t) => t.completed).length,
      todoCount: filteredTasks.filter((t) => t.status === "TODO").length,
      inProgressCount: filteredTasks.filter((t) => t.status === "IN_PROGRESS")
        .length,
    }),
    [tasks, filteredTasks],
  );
}
