import { useSound } from "@/lib/hooks/useSound";
import { SOUND_PATHS } from "@/lib/enums";
import { Task } from "@/types/Task";

export function useTaskActions(
  tasks: Task[],
  setTasks: (updater: (prev: Task[]) => Task[]) => void,
  updateProgress: (xp: number, isGaining: boolean) => void,
  isSoundMuted: boolean,
) {
  const playCompleteTask = useSound(SOUND_PATHS.TASK_COMPLETE, 0.05);
  const playAddedTask = useSound(SOUND_PATHS.TASK_ADDED, 0.15);

  const toggleCompletion = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const isCompleting = !task.completed;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: isCompleting ? "COMPLETED" : "TODO",
              completed: isCompleting,
              completedAt: isCompleting ? new Date().toISOString() : null,
              deletionTimer: isCompleting ? Date.now() : undefined,
            }
          : t,
      ),
    );

    if (isCompleting && !isSoundMuted) {
      playCompleteTask();
    }

    updateProgress(task.xp!, isCompleting);
  };

  const toggleStatus = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === "COMPLETED") return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: t.status === "TODO" ? "IN_PROGRESS" : "TODO",
            }
          : t,
      ),
    );

    if (!isSoundMuted) {
      playAddedTask();
    }
  };

  return { toggleCompletion, toggleStatus };
}
