"use client";

import AddTaskDialog from "@/components/AddTaskDialog";
import { Button } from "@/components/Button";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import LevelUpModal from "@/components/LevelUpModal";
import { TaskCard } from "@/components/TaskCard";
import WelcomeModal from "@/components/WelcomeModal";
import { DIFFICULTIES, Difficulty, SOUND_PATHS, STATUSES } from "@/lib/enums";
import { useSound } from "@/lib/useSound";
import { Task } from "@/types/Task";
import { UserProgress } from "@/types/UserProgress";
import { Container, Paper, Typography } from "@mui/material";
import React from "react";
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
  // ========================================
  // STATE - User & Tasks
  // ========================================
  const [username, setUsername] = useState<string>(savedName || "");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
  });
  const [streak, setStreak] = useState(0);
  const [recentlyCompleted, setRecentlyCompleted] = useState<Task[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(1);
  const isFirstVisit = localStorage.getItem("isFirstVisit");
  const [showOnboarding, setShowOnboarding] = React.useState(!isFirstVisit);

  // ========================================
  // STATE - UI Controls
  // ========================================
  const [isStatsHidden, setIsStatsHidden] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // ========================================
  // COMPUTED VALUES
  // ========================================
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const todoTasksCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressTasksCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const xpNeededForNextLevel = calculateXPNeeded(progress.level);
  const xpProgressPercentage = (
    (progress.currentXP / xpNeededForNextLevel) *
    100
  ).toFixed(0);

  // Sounds
  const playCompleteTask = useSound(SOUND_PATHS.TASK_COMPLETE, 0.05);

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
            }
          : t,
      ),
    );

    // Sound effect
    isCompleting && playCompleteTask();

    // Update XP
    updateProgress(task.xp!, isCompleting);
  }

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

    statusChanged && playAddedTask();
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

  function moveToRecentlyCompleted(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setRecentlyCompleted((prev) => [task, ...prev].slice(0, 5)); // Keep only last 5
    }
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
        {isFirstVisit && (
          <WelcomeModal username={username} onComplete={() => {}} />
        )}
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
              <h1 className="text-2xl">All Tasks</h1>

              <span className="text-sm text-gray-600">
                {`${tasks.length} Total // ${todoTasksCount} ${STATUSES.TODO.label} // ${inProgressTasksCount} ${STATUSES.IN_PROGRESS.label}`}
              </span>

              {/* <button className="p-1.5 text-sm rounded-2xl hover:bg-gray-200">
                  Recently completed
                </button> */}
            </div>

            <div className="flex gap-3">
              {/* Filter Button */}
              <Button
                variant="ghost"
                icon={<IoFilterOutline className="text-2xl text-primary" />}
                label="Filter"
                onClick={() => {}}
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
          {tasks.length === 0 ? (
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
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  category={task.category}
                  difficulty={task.difficulty}
                  xp={task.xp}
                  status={task.status}
                  completed={task.completed}
                  onToggleCompletion={() => handleToggleCompletion(task.id)}
                    onToggleStatus={() => handleToggleStatus(task.id)}
                  onEdit={() => handleEditClick(task.id)}
                  onDelete={() => handleDeleteClick(task.id)}
                />
              ))}
            </div>
          )}
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
      </Container>
    </div>
  );
}
