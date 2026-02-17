"use client";

import { Button } from "@/components/Button";
import { Container, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { RiTaskFill } from "react-icons/ri";
import ProgressImg from "@/public/images/progress.svg";
import MobileImg from "@/public/images/mobile.svg";
import RewardImg from "@/public/images/reward.svg";
import OpenSourceImg from "@/public/images/open-source.svg";
import SpreadsheetImg from "@/public/images/spreadsheet.svg";
import StatsImg from "@/public/images/stats.svg";
import FeatureCard from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <div className="">
      <Container maxWidth="md" sx={{ py: 16 }}>
        {/* Hero Section */}
        <section id="hero" className="text-center font-rubik min-h-screen">
          <div className="bg-white/70 p-2 rounded-full h-10 flex flex-col justify-center border border-[#3F65FF] ">
            <p className="text-xl">Level up productivity 🎚️</p>
          </div>
          <br />
          <p className="text-8xl">
            Making tasks feel like{" "}
            <span className="text-primary drop-shadow-2xl drop-shadow-black/50">
              progress
            </span>
          </p>

          <p className="text-2xl text-black/60 m-6">
            Transform your to-do list into a fun leveling journey. Gain
            experience points, track your growth and celebrate each win.
          </p>

          <div className="flex justify-center gap-3">
            <Link href={"/dashboard"}>
              <Button label="Start Leveling 🚀" size="lg" variant="outline" />
            </Link>

            <Link href={""}>
              <Button
                label="Source Code ⚙️"
                size="lg"
                className="border-2 border-primary"
                variant="solid"
              />
            </Link>
          </div>
        </section>
        <section id="features" className="font-rubik">
          <Typography sx={{ fontFamily: "rubik", fontSize: 42, mb: 4 }}>
            Features
          </Typography>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              src={ProgressImg}
              alt={"Progress"}
              title={"Gamified Productivity"}
              description={
                "Earn XP and level up as you complete tasks. The harder thechallenge, the bigger the reward."
              }
              className="bg-blue-200"
            />
            <FeatureCard
              src={SpreadsheetImg}
              alt={"Spreadsheet"}
              title={"Smart Task Organization"}
              description={
                "Add descriptions, categories, statuses, and due dates. Keep everything structured your way."
              }
              className="bg-gray-300"
            />
            <FeatureCard
              src={RewardImg}
              alt={"Rewards"}
              title={"Difficulty-based Rewards"}
              description={
                "Set an Easy, Medium, or Hard difficulty for each task, with Harder tasks giving more XP."
              }
              className="bg-green-200"
            />
            <FeatureCard
              src={OpenSourceImg}
              alt={"Open-source"}
              title={"Free & Open Source"}
              description={
                "Built in the open, completely free. Contribute and customize as you like."
              }
              className="bg-purple-200"
            />
          </div>

          <Typography sx={{ fontFamily: "rubik", fontSize: 32, my: 4 }}>
            Coming Soon
          </Typography>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              src={MobileImg}
              alt={"Mobile"}
              title={"Sync Across Devices"}
              description={
                "Accounts coming soon. For now, jump in and use directly with no sign ups needed!"
              }
              className="bg-orange-200"
            />
            <FeatureCard
              src={StatsImg}
              alt={"Stats"}
              title={"Track Your Stats"}
              description={
                "Daily streaks, achievements and more stats to be added in future updates."
              }
              className="bg-pink-200"
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
