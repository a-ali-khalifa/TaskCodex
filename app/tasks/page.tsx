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

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [level, setLevel] = useState<number>();
  const [totalXp, setTotalXp] = useState<number>();
  const [streak, setStreak] = useState(0);

  const [hideStats, setHideStats] = useState<boolean>(false); //toggle stats row

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
              <HiLightningBolt className="text-[#0033FF] text-[18px]" />
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
              {completedTasks.length}
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
          }}
        >
          01
        </Paper>
        {/*  */}
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 10,
            textAlign: "start",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
              background: "#0033FF",
              color: "white",
              fontFamily: "rubik",
              borderRadius: 10,
              p: 1.5,
            }}
          >
            New Task
          </Button>
        </Paper>

        {/* TASKS  */}

        {tasks.length == 0 ? <div>no tasks</div> : <div>tasks</div>}

        <div></div>
      </Container>
    </div>
  );
};

export default page;
