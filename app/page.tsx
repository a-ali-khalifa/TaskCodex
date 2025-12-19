"use client";

import { Button } from "@/components/Button";
import { Box, Container, Paper } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      <Container maxWidth="md" sx={{ py: 16 }}>
        {/* Hero Section */}
        <section id="hero" className="text-center font-[rubik]">
          <div className="bg-white/70 p-2 rounded-full h-10 flex flex-col justify-center border border-[#3F65FF] ">
            <p className="text-xl">Level up productivity</p>
          </div>
          <br />
          <p className="text-8xl ">
            Making tasks feel like{" "}
            <span className="text-[#3F65FF] drop-shadow-2xl drop-shadow-black/50">
              progress
            </span>
          </p>

          <br />
          <p className="text-2xl text-black/60">
            Transform your to-do list into a leveling journey. Gain experience
            points, track your growth and celebrate each win.
          </p>

          <br />

          {/* <div className="flex gap-6 justify-center"> */}
          <Button label="Start Leveling 🚀" />
          {/* <Button label="View demo" /> */}
          {/* </div> */}
        </section>
        <section id="features"></section>
      </Container>
    </div>
  );
}
