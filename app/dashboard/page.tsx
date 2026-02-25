"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  IoAdd,
  IoCheckmarkDoneOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";

import { Button } from "@/components/Button";
import { TaskCard } from "@/components/TaskCard";
import AddTaskDialog from "@/components/dialogs/AddTaskDialog";
import EditTaskDialog from "@/components/dialogs/EditTaskDialog";
import DeleteTaskDialog from "@/components/dialogs/DeleteTaskDialog";
import FilterDialog from "@/components/dialogs/FilterDialog";
import LevelUpModal from "@/components/LevelUpModal";
import WelcomeModal from "@/components/WelcomeModal";
import { STATUSES } from "@/lib/enums";

import { useTaskActions } from "@/lib/hooks/useTaskActions";
import { useTaskManager } from "@/lib/hooks/useTaskManager";
import { useTaskStats } from "@/lib/hooks/useTaskStats";
import { useUserProgress } from "@/lib/hooks/useUserProgress";
import EmptyMessage from "@/components/EmptyMessage";
import { usePersistedState } from "@/lib/hooks/usePersistedStorage";

export default function DashboardPage() {
  // User state
  const [username, setUsername] = usePersistedState<string>("username", "");
  const [streak, setStreak] = useState(0);

  // UI state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showRecentlyCompleted, setShowRecentlyCompleted] = useState(false);
  const [isStatsHidden, setIsStatsHidden] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Custom hooks
  const {
    tasks,
    setTasks,
    recentlyCompleted,
    filteredTasks,
    activeFilters,
    setActiveFilters,
    addTask,
    updateTask,
    deleteTask,
    moveToRecentlyCompleted,
    undoCompletion,
  } = useTaskManager();

  const {
    progress,
    updateProgress,
    showLevelUp,
    setShowLevelUp,
    xpNeeded,
    xpProgress,
    completedTaskCount,
    setCompletedTaskCount,
  } = useUserProgress();

  const stats = useTaskStats(tasks, filteredTasks);

  const { toggleCompletion, toggleStatus } = useTaskActions(
    tasks,
    setTasks,
    updateProgress,
    isSoundMuted,
  );

  // Derived values
  const activeFilterCount =
    activeFilters.status.length +
    activeFilters.difficulty.length +
    activeFilters.category.length;

  const isFiltered = activeFilterCount > 0;

  // Handlers
  const handleUndoCompletion = (taskId: string) => {
    const task = undoCompletion(taskId);
    if (task) {
      updateProgress(task.xp!, false);
      setCompletedTaskCount((prev) => Math.max(0, prev - 1)); // doesn't go negative
    }
  };

  const handleTimerComplete = (taskId: string) => {
    moveToRecentlyCompleted(taskId);
    setCompletedTaskCount((prev) => prev + 1);
  };

  const handleDeleteConfirm = () => {
    if (selectedTaskId) {
      deleteTask(selectedTaskId);
      setSelectedTaskId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const renderTaskSubheading = () => {
    if (showRecentlyCompleted)
      return `${recentlyCompleted.length} of (up to) 5 Completed Tasks`;
    else
      return `${isFiltered ? `${filteredTasks.length} of ${tasks.length}` : tasks.length} Total // ${stats.todoCount} ${STATUSES.TODO.label} // ${stats.inProgressCount} ${STATUSES.IN_PROGRESS.label}`;
  };

  const renderTasks = () => {
    if (showRecentlyCompleted) {
      if (recentlyCompleted.length === 0) return <EmptyMessage />;

      return recentlyCompleted.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleCompletion={() => handleUndoCompletion(task.id)}
          onEdit={() => {
            setSelectedTaskId(task.id);
            setIsEditDialogOpen(true);
          }}
          isMobileView={isMobile}
        />
      ));
    }

    if (filteredTasks.length === 0) return <EmptyMessage />;

    return filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onToggleCompletion={() => toggleCompletion(task.id)}
        onToggleStatus={() => toggleStatus(task.id)}
        onTimerComplete={handleTimerComplete}
        onEdit={() => {
          setSelectedTaskId(task.id);
          setIsEditDialogOpen(true);
        }}
        onDelete={() => {
          setSelectedTaskId(task.id);
          setIsDeleteDialogOpen(true);
        }}
        isMobileView={isMobile}
      />
    ));
  };

  return (
    <div>
      {!username ? (
        <WelcomeModal
          onComplete={() => setUsername(localStorage.getItem("username")!)}
          isOpen={!username}
        />
      ) : (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          {/* Header */}
          <Typography
            sx={{
              fontSize: { xs: 28, sm: 32 },
              fontWeight: 600,
              fontFamily: "rubik",
            }}
          >
            {`Welcome, ${username} 👋`}
          </Typography>

          <div className="flex justify-between items-center">
            <Typography
              sx={{
                fontSize: { xs: 18, sm: 24 },
                mb: 2,
                fontFamily: "rubik",
                color: "#4C5564",
              }}
            >
              Complete tasks to level up!
            </Typography>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                className="rounded-full hover:bg-black/10 p-3 cursor-pointer transition-all"
                onClick={() => setIsStatsHidden(!isStatsHidden)}
                title={isStatsHidden ? "Show Stats" : "Hide Stats"}
              >
                {isStatsHidden ? (
                  <IoEyeOffOutline className="text-2xl" />
                ) : (
                  <IoEyeOutline className="text-2xl" />
                )}
              </button>

              <button
                className="rounded-full hover:bg-black/10 p-3 cursor-pointer transition-all"
                onClick={() => setIsSoundMuted(!isSoundMuted)}
                title={isSoundMuted ? "Enable Sound" : "Mute Sound"}
              >
                {isSoundMuted ? (
                  <IoVolumeMute className="text-2xl" />
                ) : (
                  <IoVolumeMedium className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          {!isStatsHidden && (
            <div className="flex flex-col md:flex-row mt-2 mb-6 gap-2">
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
                  <Typography
                    sx={{
                      fontFamily: "rubik",
                      fontSize: { xs: 16, md: 18 },
                      mt: 1,
                    }}
                  >
                    {progress.totalXP}
                  </Typography>
                </div>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  opacity: 0.5,
                  background: "white",
                }}
                title="Coming Soon!"
              >
                <div className="flex-1 size-full flex items-center justify-center bg-orange-100 rounded-lg">
                  <FaFireFlameCurved className="text-secondary text-[28px]" />
                </div>
                <div className="flex flex-2 flex-col">
                  <Typography sx={{ fontFamily: "rubik", fontSize: 14 }}>
                    Streak
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "rubik",
                      fontSize: { xs: 16, md: 18 },
                      mt: 1,
                    }}
                  >
                    {streak}
                  </Typography>
                </div>
              </Paper>

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
                  <Typography
                    sx={{
                      fontFamily: "rubik",
                      fontSize: { xs: 16, md: 18 },
                      mt: 1,
                    }}
                  >{`${completedTaskCount} Task(s)`}</Typography>
                </div>
              </Paper>
            </div>
          )}

          {/* Level Progress */}
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
                <div className="border-2 font-medium border-primary text-primary rounded-full size-12 flex justify-center items-center text-xl md:text-2xl">
                  {progress.level}
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold">{`Level ${progress.level}`}</p>
                  <p className="text-sm md:text-base text-gray-600">{`${progress.currentXP} / ${xpNeeded} XP`}</p>
                </div>
              </div>
              <div className="text-sm md:text-base font-medium text-primary">{`${xpNeeded - progress.currentXP} XP to Level ${progress.level + 1}`}</div>
            </div>
            <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </Paper>

          {/* Tasks */}
          <Paper
            elevation={3}
            sx={{
              my: 4,
              p: { xs: 2, md: 3 },
              borderRadius: 10,
              fontFamily: "rubik",
            }}
          >
            <div className="flex justify-between w-full p-2 items-center">
              <div>
                {/* Heading */}
                <h1 className="text-xl md:text-2xl">{`${showRecentlyCompleted ? "Recently Completed" : `${isFiltered ? "Filtered" : "All"} Tasks`}`}</h1>
                {/* Subheading */}
                <span className="text-xs md:text-sm text-gray-600">
                  {renderTaskSubheading()}
                </span>
              </div>

              <div className="flex flex-col-reverse md:flex-row gap-3">
                <Button
                  size={isMobile ? "sm" : "md"}
                  variant={showRecentlyCompleted ? "solid" : "ghost"}
                  icon={
                    <IoCheckmarkDoneOutline className="text-xl md:text-2xl" />
                  }
                  label="Recently Completed"
                  onClick={() =>
                    setShowRecentlyCompleted(!showRecentlyCompleted)
                  }
                />
                <Button
                  size={isMobile ? "sm" : "md"}
                  variant={
                    isFiltered && !showRecentlyCompleted ? "solid" : "ghost"
                  }
                  icon={<IoFilterOutline className="text-xl md:text-2xl " />}
                  label="Filter"
                  onClick={() => setIsFilterDialogOpen(true)}
                />
                <Button
                  size={isMobile ? "sm" : "md"}
                  icon={<IoAdd className="text-xl md:text-2xl" />}
                  label="Add Task"
                  onClick={() => setIsAddDialogOpen(true)}
                />
              </div>
            </div>

            <hr className="my-2 text-gray-200" />

            <div className="flex flex-col gap-1.5 md:gap-3">
              {renderTasks()}
            </div>
          </Paper>

          {/* <LevelBar
            level={progress.level}
            currentXP={progress.currentXP}
            xpNeeded={xpNeeded}
            xpProgress={xpProgress}
          /> */}

          {/* Dialogs */}
          <LevelUpModal
            isOpen={showLevelUp}
            onClose={() => setShowLevelUp(false)}
            level={progress.level}
            isMuted={isSoundMuted}
          />

          <AddTaskDialog
            tasks={tasks}
            setTasks={setTasks}
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            isMuted={isSoundMuted}
          />
          <EditTaskDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            taskId={selectedTaskId}
            tasks={tasks}
            onEdit={updateTask}
          />
          <DeleteTaskDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={handleDeleteConfirm}
          />

          <FilterDialog
            isOpen={isFilterDialogOpen}
            onClose={() => setIsFilterDialogOpen(false)}
            onApply={setActiveFilters}
            currentFilters={activeFilters}
          />
        </Container>
      )}
    </div>
  );
}
