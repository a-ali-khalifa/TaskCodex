import { useState, useEffect } from "react";
import { UserProgress } from "@/types/UserProgress";

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
  });
  const [previousLevel, setPreviousLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const calculateXPNeeded = (level: number): number => {
    return Math.floor(100 * Math.pow(level, 1.5));
  };

  const updateProgress = (xpChange: number, isGaining: boolean = true) => {
    setProgress((prev) => {
      const newCurrentXP = isGaining
        ? prev.currentXP + xpChange
        : Math.max(0, prev.currentXP - xpChange);

      const newTotalXP = isGaining
        ? prev.totalXP + xpChange
        : prev.totalXP - xpChange;

      const xpNeeded = calculateXPNeeded(prev.level);

      if (newCurrentXP >= xpNeeded) {
        const overflow = newCurrentXP - xpNeeded;
        return {
          level: prev.level + 1,
          currentXP: overflow,
          totalXP: newTotalXP,
        };
      }

      return {
        ...prev,
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
      };
    });
  };

  // Detect multiple level-ups (i.e., level 1 -> 3)
  useEffect(() => {
    if (progress.currentXP > calculateXPNeeded(progress.level)) {
      setProgress({
        level: progress.level + 1,
        currentXP: progress.currentXP - calculateXPNeeded(progress.level),
        totalXP: progress.totalXP,
      });
    }
  }, [progress.currentXP]);

  // Detect level up for animation
  useEffect(() => {
    if (progress.level > previousLevel) {
      setShowLevelUp(true);
      setPreviousLevel(progress.level);
    }
  }, [progress.level, previousLevel]);

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
