"use client";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoCheckmarkDoneOutline, IoChevronForward } from "react-icons/io5";

type SidebarProps = {
  //Stats
  totalXP: number;
  completedTaskCount: number;
  streak: number;
};

export default function Sidebar({
  totalXP,
  completedTaskCount,
  streak,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        className="rounded-full hover:bg-black/10 p-3 cursor-pointer transition-all"
        onClick={() => setIsOpen(true)}
        title={"Show Stats"}
      >
        <HiOutlineBars3BottomRight className="text-2xl" />
      </button>

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)] overflow-y-auto w-full bg-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 p-2 text-gray-600 hover:text-primary transition-colors"
          aria-label="Close sidebar"
        >
          <IoChevronForward className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="pt-16 px-6">
          {/* <h2 className="text-2xl font-semibold mb-4">Level</h2> */}
          {/* TODO: Move Level Bar here */}

          <h2 className="text-2xl font-semibold mb-4">Stats</h2>

          <div className="flex flex-col mt-2 mb-6 gap-2">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "var(--color-blue-100)",
              }}
            >
              <div className="flex-1 size-full flex justify-center items-center">
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
                  {totalXP}
                </Typography>
              </div>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                opacity: 0.5,
                background: "var(--color-orange-100)",
              }}
              title="Coming Soon!"
            >
              <div className="flex-1 size-full flex items-center justify-center">
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
                p: 3,
                borderRadius: 4,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "var(--color-green-100)",
              }}
            >
              <div className="flex-1 flex items-center justify-center size-full ">
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
        </div>
      </div>
    </>
  );
}
