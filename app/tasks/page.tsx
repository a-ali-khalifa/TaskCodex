"use client";

import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
// import { Button } from "@/components/Button";

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState([]);
  const [level, setLevel] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>();
  const [streak, setStreak] = useState(0);

  const [hideStats, setHideStats] = useState<boolean>(false); //toggle stats box

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
        </Typography>
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

        {/* STATS */}

        <div className="flex gap-2">
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
              <HiLightningBolt className="text-[#3F65FF] text-[18px]" />
              <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                Total XP
              </Typography>
            </div>
            <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
              {tasks.length}
            </Typography>
          </Paper>

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
              <FaFireFlameCurved className="text-orange-600 text-[18px]" />
              <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                Streak
              </Typography>
            </div>
            <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
              {streak}
            </Typography>
          </Paper>

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
              <IoCheckmarkCircleSharp className="text-[#03ac22] text-[20px]" />
              <Typography sx={{ fontFamily: "rubik", fontSize: 18 }}>
                Completed Tasks
              </Typography>
            </div>
            <Typography sx={{ fontFamily: "rubik", fontSize: 18, mt: 1 }}>
              0
            </Typography>
          </Paper>
        </div>
        {/* LEVEL PROGRESSION */}
        <Paper
          elevation={3}
          sx={{
            mt: 4,
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
          <p className="">{level}</p>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3F65FF] transition-all duration-300"
              style={{ width: "50%" }}
            ></div>
          </div>
          <p className="">{level + 1}</p>
        </Paper>
        {/*  */}

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
            <div className="flex justify-between w-full text-2xl">
              <h1> All Tasks</h1>
              <span className="text-gray-500">{tasks.length}</span>
            </div>

            <div className="flex items-center justify-between border-t border-t-gray-400 ">
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
                sx={{
                  background: "#3F65FF",
                  color: "white",
                  fontFamily: "rubik",
                  borderRadius: 10,
                  p: 1.5,
                }}
              >
                New Task
              </Button>
              {/* <Button label="Add Task"/> */}
            </div>
            <div></div>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default page;
