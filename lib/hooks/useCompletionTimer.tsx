import {
  TASK_TIMER_DURATION,
  TASK_TIMER_UPDATE_INTERVAL,
} from "@/lib/constants";
import { useEffect, useState } from "react";

export function useCompletionTimer(
  task: { id: string; deletionTimer?: number; completed: boolean },
  onTimerComplete: (taskId: string) => void,
) {
  const [progress, setProgress] = useState(0); // 0-100

  useEffect(() => {
    if (!task.deletionTimer || !task.completed) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - task.deletionTimer!;
      const newProgress = (elapsed / TASK_TIMER_DURATION) * 100;

      if (newProgress >= 100) {
        clearInterval(interval);
        onTimerComplete(task.id);
      } else {
        setProgress(newProgress);
      }
    }, TASK_TIMER_UPDATE_INTERVAL); // Update animation every 50ms

    return () => clearInterval(interval);
  }, [task.deletionTimer, task.completed, task.id, onTimerComplete]);

  return progress;
}
