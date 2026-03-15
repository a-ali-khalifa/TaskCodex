"use client";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import {
  IoCheckmarkDoneOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

type SidebarProps = {
  //Stats
  totalXP: number;
  completedTaskCount: number;
  streak: number;
  level: number;
  currentXP: number;
  xpNeeded: number;
  xpProgress: string;
};

export default function Sidebar({
  totalXP,
  completedTaskCount,
  streak,
  level,
  currentXP,
  xpNeeded,
  xpProgress,
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
        <IoChevronBack className="text-2xl" />
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
          <div className="flex flex-col gap-4 my-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3">
                <div className="border-2 font-medium border-primary text-primary rounded-full size-12 flex justify-center items-center text-xl md:text-2xl">
                  {level}
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold">{`Level ${level}`}</p>
                  <p className="text-sm md:text-base text-gray-600">{`${currentXP} / ${xpNeeded} XP`}</p>
                </div>
              </div>
              <div className="text-sm md:text-base font-medium text-primary">{`${xpNeeded - currentXP} XP to Level ${level + 1}`}</div>
            </div>
            <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Stats</h2>

          <div className="flex flex-col mt-2 mb-6 gap-2">
            <div className="flex items-center p-3 flex-1 gap-4">
              <div className="flex-1 size-full flex justify-center items-center bg-blue-100 rounded-lg p-3">
                <HiLightningBolt className="text-primary text-[28px]" />
              </div>
              <div className="flex flex-3 flex-col">
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
            </div>

            <div
              className="flex items-center p-3 flex-1 gap-4 opacity-50"
              title="Coming Soon!"
            >
              <div className="flex-1 size-full flex items-center justify-center bg-orange-100 rounded-lg p-3">
                <FaFireFlameCurved className="text-secondary text-[28px]" />
              </div>
              <div className="flex flex-3 flex-col">
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
            </div>

            <div
              className="flex items-center p-3 flex-1 gap-4"
              title="Coming Soon!"
            >
              <div className="flex-1 flex items-center justify-center size-full bg-green-100 rounded-lg p-3">
                <IoCheckmarkDoneOutline className="text-tertiary text-[28px]" />
              </div>
              <div className="flex flex-3 flex-col">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
