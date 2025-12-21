"use client";

import { Button } from "@/components/Button";
import Dialog from "@/components/Dialog";
import { Container, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import {
  IoCheckmarkCircleSharp,
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
          Tasks
          {/* {`Welcome, ${username}`} */}
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

          {/* SETTINGS / TOP BUTTONS */}
          <div className="flex gap-2">
            {/* SHOW / HIDE STATS */}
            <button
              className="rounded-full hover:bg-black/10 p-3 cursor-pointer flex justify-center items-center text-center transition-all duration-200"
              onClick={() => setHideStats(!hideStats)}
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
              }}
            >
              <div className="flex items-center gap-1.5">
                <HiLightningBolt className="text-primary text-[18px]" />
                <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                  Total XP
                </Typography>
              </div>
              <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                {tasks.length}
              </Typography>
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
              }}
            >
              <div className="flex items-center gap-1.5">
                <FaFireFlameCurved className="text-secondary text-[18px]" />
                <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                  Streak
                </Typography>
              </div>
              <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                {streak}
              </Typography>
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
              }}
            >
              <div className="flex items-center gap-1.5">
                <IoCheckmarkCircleSharp className="text-tertiary text-[20px]" />
                <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                  Completed Tasks
                </Typography>
              </div>
              <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
                0
              </Typography>
            </Paper>
          </div>
        )}
        {/* LEVEL PROGRESSION */}
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 4,
            borderRadius: 10,
            textAlign: "start",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            fontWeight: 400,
            fontFamily: "rubik",
          }}
        >
          <p className="">{`Level ${level}`}</p>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: "0%" }}
            ></div>
          </div>
          <p className="">{level + 1}</p>
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
            <div className="flex justify-between w-full text-2xl px-2">
              <h1> All Tasks</h1>
              <span className="text-gray-400">{tasks.length}</span>
            </div>

            <hr className="my-2 text-gray-200" />

            <div className="flex items-center justify-between">
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: "rubik",
                  color: "#4C5564",
                }}
              >
                What would you like to accomplish?
              </Typography>

              <Button
                label="Add Task"
                onClick={() => setIsTaskDialogOpen(true)}
              />
            </div>
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
