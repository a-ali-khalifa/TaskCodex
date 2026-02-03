"use client";

import AddTaskDialog from "@/components/AddTaskDialog";
import { Button } from "@/components/Button";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import FilterDialog, { TaskFilters } from "@/components/FilterDialog";
import LevelUpModal from "@/components/LevelUpModal";
import { TaskCard } from "@/components/TaskCard";
import WelcomeModal from "@/components/WelcomeModal";
import { DIFFICULTIES, Difficulty, SOUND_PATHS, STATUSES } from "@/lib/enums";
import { useSound } from "@/lib/useSound";
import { Task } from "@/types/Task";
import { UserProgress } from "@/types/UserProgress";
import { Container, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import {
  IoAdd,
  IoCheckmarkDoneOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

export default function DashboardPage() {
  const savedName = localStorage.getItem("username")!;

  // ========================================
  // STATE - User & Tasks
  // ========================================
  const [username, setUsername] = useState<string>(savedName || "");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilters, setActiveFilters] = useState<TaskFilters>({
    status: [],
    difficulty: [],
    category: [],
  });
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
  });
  const [streak, setStreak] = useState(0);
  const [recentlyCompleted, setRecentlyCompleted] = useState<Task[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(1);

  // ========================================
  // STATE - UI Controls
  // ========================================
  const [showRecentlyCompleted, setShowRecentlyCompleted] = useState(false);
  const [isStatsHidden, setIsStatsHidden] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // ========================================
  // COMPUTED VALUES
  // ========================================
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // By status
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter((task) =>
        activeFilters.status.includes(task.status),
      );
    }

    // By difficulty
    if (activeFilters.difficulty.length > 0) {
      filtered = filtered.filter((task) =>
        activeFilters.difficulty.includes(task.difficulty),
      );
    }

    // By category
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(
        (task) =>
          task.category && activeFilters.category.includes(task.category),
      );
    }

    return filtered;
  }, [tasks, activeFilters]);

  const activeFilterCount =
    activeFilters.status.length +
    activeFilters.difficulty.length +
    activeFilters.category.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const todoTasksCount = filteredTasks.filter(
    (t) => t.status === "TODO",
  ).length;
  const inProgressTasksCount = filteredTasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const xpNeededForNextLevel = calculateXPNeeded(progress.level);
  const xpProgressPercentage = (
    (progress.currentXP / xpNeededForNextLevel) *
    100
  ).toFixed(0);
  const isFiltered = activeFilterCount > 0;

  // Sounds
  const playCompleteTask = useSound(SOUND_PATHS.TASK_COMPLETE, 0.05);
  const playAddedTask = useSound(SOUND_PATHS.TASK_ADDED, 0.15);

  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  function calculateXPNeeded(level: number): number {
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  function updateProgress(xpChange: number, isGaining: boolean = true) {
    setProgress((prev) => {
      const newCurrentXP = isGaining
        ? prev.currentXP + xpChange
        : Math.max(0, prev.currentXP - xpChange);

      const newTotalXP = isGaining
        ? prev.totalXP + xpChange
        : prev.totalXP - xpChange;

      const xpNeeded = calculateXPNeeded(prev.level);

      // Check for level up
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
  }

  // ========================================
  // TASK HANDLERS
  // ========================================
  const handleApplyFilters = (filters: TaskFilters) => {
    setActiveFilters(filters);
  };

  function handleAddTask(title: string, difficulty: Difficulty) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category: "",
      description: "",
      difficulty,
      xp: DIFFICULTIES[difficulty].xp,
      status: "TODO",
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      dueDate: "",
    };

    setTasks((prev) => [...prev, newTask]);
    console.log("Task created:", newTask);
  }

  function handleToggleCompletion(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const isCompleting = !task.completed;

    // Update task completion status
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: isCompleting ? "COMPLETED" : "TODO",
              completed: isCompleting,
              completedAt: isCompleting ? new Date().toISOString() : null,
              deletionTimer: isCompleting ? Date.now() : undefined, // Start timer; After timer finishes, move to Recently Completed.
            }
          : t,
      ),
    );

    // Sound effect
    isCompleting && !isSoundMuted && playCompleteTask();

    // Update XP
    updateProgress(task.xp!, isCompleting);
  }

  function handleTimerComplete(taskId: string) {
    const completedTask = tasks.find((t) => t.id === taskId);

    if (completedTask) {
      // Add to recently completed (keep only last 5)
      setRecentlyCompleted((prev) => {
        const updated = [completedTask, ...prev];
        return updated.slice(0, 5); // Keep only 5 most recent
      });

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  }

  const handleUndoCompletion = (taskId: string) => {
    const task = recentlyCompleted.find((t) => t.id === taskId);

    if (task) {
      // Move back to tasks
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          completed: false,
          status: "TODO",
          completedAt: null,
          deletionTimer: undefined,
        },
      ]);

      // Remove from recently completed
      setRecentlyCompleted((prev) => prev.filter((t) => t.id !== taskId));

      // Remove XP
      updateProgress(task.xp!, false);
    }
  };

  function handleToggleStatus(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    //Disable toggle if task's completed
    const statusChanged: boolean = !(task.status === "COMPLETED");

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: statusChanged
                ? t.status === "TODO"
                  ? "IN_PROGRESS"
                  : "TODO"
                : t.status,
            }
          : t,
      ),
    );

    statusChanged && !isSoundMuted && playAddedTask();
  }

  function handleUpdateTask(taskId: string, updatedData: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      ),
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  // ========================================
  // UI EVENT HANDLERS
  // ========================================
  function handleEditClick(taskId: string) {
    setSelectedTaskId(taskId);
    setIsEditDialogOpen(true);
  }

  function handleDeleteClick(taskId: string) {
    setSelectedTaskId(taskId);
    setIsDeleteDialogOpen(true);
  }

  function handleDeleteConfirm() {
    if (selectedTaskId) {
      handleDeleteTask(selectedTaskId);
      setSelectedTaskId(null);
      setIsDeleteDialogOpen(false);
    }
  }
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

  useEffect(() => {
    // Code here runs only in the browser
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem(username);
      if (storedName) {
        setUsername(storedName);
      }
    }
  }, []);

  // DEBUG (Todo: Remove in production)
  useEffect(() => {
    console.log("Tasks:", tasks);
  }, [tasks]);

  // ========================================
  // RENDER
  // ========================================
  return (
    <div>
      {!username ? (
        <WelcomeModal
          onComplete={() => {
            setUsername(localStorage.getItem("username")!);
          }}
          isOpen={!username}
        />
      ) : (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* ===== HEADER ===== */}
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 600,
              fontFamily: "rubik",
            }}
          >
            {`Welcome, ${username} 👋`}
          </Typography>

          <div className="flex justify-between items-center">
            <Typography
              sx={{
                fontSize: 24,
                mb: 2,
                fontFamily: "rubik",
                color: "#4C5564",
              }}
            >
              Complete tasks to level up!
            </Typography>

            {/* ===== CONTROL BUTTONS ===== */}
            <div className="flex gap-2">
              {/* Toggle Stats Visibility */}
              <button
                className="rounded-full hover:bg-black/10 p-3 cursor-pointer flex justify-center items-center text-center transition-all duration-200"
                onClick={() => setIsStatsHidden(!isStatsHidden)}
                title={isStatsHidden ? "Show Stats" : "Hide Stats"}
                aria-label={isStatsHidden ? "Show Stats" : "Hide Stats"}
              >
                {isStatsHidden ? (
                  <IoEyeOffOutline className="text-2xl" />
                ) : (
                  <IoEyeOutline className="text-2xl" />
                )}
              </button>

              {/* Toggle Sound */}
              <button
                className="rounded-full hover:bg-black/10 p-3 cursor-pointer flex justify-center items-center text-center transition-all duration-200"
                onClick={() => setIsSoundMuted(!isSoundMuted)}
                title={isSoundMuted ? "Enable Sound" : "Mute Sound"}
                aria-label={isSoundMuted ? "Enable Sound" : "Mute Sound"}
              >
                {isSoundMuted ? (
                  <IoVolumeMute className="text-2xl" />
                ) : (
                  <IoVolumeMedium className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* ===== STATS CARDS ===== */}
          {!isStatsHidden && (
            <div className="flex mt-2 mb-6 gap-2">
              {/* Total XP */}
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div className="flex-1 size-full flex justify-center items-center bg-blue-100 rounded-lg">
                  <HiLightningBolt className="text-primary text-[28px]" />
                </div>
                <div className="flex flex-2 flex-col">
                  <Typography sx={{ fontFamily: "rubik", fontSize: 14 }}>
                    Total XP
                  </Typography>
                  <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                    {progress.totalXP}
                  </Typography>
                </div>
              </Paper>

              {/* Streak */}
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div className="flex-1 size-full flex items-center justify-center bg-orange-100 rounded-lg">
                  <FaFireFlameCurved className="text-secondary text-[28px]" />
                </div>
                <div className="flex flex-2 flex-col">
                  <Typography sx={{ fontFamily: "rubik", fontSize: 14 }}>
                    Streak
                  </Typography>
                  <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                    {streak}
                  </Typography>
                </div>
              </Paper>

              {/* Completed Tasks */}
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div className="flex-1 flex items-center justify-center size-full bg-green-100 rounded-lg">
                  <IoCheckmarkDoneOutline className="text-tertiary text-[24px]" />
                </div>
                <div className="flex flex-2 flex-col">
                  <Typography sx={{ fontFamily: "rubik", fontSize: 14 }}>
                    Completed
                  </Typography>
                  <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                    {`${completedTasksCount} Task(s)`}
                  </Typography>
                </div>
              </Paper>
            </div>
          )}

          {/* ===== LEVEL PROGRESSION BAR ===== */}
          <Paper
            elevation={3}
            sx={{
              mt: 2,
              p: 4,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              fontFamily: "rubik",
            }}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                {/* Level Badge */}
                <div className="border-2 font-medium border-primary text-primary rounded-full size-12 flex justify-center items-center text-2xl">
                  {progress.level}
                </div>

                {/* Level Info */}
                <div>
                  <p className="font-semibold">{`Level ${progress.level}`}</p>
                  <p className="text-gray-600">
                    {`${progress.currentXP} / ${xpNeededForNextLevel} XP`}
                  </p>
                </div>
              </div>

              {/* XP Remaining */}
              <div className="font-medium self-end text-primary">
                {`${xpNeededForNextLevel - progress.currentXP} XP to Level ${
                  progress.level + 1
                }`}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${xpProgressPercentage}%` }}
              />
            </div>
          </Paper>

          {/* ===== TASKS SECTION ===== */}
          <Paper
            elevation={3}
            sx={{
              my: 4,
              p: 3,
              borderRadius: 10,
              fontFamily: "rubik",
            }}
          >
            {/* Header */}
            <div className="flex justify-between w-full p-2 items-center">
              <div>
                <h1 className="text-2xl">{`${showRecentlyCompleted ? "Completed" : isFiltered ? `Filtered` : `All`} Tasks`}</h1>

                <span className="text-sm text-gray-600">
                  {`${showRecentlyCompleted && recentlyCompleted.length > 0 ? `${recentlyCompleted.length}` : isFiltered ? `${filteredTasks.length} of ${tasks.length}` : tasks.length} Total // ${todoTasksCount} ${STATUSES.TODO.label} // ${inProgressTasksCount} ${STATUSES.IN_PROGRESS.label}`}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  icon={
                    <IoCheckmarkDoneOutline className="text-2xl text-primary" />
                  }
                  label="Recently Completed"
                  onClick={() =>
                    setShowRecentlyCompleted(!showRecentlyCompleted)
                  }
                />
                {/* Filter Button */}
                <Button
                  variant="ghost"
                  icon={<IoFilterOutline className="text-2xl text-primary" />}
                  label="Filter"
                  onClick={() => setIsFilterDialogOpen(true)}
                />
                {/* Add Task Button */}
                <Button
                  icon={<IoAdd className="text-2xl" />}
                  label="Add Task"
                  onClick={() => setIsAddDialogOpen(true)}
                />
              </div>
            </div>

            <hr className="my-2 text-gray-200" />

            {/* Task List or Empty State */}
            <div className="flex flex-col gap-3">
              {showRecentlyCompleted ? (
                recentlyCompleted.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleCompletion={() => handleUndoCompletion(task.id)}
                    onEdit={() => handleEditClick(task.id)}
                  />
                ))
              ) : tasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleCompletion={() => handleToggleCompletion(task.id)}
                    onToggleStatus={() => handleToggleStatus(task.id)}
                    onTimerComplete={handleTimerComplete}
                    onEdit={() => handleEditClick(task.id)}
                    onDelete={() => handleDeleteClick(task.id)}
                  />
                ))
              ) : (
                <div
                  className="border-2 rounded-lg border-dashed border-gray-300 p-4 flex items-center cursor-pointer hover:bg-black/5 transition-colors duration-200"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Typography
                    sx={{
                      pt: 1,
                      fontSize: 16,
                      fontFamily: "rubik",
                      color: "#4C5564",
                    }}
                  >
                    What would you like to accomplish?
                  </Typography>
                </div>
              )}
            </div>
          </Paper>

          <LevelUpModal
            isOpen={showLevelUp}
            onClose={() => setShowLevelUp(false)}
            level={progress.level}
          />

          {/* ===== DIALOGS ===== */}

          {/* Add Task Dialog */}
          <AddTaskDialog
            tasks={tasks}
            setTasks={setTasks}
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
          />

          {/* Edit Task Dialog */}
          <EditTaskDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            taskId={selectedTaskId}
            tasks={tasks}
            onEdit={handleUpdateTask}
          />

          {/* Delete Task Dialog */}
          <DeleteTaskDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={handleDeleteConfirm}
          />

          <FilterDialog
            isOpen={isFilterDialogOpen}
            onClose={() => setIsFilterDialogOpen(false)}
            onApply={handleApplyFilters}
            currentFilters={activeFilters}
          />
        </Container>
      )}
    </div>
  );
}
