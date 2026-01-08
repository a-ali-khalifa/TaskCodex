"use client";

import AddTaskDialog from "@/components/AddTaskDialog";
import { Button } from "@/components/Button";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { DIFFICULTIES, Difficulty, STATUSES } from "@/lib/enums";
import { Task } from "@/types/Task";
import { UserProgress } from "@/types/UserProgress";
import { Container, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import {
  IoAdd,
  IoCheckmarkDoneOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

const page = () => {
  // STATE VARIABLES
  //  INFO
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
  });

  //  STATS
  const [streak, setStreak] = useState(0);

  //  OTHERS
  const [hideStats, setHideStats] = useState<boolean>(false); //toggle stats box
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false); //toggle sound (level up, new task, streak)

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState<boolean>(false); //toggle dialog for adding New Task
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState<boolean>(false); //toggle dialog for Editting Task
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] =
    useState<boolean>(false); //toggle dialog for Delete Confirmation

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  //FUNCTIONS
  const updateXp = (taskXP: number, isAdd: boolean = true) => {
    setProgress((prev) => {
      const newCurrentXP = isAdd
        ? prev.currentXP + taskXP
        : taskXP >= prev.currentXP
        ? 0
        : prev.currentXP - taskXP;
      const newTotalXP = isAdd ? prev.totalXP + taskXP : prev.totalXP - taskXP;
      const xpNeeded = getTargetXpByLevel(prev.level);

      // Check if leveled up
      if (newCurrentXP >= xpNeeded) {
        const overflow = newCurrentXP - xpNeeded;
        return {
          level: prev.level + 1,
          currentXP: overflow, // Carry over extra XP
          totalXP: newTotalXP,
        };
      }

      // Normal XP gain
      return {
        ...prev,
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
      };
    });
  };

  const getTargetXpByLevel = (currentLevel: number): number => {
    const target = Math.floor(100 * Math.pow(currentLevel, 1.5));
    return target;
  };

  const handleAddTask = (title: string, difficulty: Difficulty) => {
    const newTask: Task = {
      id: (Math.random() * 10000).toString(),
      title: title,
      category: "",
      description: "",
      difficulty: difficulty,
      xp: DIFFICULTIES[difficulty].xp,
      status: "TODO",
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      dueDate: "",
    };
    setTasks([...tasks, newTask]);
    console.log("Created task: ", newTask);
  };

  const handleCalcXp = (id: string, isAdd: boolean = true) => {
    const taskXp = tasks.find((t) => t.id === id)!.xp;

    // If isAdd is true: add values.
    // If isAdd is false: subtract task xp from current. If task xp is more than current, then current just goes down to 0 (not negative).
    updateXp(taskXp!, isAdd);
  };

  const handleToggleCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.completed ? "TODO" : "COMPLETED",
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (id: string, updatedData: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
  };

  const xpProgress = (
    (progress.currentXP / getTargetXpByLevel(progress.level)) *
    100
  ).toFixed();

  //TODO: remove
  useEffect(() => {
    console.log("tasks:", tasks);
    console.log("current xp:", progress.currentXP);
  }, [tasks]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 600,
            fontFamily: "rubik",
          }}
        >
          {/* Tasks */}
          {`Welcome, Ahmed 👋`}
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

          {/* SETTINGS / CONTROL BUTTONS */}
          <div className="flex gap-2">
            {/* SHOW / HIDE STATS */}
            <button
              className="rounded-full hover:bg-black/10 p-3 cursor-pointer flex justify-center items-center text-center transition-all duration-200"
              onClick={() => setHideStats(!hideStats)}
              title={!hideStats ? "Hide Stats" : "Show Stats"}
            >
              {hideStats ? (
                <IoEyeOffOutline className="text-2xl self-center" />
              ) : (
                <IoEyeOutline className="text-2xl self-center" />
              )}
            </button>
            {/* ENABLE / MUTE SOUND */}
            <button
              className="rounded-full hover:bg-black/10 p-3 cursor-pointer flex justify-center items-center text-center transition-all duration-200"
              onClick={() => setIsSoundMuted(!isSoundMuted)}
              title={!isSoundMuted ? "Mute Sound" : "Enable Sound"}
            >
              {isSoundMuted ? (
                <IoVolumeMute className="text-2xl self-center" />
              ) : (
                <IoVolumeMedium className="text-2xl self-center" />
              )}
            </button>
          </div>
        </div>

        {/* STATS */}
        {!hideStats && (
          <div className="flex mt-2 mb-6 gap-2">
            {/* XP */}
            <Paper
              elevation={3}
              sx={{
                p: 5,
                borderRadius: 4,
                textAlign: "start",
                backdropFilter: "blur(8px)",
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

            {/* STREAK */}
            <Paper
              elevation={3}
              sx={{
                p: 5,
                borderRadius: 4,
                textAlign: "start",
                backdropFilter: "blur(8px)",
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

            {/* COMPLETED TASKS */}
            <Paper
              elevation={3}
              sx={{
                p: 5,
                borderRadius: 4,
                textAlign: "start",
                backdropFilter: "blur(8px)",
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
                  {`${tasks.filter((t) => t.completed).length} Tasks`}
                </Typography>
              </div>
            </Paper>
          </div>
        )}
        {/* LEVEL PROGRESSION */}
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 4,
            borderRadius: 5,
            textAlign: "start",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1.5,
            fontWeight: 400,
            fontFamily: "rubik",
          }}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              {/* Level Icon */}
              <div className="border-2 font-medium border-primary text-primary rounded-full size-12 text-center flex justify-center items-center text-2xl">
                {progress.level}
              </div>
              {/* Current Level + XP to Next Level */}
              <div>
                <p className="font-semibold">{`Level ${progress.level}`}</p>
                <p className="text-gray-600">{`${
                  progress.currentXP
                } / ${getTargetXpByLevel(progress.level)} XP`}</p>
              </div>
            </div>
            {/* Remaining XP to Next Level */}
            <div className="font-medium self-end text-primary">
              {`${
                getTargetXpByLevel(progress.level) - progress.currentXP
              } XP to Level ${progress.level + 1}`}
            </div>
          </div>

          <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </Paper>

        {/* TASKS  */}

        {/* {tasks.length != 0 ? (
          //TODO: Show Icon & Message. Prompt to add tasks.
          <div>no tasks</div>
        ) : ( */}
        <Paper
          elevation={3}
          sx={{
            my: 4,
            p: 3,
            borderRadius: 10,
            textAlign: "start",
            backdropFilter: "blur(8px)",
            // display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "rubik",
          }}
        >
          <div className="flex justify-between w-full p-2 items-center">
            <div>
              <h1 className="text-2xl">All Tasks</h1>
              <p className="text-sm text-gray-600">{`${tasks.length} Total ● ${
                tasks.filter((t) => t.status === "TODO").length
              } ${STATUSES.TODO.label} ● ${
                tasks.filter((t) => t.status === "IN_PROGRESS").length
              } ${STATUSES.IN_PROGRESS.label}`}</p>
            </div>
            <div className="relative">
              <Button
                icon={<IoAdd className="text-2xl" />}
                label="Add Task"
                onClick={() => setOpenAddTaskDialog(true)}
              />
            </div>
          </div>

          <hr className="my-2 text-gray-200" />

          {tasks.length == 0 ? (
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
                  difficulty={task.difficulty}
                  xp={task.xp}
                  status={task.status}
                  completed={task.completed}
                  onToggleCompletion={() => {
                    handleToggleCompletion(task.id);
                    handleCalcXp(task.id, !task.completed);
                  }}
                  onEdit={() => {
                    setSelectedTaskId(task.id);
                    setOpenEditTaskDialog(true);
                  }}
                  onDelete={() => {
                    setSelectedTaskId(task.id);
                    setOpenDeleteTaskDialog(true);
                  }}
                />
              ))}
            </div>
          )}
        </Paper>
        {/* )} */}

        {/* EDIT TASK */}
        <EditTaskDialog
          isOpen={openEditTaskDialog}
          onClose={() => {
            setOpenEditTaskDialog(false);
          }}
          taskId={selectedTaskId}
          tasks={tasks}
          onEdit={handleUpdateTask}
        />

        {/* DELETE TASK */}
        <DeleteTaskDialog
          isOpen={openDeleteTaskDialog}
          onClose={() => {
            setOpenDeleteTaskDialog(false);
          }}
          onDelete={() => {
            handleDelete(selectedTaskId!);
            setSelectedTaskId(null);
            setOpenDeleteTaskDialog(false);
          }}
        />

        {/* NEW TASK */}
        {/* V1 */}
        <AddTaskDialog
          tasks={tasks}
          setTasks={setTasks}
          isOpen={openAddTaskDialog}
          onClose={() => {
            setOpenAddTaskDialog(false);
          }}
        />
        {/* V2 */}
        {/* <AddTask
          isOpen={openAddTaskDialog}
          onClose={() => {
            setOpenAddTaskDialog(false);
          }}
          onCreateTask={handleCreateTask}
        /> */}
      </Container>
    </div>
  );
};

export default page;
