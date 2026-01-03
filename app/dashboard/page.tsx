"use client";

import AddTaskDialog from "@/components/AddTaskDialog";
import { Button } from "@/components/Button";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { STATUSES } from "@/lib/enums";
import { Task } from "@/types/Task";
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
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [streak, setStreak] = useState(0);

  const [hideStats, setHideStats] = useState<boolean>(false); //toggle stats box
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false); //toggle sound (level up, new task, streak)

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState<boolean>(false); //toggle dialog for adding New Task
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState<boolean>(false); //toggle dialog for Editting Task
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] =
    useState<boolean>(false); //toggle dialog for Delete Confirmation

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (id: string, updatedData: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
  };

  //TODO: remove
  useEffect(() => {
    console.log("tasks:", tasks);
  }, [tasks]);

  return (
    <div>
      <Container maxWidth="md" sx={{ py: 8 }}>
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
                  {totalXp}
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
                  0 Tasks
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
              <div className="border-2 font-medium border-primary text-primary rounded-lg size-12 text-center flex justify-center items-center text-2xl">
                0
              </div>
              {/* Current Level + XP to Next Level */}
              <div>
                <p className="font-semibold">{`Level ${level}`}</p>
                <p className="text-gray-600">0 / 100 XP</p>
              </div>
            </div>
            {/* Remaining XP to Next Level */}
            <div className="font-medium self-end text-primary">
              100 XP to Level 1
            </div>
          </div>

          <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: "20%" }}
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
                tasks.filter((t) => t.status === STATUSES.TODO).length
              } ${STATUSES.TODO} ● ${
                tasks.filter((t) => t.status === STATUSES.IN_PROGRESS).length
              } ${STATUSES.IN_PROGRESS}`}</p>
            </div>
            <Button
              icon={<IoAdd className="text-2xl" />}
              label="Add Task"
              onClick={() => setOpenAddTaskDialog(true)}
            />
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
        <AddTaskDialog
          tasks={tasks}
          setTasks={setTasks}
          isOpen={openAddTaskDialog}
          onClose={() => {
            setOpenAddTaskDialog(false);
          }}
        />

        {/* TODO: In the future, replace above dialog with an inline */}
        {/* {isTaskDialogOpen && <TaskBox />} */}
      </Container>
    </div>
  );
};

export default page;
