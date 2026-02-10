import { useState, useEffect } from "react";
import { UserProgress } from "@/types/UserProgress";
import { usePersistedState } from "@/lib/hooks/usePersistedStorage";

export function useUserProgress() {
  const [progress, setProgress] = usePersistedState<UserProgress>("progress", {
    level: 1,
    currentXP: 0,
    totalXP: 0,
  });
  const [completedTaskCount, setCompletedTaskCount] = usePersistedState(
    "completed_tasks",
    0,
  );
  const [showLevelUp, setShowLevelUp] = useState(false);

  const calculateXPNeeded = (level: number): number => {
    return Math.floor(100 * Math.pow(level, 1.5));
  };

  const updateProgress = (xpChange: number, isGaining: boolean = true) => {
    //isGaining: true -> xp is being added; false -> xp is subtracted (when task is marked uncompleted)
    setProgress((prev) => {
      let newCurrentXP = isGaining
        ? prev.currentXP + xpChange
        : Math.max(0, prev.currentXP - xpChange);

      const newTotalXP = isGaining
        ? prev.totalXP + xpChange
        : prev.totalXP - xpChange;

      let newLevel = prev.level;

      // Detect level up (can be multiple levels)
      let xpNeeded = calculateXPNeeded(newLevel);

      while (newCurrentXP >= xpNeeded) {
        newCurrentXP -= xpNeeded;
        newLevel++;
        xpNeeded = calculateXPNeeded(newLevel);
      }

      if (newLevel > prev.level) {
        setShowLevelUp(true);
      }

      return {
        level: newLevel,
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
      };
    });
  };

  const xpNeeded = calculateXPNeeded(progress.level);
  const xpProgress = ((progress.currentXP / xpNeeded) * 100).toFixed(0);

  return {
    progress,
    updateProgress,
    showLevelUp,
    setShowLevelUp,
    xpNeeded,
    xpProgress,
    completedTaskCount,
    setCompletedTaskCount,
  };
}
