"use client";

import { Button } from "@/components/Button";
import Dialog from "@/components/Dialog";
import { Container, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import {
  IoAdd,
  IoCheckmarkCircleSharp,
  IoCheckmarkDoneOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState([]);
  const [level, setLevel] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>();
  const [streak, setStreak] = useState(0);

  const [hideStats, setHideStats] = useState<boolean>(false); //toggle stats box
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false); //toggle sound (level up, new task, streak)

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState<boolean>(false); //toggle dialog for add New Task

  const taskTitlePlaceholders = [
    "Go for a Jog 👟",
    "Meditate for 30 mins 🧘‍♂️",
    "Drink some water 🫗",
  ];

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
            {/* ENABLE / MUTE SOUND         */}
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
                  {tasks.length}
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
        {tasks.length != 0 ? (
          //TODO: Show Icon & Message. Prompt to add tasks.
          <div>no tasks</div>
        ) : (
          <Paper
            elevation={3}
            sx={{
              mt: 4,
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
                <h1 className="text-2xl"> All Tasks</h1>
                <p className="text-sm text-gray-600">{`0 Total ● 0 Completed`}</p>
              </div>
              <Button
                icon={<IoAdd className="text-2xl" />}
                label="Add Task"
                onClick={() => setIsTaskDialogOpen(true)}
              />
            </div>

            <hr className="my-2 text-gray-200" />

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
          </Paper>
        )}
        <Dialog
          isOpen={isTaskDialogOpen}
          onClose={() => {
            setIsTaskDialogOpen(false);
          }}
          title="New Task"
        >
          <div className="flex flex-col gap-2">
            {/* title: string;
  description: string;
  category: TaskCategory | string;
  difficulty: TaskDifficulty;
  xp: number;
  status: TaskStatus;
  createdAt: string;
  dueDate?: string;
  completed: boolean;
  completedAt: string | null; */}
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required={true}
              placeholder={
                taskTitlePlaceholders[
                  Math.floor(Math.random() * taskTitlePlaceholders.length)
                ]
              } // Get a random task title as a placeholder
            />

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <p>Category</p>
            <p>difficulty</p>
            <p>status</p>
            <p>dueDate</p>
            <p>status?</p>
            <Button label="Create" onClick={() => {}} />
          </div>
        </Dialog>
      </Container>
    </div>
  );
};

export default page;
